"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sceneToSvgMarkup = exports.getBarcodeValue = exports.getBarcodeGraphicHeight = exports.createBarcodeBars = exports.getElementBounds = exports.getTextLayout = exports.getTextStartY = exports.getTextAnchorX = exports.getTextBlockHeight = exports.getTextLines = exports.wrapTextToWidth = exports.getTextValue = exports.getElementLabel = exports.resolveBindingValue = exports.escapeXml = exports.BARCODE_VALUE_HEIGHT = void 0;
const types_1 = require("./types");
const fallbackMeasure = (text, fontSize) => Array.from(text).length * fontSize * 0.58;
const createMeasurementContext = () => {
    if (typeof document === "undefined") {
        return null;
    }
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d");
};
const measurementContext = createMeasurementContext();
exports.BARCODE_VALUE_HEIGHT = 14;
const escapeXml = (value) => value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
exports.escapeXml = escapeXml;
const defaultMeasureText = ({ text, fontSize, fontFamily, fontWeight, }) => {
    if (!measurementContext) {
        return fallbackMeasure(text, fontSize);
    }
    measurementContext.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    return measurementContext.measureText(text).width;
};
const resolveBindingValue = (binding, data) => {
    if (!binding) {
        return "";
    }
    const resolved = binding
        .split(".")
        .reduce((current, key) => {
        if (typeof current !== "object" || current === null) {
            return undefined;
        }
        return current[key];
    }, data);
    if (resolved === undefined || resolved === null) {
        return "";
    }
    return typeof resolved === "string" ? resolved : String(resolved);
};
exports.resolveBindingValue = resolveBindingValue;
const getElementLabel = (element, data) => {
    if (element.type === "text") {
        return element.binding
            ? (0, exports.resolveBindingValue)(element.binding, data)
            : element.text;
    }
    if (element.type === "barcode") {
        return element.binding
            ? (0, exports.resolveBindingValue)(element.binding, data)
            : element.value;
    }
    return element.name;
};
exports.getElementLabel = getElementLabel;
const getTextValue = (element, data) => {
    const resolved = element.binding
        ? (0, exports.resolveBindingValue)(element.binding, data)
        : element.text;
    const value = resolved || element.text;
    return element.uppercase ? value.toUpperCase() : value;
};
exports.getTextValue = getTextValue;
const splitTokenToWidth = (token, maxWidth, fontSize, fontFamily, fontWeight, measureText) => {
    const chunks = [];
    let current = "";
    for (const character of Array.from(token)) {
        const candidate = `${current}${character}`;
        if (current &&
            measureText({
                text: candidate,
                fontSize,
                fontFamily,
                fontWeight,
            }) > maxWidth) {
            chunks.push(current);
            current = character;
            continue;
        }
        if (!current &&
            measureText({
                text: candidate,
                fontSize,
                fontFamily,
                fontWeight,
            }) > maxWidth) {
            chunks.push(character);
            continue;
        }
        current = candidate;
    }
    if (current) {
        chunks.push(current);
    }
    return chunks;
};
const wrapSegmentToWidth = (text, maxWidth, fontSize, fontFamily, fontWeight, measureText) => {
    const source = text.trim();
    if (!source) {
        return [""];
    }
    const words = source.split(/\s+/);
    const lines = [];
    let current = "";
    for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (current &&
            measureText({
                text: candidate,
                fontSize,
                fontFamily,
                fontWeight,
            }) > maxWidth) {
            lines.push(current);
            current = "";
        }
        if (!current) {
            if (measureText({
                text: word,
                fontSize,
                fontFamily,
                fontWeight,
            }) <= maxWidth) {
                current = word;
                continue;
            }
            const chunks = splitTokenToWidth(word, maxWidth, fontSize, fontFamily, fontWeight, measureText);
            lines.push(...chunks.slice(0, -1));
            current = chunks[chunks.length - 1] ?? "";
            continue;
        }
        current = candidate;
    }
    if (current) {
        lines.push(current);
    }
    return lines;
};
const wrapTextToWidth = (text, maxWidth, fontSize, fontFamily, fontWeight, measureText) => {
    const source = text.replace(/\r\n?/g, "\n").trim();
    if (!source) {
        return [""];
    }
    const measure = measureText ?? defaultMeasureText;
    return source
        .split("\n")
        .flatMap((segment) => wrapSegmentToWidth(segment, maxWidth, fontSize, fontFamily, fontWeight, measure));
};
exports.wrapTextToWidth = wrapTextToWidth;
const getTextLines = (element, data, hooks = {}) => (0, exports.wrapTextToWidth)((0, exports.getTextValue)(element, data), element.width, element.fontSize, element.fontFamily, element.fontWeight, hooks.measureText);
exports.getTextLines = getTextLines;
const getTextBlockHeight = (element, data, hooks = {}) => {
    const lines = (0, exports.getTextLines)(element, data, hooks);
    return (element.fontSize +
        Math.max(lines.length - 1, 0) * element.fontSize * element.lineHeight);
};
exports.getTextBlockHeight = getTextBlockHeight;
const getTextAnchorX = (element) => {
    if (element.anchor === "middle") {
        return element.x + element.width / 2;
    }
    if (element.anchor === "end") {
        return element.x + element.width;
    }
    return element.x;
};
exports.getTextAnchorX = getTextAnchorX;
const getTextStartY = (element, data, hooks = {}) => {
    const blockHeight = (0, exports.getTextBlockHeight)(element, data, hooks);
    if (element.verticalAlign === "middle") {
        return element.y + (element.height - blockHeight) / 2 + element.fontSize;
    }
    if (element.verticalAlign === "bottom") {
        return element.y + element.height - blockHeight + element.fontSize;
    }
    return element.y + element.fontSize;
};
exports.getTextStartY = getTextStartY;
const getTextLayout = (element, data, hooks = {}) => ({
    lines: (0, exports.getTextLines)(element, data, hooks),
    anchorX: (0, exports.getTextAnchorX)(element),
    startY: (0, exports.getTextStartY)(element, data, hooks),
});
exports.getTextLayout = getTextLayout;
const getElementBounds = (element) => {
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
exports.getElementBounds = getElementBounds;
const createBarcodeBars = (value, width) => {
    const bars = [];
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
exports.createBarcodeBars = createBarcodeBars;
const getBarcodeGraphicHeight = (element) => element.showValue
    ? Math.max(element.height - exports.BARCODE_VALUE_HEIGHT, 0)
    : element.height;
exports.getBarcodeGraphicHeight = getBarcodeGraphicHeight;
const getBarcodeValue = (element, data) => (element.binding ? (0, exports.resolveBindingValue)(element.binding, data) : element.value);
exports.getBarcodeValue = getBarcodeValue;
const renderTextElement = async (element, data, hooks) => {
    const { lines, anchorX, startY } = (0, exports.getTextLayout)(element, data, hooks);
    const tspans = lines
        .map((line, index) => {
        const dy = index === 0 ? 0 : element.fontSize * element.lineHeight;
        return `<tspan x="${anchorX}" dy="${dy}">${(0, exports.escapeXml)(line)}</tspan>`;
    })
        .join("");
    return `<g><rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="#ffffff" fill-opacity="0.001" /><text x="${anchorX}" y="${startY}" font-family="${(0, exports.escapeXml)(element.fontFamily)}" font-size="${element.fontSize}" font-weight="${element.fontWeight}" fill="${element.fill}" text-anchor="${element.anchor}">${tspans}</text></g>`;
};
const defaultRenderBarcode = ({ element, value }) => {
    const graphicHeight = (0, exports.getBarcodeGraphicHeight)(element);
    const bars = (0, exports.createBarcodeBars)(value, element.width)
        .map((bar) => {
        return `<rect x="${bar.x}" y="0" width="${bar.width}" height="${graphicHeight}" fill="${element.stroke}" />`;
    })
        .join("");
    const caption = element.showValue
        ? `<text x="${element.width / 2}" y="${element.height}" text-anchor="middle" font-size="12" font-family="${(0, exports.escapeXml)(types_1.DEFAULT_TEMPLATE_FONT_FAMILY)}" fill="${element.stroke}">${(0, exports.escapeXml)(value)}</text>`
        : "";
    return `<g transform="translate(${element.x} ${element.y})"><rect x="0" y="0" width="${element.width}" height="${element.height}" fill="#ffffff" fill-opacity="0.001" />${bars}${caption}</g>`;
};
const renderElement = async (element, data, hooks) => {
    if (element.type === "rect") {
        return `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" rx="${element.radius}" fill="${element.fill}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`;
    }
    if (element.type === "line") {
        return `<line x1="${element.x}" y1="${element.y}" x2="${element.x + element.width}" y2="${element.y + element.height}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`;
    }
    if (element.type === "barcode") {
        const value = (0, exports.getBarcodeValue)(element, data);
        const renderBarcode = hooks.renderBarcode ?? defaultRenderBarcode;
        return renderBarcode({ element, value, escapeXml: exports.escapeXml });
    }
    return renderTextElement(element, data, hooks);
};
const sceneToSvgMarkup = async (scene, data, hooks = {}) => {
    const content = await Promise.all(scene.elements.map((element) => renderElement(element, data, hooks)));
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" fill="none"><rect width="100%" height="100%" fill="${scene.background}" />${content.join("")}</svg>`;
};
exports.sceneToSvgMarkup = sceneToSvgMarkup;
