import { describe, expect, it } from "vitest";

import {
  getPlaceholderDefinitionsForSchema,
  getSampleDataForSchema,
  itemLabelBasicDocument,
  resolveBindingValue,
  sceneToSvgMarkup,
  shippingSlipBigDocument,
  shippingSlipSmallDocument,
} from "./index";

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
});
