import type {
  SceneBarcodeElement,
  SceneElement,
  SceneTextElement,
  TemplateContextData,
  TemplateScene,
} from "./types";
import { DEFAULT_TEMPLATE_FONT_FAMILY } from "./types";

const fallbackMeasure = (text: string, fontSize: number) =>
  text.length * fontSize * 0.58;

const createMeasurementContext = () => {
  if (typeof document === "undefined") {
    return null;
  }
  const canvas = document.createElement("canvas");
  return canvas.getContext("2d");
};

const measurementContext = createMeasurementContext();

export interface MeasureTextArgs {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
}

export interface BarcodeRenderArgs {
  element: SceneBarcodeElement;
  value: string;
  escapeXml: (value: string) => string;
}

export interface SceneRenderHooks {
  measureText?: (args: MeasureTextArgs) => number;
  renderBarcode?: (args: BarcodeRenderArgs) => Promise<string> | string;
}

export const BARCODE_VALUE_HEIGHT = 14;

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const defaultMeasureText = ({
  text,
  fontSize,
  fontFamily,
  fontWeight,
}: MeasureTextArgs) => {
  if (!measurementContext) {
    return fallbackMeasure(text, fontSize);
  }

  measurementContext.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  return measurementContext.measureText(text).width;
};

export const resolveBindingValue = (
  binding: string,
  data: TemplateContextData,
): string => {
  if (!binding) {
    return "";
  }

  const resolved = binding
    .split(".")
    .reduce<unknown>((current, key) => {
      if (typeof current !== "object" || current === null) {
        return undefined;
      }
      return (current as Record<string, unknown>)[key];
    }, data);

  if (resolved === undefined || resolved === null) {
    return "";
  }

  return typeof resolved === "string" ? resolved : String(resolved);
};

export const getElementLabel = (
  element: SceneElement,
  data: TemplateContextData,
) => {
  if (element.type === "text") {
    return element.binding
      ? resolveBindingValue(element.binding, data)
      : element.text;
  }

  if (element.type === "barcode") {
    return element.binding
      ? resolveBindingValue(element.binding, data)
      : element.value;
  }

  return element.name;
};

export const getTextValue = (
  element: SceneTextElement,
  data: TemplateContextData,
) => {
  const resolved = element.binding
    ? resolveBindingValue(element.binding, data)
    : element.text;
  const value = resolved || element.text;
  return element.uppercase ? value.toUpperCase() : value;
};

export const wrapTextToWidth = (
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  measureText: SceneRenderHooks["measureText"],
) => {
  const source = text.trim();
  if (!source) {
    return [""];
  }

  const measure = measureText ?? defaultMeasureText;
  const words = source.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (
      current &&
      measure({
        text: candidate,
        fontSize,
        fontFamily,
        fontWeight,
      }) > maxWidth
    ) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }

  }

  if (current) {
    lines.push(current);
  }

  return lines;
};

export const getTextLines = (
  element: SceneTextElement,
  data: TemplateContextData,
  hooks: SceneRenderHooks = {},
) =>
  wrapTextToWidth(
    getTextValue(element, data),
    element.width,
    element.fontSize,
    element.fontFamily,
    element.fontWeight,
    hooks.measureText,
  );

export const getTextBlockHeight = (
  element: SceneTextElement,
  data: TemplateContextData,
  hooks: SceneRenderHooks = {},
) => {
  const lines = getTextLines(element, data, hooks);
  return (
    element.fontSize +
    Math.max(lines.length - 1, 0) * element.fontSize * element.lineHeight
  );
};

export const getTextAnchorX = (element: SceneTextElement) => {
  if (element.anchor === "middle") {
    return element.x + element.width / 2;
  }

  if (element.anchor === "end") {
    return element.x + element.width;
  }

  return element.x;
};

export const getTextStartY = (
  element: SceneTextElement,
  data: TemplateContextData,
  hooks: SceneRenderHooks = {},
) => {
  const blockHeight = getTextBlockHeight(element, data, hooks);

  if (element.verticalAlign === "middle") {
    return element.y + (element.height - blockHeight) / 2 + element.fontSize;
  }

  if (element.verticalAlign === "bottom") {
    return element.y + element.height - blockHeight + element.fontSize;
  }

  return element.y + element.fontSize;
};

export const getTextLayout = (
  element: SceneTextElement,
  data: TemplateContextData,
  hooks: SceneRenderHooks = {},
) => ({
  lines: getTextLines(element, data, hooks),
  anchorX: getTextAnchorX(element),
  startY: getTextStartY(element, data, hooks),
});

export const getElementBounds = (element: SceneElement) => {
  if (element.type === "line") {
    return {
      x: Math.min(element.x, element.x + element.width),
      y: Math.min(element.y, element.y + element.height),
      width: Math.abs(element.width) || 1,
      height: Math.abs(element.height) || element.strokeWidth || 1,
    };
  }

  return {
    x: element.x,
    y: element.y,
    width: "width" in element ? element.width : 1,
    height: "height" in element ? element.height : 1,
  };
};

export const createBarcodeBars = (value: string, width: number) => {
  const bars: Array<{ x: number; width: number }> = [];
  const encoded = [...value].map((character) => character.charCodeAt(0));
  const units = encoded.flatMap((code, index) => {
    const seed = code + index * 13;
    return [
      1 + (seed % 3),
      1 + ((seed >> 1) % 4),
      1 + ((seed >> 2) % 2),
      1 + ((seed >> 3) % 4),
      2 + ((seed >> 4) % 5),
    ];
  });

  const totalUnits = units.reduce((sum, unit) => sum + unit, 0) || 1;
  const scale = width / totalUnits;
  let cursor = 0;

  units.forEach((unit, index) => {
    const barWidth = Math.max(1, unit * scale);
    if (index % 2 === 0) {
      bars.push({ x: cursor, width: barWidth });
    }
    cursor += barWidth;
  });

  return bars;
};

export const getBarcodeGraphicHeight = (element: SceneBarcodeElement) =>
  element.showValue
    ? Math.max(element.height - BARCODE_VALUE_HEIGHT, 0)
    : element.height;

export const getBarcodeValue = (
  element: SceneBarcodeElement,
  data: TemplateContextData,
) => (element.binding ? resolveBindingValue(element.binding, data) : element.value);

const renderTextElement = async (
  element: SceneTextElement,
  data: TemplateContextData,
  hooks: SceneRenderHooks,
) => {
  const { lines, anchorX, startY } = getTextLayout(element, data, hooks);
  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : element.fontSize * element.lineHeight;
      return `<tspan x="${anchorX}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  return `<g><rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="#ffffff" fill-opacity="0.001" /><text x="${anchorX}" y="${startY}" font-family="${escapeXml(
    element.fontFamily,
  )}" font-size="${element.fontSize}" font-weight="${element.fontWeight}" fill="${element.fill}" text-anchor="${element.anchor}">${tspans}</text></g>`;
};

const defaultRenderBarcode = ({ element, value }: BarcodeRenderArgs) => {
  const graphicHeight = getBarcodeGraphicHeight(element);
  const bars = createBarcodeBars(value, element.width)
    .map((bar) => {
      return `<rect x="${bar.x}" y="0" width="${bar.width}" height="${graphicHeight}" fill="${element.stroke}" />`;
    })
    .join("");
  const caption = element.showValue
    ? `<text x="${element.width / 2}" y="${element.height}" text-anchor="middle" font-size="12" font-family="${escapeXml(
        DEFAULT_TEMPLATE_FONT_FAMILY,
      )}" fill="${element.stroke}">${escapeXml(value)}</text>`
    : "";

  return `<g transform="translate(${element.x} ${element.y})"><rect x="0" y="0" width="${element.width}" height="${element.height}" fill="#ffffff" fill-opacity="0.001" />${bars}${caption}</g>`;
};

const renderElement = async (
  element: SceneElement,
  data: TemplateContextData,
  hooks: SceneRenderHooks,
) => {
  if (element.type === "rect") {
    return `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" rx="${element.radius}" fill="${element.fill}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`;
  }

  if (element.type === "line") {
    return `<line x1="${element.x}" y1="${element.y}" x2="${element.x + element.width}" y2="${element.y + element.height}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`;
  }

  if (element.type === "barcode") {
    const value = getBarcodeValue(element, data);
    const renderBarcode = hooks.renderBarcode ?? defaultRenderBarcode;
    return renderBarcode({ element, value, escapeXml });
  }

  return renderTextElement(element, data, hooks);
};

export const sceneToSvgMarkup = async (
  scene: TemplateScene,
  data: TemplateContextData,
  hooks: SceneRenderHooks = {},
) => {
  const content = await Promise.all(
    scene.elements.map((element) => renderElement(element, data, hooks)),
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" fill="none"><rect width="100%" height="100%" fill="${scene.background}" />${content.join(
    "",
  )}</svg>`;
};
