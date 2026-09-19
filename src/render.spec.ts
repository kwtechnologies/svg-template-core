import { describe, expect, it } from "vitest";

import {
  DEFAULT_TEMPLATE_FONT_FAMILY,
  getBarcodeHorizontalOffset,
  getBarcodeLayoutMetrics,
  getPlaceholderDefinitionsForSchema,
  getSampleDataForSchema,
  isSceneElementVisible,
  itemLabelBasicDocument,
  resolveBindingValue,
  sceneToSvgMarkup,
  shippingSlipBigDocument,
  shippingSlipSmallDocument,
  type SceneBarcodeElement,
  type ShippingSlipTemplateData,
  SHIPPING_SLIP_DOCUMENT_IDS,
  getTemplateDocument,
  type ShippingSlipTemplateDocumentId,
  wrapTextToWidth,
} from "./index";

const measureText = ({ text }: { text: string }) => Array.from(text).length;

describe("svg-template-core", () => {
  it("renders the shipping slip documents from structured data", async () => {
    const shippingData = getSampleDataForSchema("shipping-slip-v1");

    const bigMarkup = await sceneToSvgMarkup(
      shippingSlipBigDocument.scene,
      shippingData,
    );
    const smallMarkup = await sceneToSvgMarkup(
      shippingSlipSmallDocument.scene,
      shippingData,
    );

    expect(bigMarkup).toContain("OUT-240409-018");
    expect(bigMarkup).toContain("Chan Ka Yan");
    expect(smallMarkup).toContain("SF Express // Pay by Receiver");
    expect(smallMarkup).toContain("<svg");
  });

  it("renders the dormant item label document", async () => {
    const itemLabelData = getSampleDataForSchema("item-label-v1");
    const markup = await sceneToSvgMarkup(
      itemLabelBasicDocument.scene,
      itemLabelData,
    );

    expect(markup).toContain("SKU-000241");
    expect(markup).toContain("Item Name:");
    expect(markup).toContain("Repair-focused daily serum");
    expect(markup).toContain("Description:");
  });

  it("resolves nested bindings and exposes schema-specific placeholders", () => {
    const shippingData = getSampleDataForSchema("shipping-slip-v1");

    expect(
      resolveBindingValue("shipTo.recipientName", shippingData),
    ).toBe("Chan Ka Yan");
    expect(
      getPlaceholderDefinitionsForSchema("item-label-v1").map(
        (placeholder) => placeholder.id,
      ),
    ).toContain("item.description");
  });

  it("wraps spaced, unspaced, and chinese text to the box width", () => {
    expect(
      wrapTextToWidth(
        "Hello world test",
        11,
        12,
        DEFAULT_TEMPLATE_FONT_FAMILY,
        400,
        measureText,
      ),
    ).toEqual(["Hello world", "test"]);

    expect(
      wrapTextToWidth(
        "helloworld",
        4,
        12,
        DEFAULT_TEMPLATE_FONT_FAMILY,
        400,
        measureText,
      ),
    ).toEqual(["hell", "owor", "ld"]);

    expect(
      wrapTextToWidth(
        "中文測試換行",
        3,
        12,
        DEFAULT_TEMPLATE_FONT_FAMILY,
        400,
        measureText,
      ),
    ).toEqual(["中文測", "試換行"]);
  });

  it("preserves explicit newlines when rendering text elements", async () => {
    const markup = await sceneToSvgMarkup(
      {
        width: 200,
        height: 80,
        background: "#ffffff",
        name: "newline-scene",
        elements: [
          {
            id: "notes",
            name: "Notes",
            type: "text",
            x: 0,
            y: 0,
            width: 120,
            height: 60,
            text: "第一行\nSecond line",
            binding: "",
            fill: "#000000",
            fontSize: 12,
            fontWeight: 400,
            fontFamily: DEFAULT_TEMPLATE_FONT_FAMILY,
            lineHeight: 1.2,
            anchor: "start",
            verticalAlign: "top",
          },
        ],
      },
      getSampleDataForSchema("item-label-v1"),
      { measureText },
    );

    expect(markup.match(/<tspan /g)?.length).toBe(2);
    expect(markup).toContain(
      '<tspan x="0" dy="0">第一行</tspan><tspan x="0" dy="14.399999999999999">Second line</tspan>',
    );
  });

  it("supports barcode alignment offsets and intrinsic layout growth", () => {
    const barcodeElement: SceneBarcodeElement = {
      id: "barcode",
      name: "Barcode",
      type: "barcode",
      x: 0,
      y: 0,
      width: 120,
      height: 48,
      value: "",
      binding: "",
      stroke: "#000000",
      showValue: false,
      horizontalAlign: "right",
      renderMode: "intrinsic",
    };

    expect(getBarcodeHorizontalOffset(420, 300, "left")).toBe(0);
    expect(getBarcodeHorizontalOffset(420, 300, "center")).toBe(60);
    expect(getBarcodeHorizontalOffset(420, 300, "right")).toBe(120);

    const legacyLayout = getBarcodeLayoutMetrics(
      { ...barcodeElement, horizontalAlign: undefined, renderMode: undefined },
      "SKU-001",
    );
    expect(legacyLayout.contentX).toBe(0);
    expect(legacyLayout.contentWidth).toBe(120);

    const shortLayout = getBarcodeLayoutMetrics(barcodeElement, "SKU-001");
    const longLayout = getBarcodeLayoutMetrics(
      barcodeElement,
      "SKU-0000000000000000000001",
    );

    expect(shortLayout.contentX + shortLayout.contentWidth).toBe(120);
    expect(longLayout.contentX + longLayout.contentWidth).toBe(120);
    expect(longLayout.contentX).toBeLessThan(shortLayout.contentX);
  });

  it("marks the item label barcode as intrinsic and right aligned", () => {
    const barcodeElement = itemLabelBasicDocument.scene.elements.find(
      (element) => element.type === "barcode",
    );

    expect(barcodeElement).toMatchObject({
      horizontalAlign: "right",
      renderMode: "intrinsic",
    });
  });
});

describe("optional tracking number on the shipping slips", () => {
  const withTracking = (
    trackingNumber: string | undefined,
  ): ShippingSlipTemplateData => {
    const base = getSampleDataForSchema("shipping-slip-v1");
    return { ...base, order: { ...base.order, trackingNumber } };
  };

  const shippingSlipDocumentIds =
    SHIPPING_SLIP_DOCUMENT_IDS as readonly ShippingSlipTemplateDocumentId[];

  it.each(shippingSlipDocumentIds)(
    "%s prints the tracking number when one is present",
    async (documentId) => {
      const markup = await sceneToSvgMarkup(
        getTemplateDocument(documentId).scene,
        withTracking("SF9988776655"),
      );

      expect(markup).toContain("SF9988776655");
      expect(markup).toContain("Tracking:");
    },
  );

  it.each(shippingSlipDocumentIds)(
    "%s omits the label, the value and any placeholder box when tracking is missing",
    async (documentId) => {
      const scene = getTemplateDocument(documentId).scene;
      const trackingElements = scene.elements.filter((element) =>
        element.id.startsWith("tracking-"),
      );
      expect(trackingElements).toHaveLength(2);

      for (const trackingNumber of [undefined, "", "   "]) {
        const markup = await sceneToSvgMarkup(
          scene,
          withTracking(trackingNumber),
        );

        expect(markup).not.toContain("Tracking:");
        // The transparent hit-box each text element draws must go too, or the
        // slip keeps an empty placeholder where the number would have been.
        for (const element of trackingElements) {
          expect(markup).not.toContain(`x="${element.x}" y="${element.y}"`);
        }
      }
    },
  );

  it("treats blank strings as missing and keeps unrelated elements visible", () => {
    const scene = getTemplateDocument("shipping-slip-big").scene;
    const trackingValue = scene.elements.find(
      (element) => element.id === "tracking-value",
    )!;
    const orderNumber = scene.elements.find(
      (element) => element.id === "title-order-number",
    )!;

    expect(isSceneElementVisible(trackingValue, withTracking("T1"))).toBe(true);
    expect(isSceneElementVisible(trackingValue, withTracking(" \t "))).toBe(
      false,
    );
    expect(isSceneElementVisible(trackingValue, withTracking(undefined))).toBe(
      false,
    );
    expect(isSceneElementVisible(orderNumber, withTracking(undefined))).toBe(
      true,
    );
  });

  it("exposes the tracking number as a bindable placeholder", () => {
    expect(
      getPlaceholderDefinitionsForSchema("shipping-slip-v1").map(
        (placeholder) => placeholder.id,
      ),
    ).toContain("order.trackingNumber");
  });
});
