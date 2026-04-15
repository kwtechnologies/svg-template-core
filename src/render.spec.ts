import { describe, expect, it } from "vitest";

import {
  DEFAULT_TEMPLATE_FONT_FAMILY,
  getPlaceholderDefinitionsForSchema,
  getSampleDataForSchema,
  itemLabelBasicDocument,
  resolveBindingValue,
  sceneToSvgMarkup,
  shippingSlipBigDocument,
  shippingSlipSmallDocument,
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
    expect(smallMarkup).toContain("SF Express // Sender Pay");
    expect(smallMarkup).toContain("<svg");
  });

  it("renders the dormant item label document", async () => {
    const itemLabelData = getSampleDataForSchema("item-label-v1");
    const markup = await sceneToSvgMarkup(
      itemLabelBasicDocument.scene,
      itemLabelData,
    );

    expect(markup).toContain("SKU-000241");
    expect(markup).toContain("ITEM Name:");
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
});
