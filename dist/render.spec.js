"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
(0, vitest_1.describe)("svg-template-core", () => {
    (0, vitest_1.it)("renders the shipping slip documents from structured data", async () => {
        const shippingData = (0, index_1.getSampleDataForSchema)("shipping-slip-v1");
        const bigMarkup = await (0, index_1.sceneToSvgMarkup)(index_1.shippingSlipBigDocument.scene, shippingData);
        const smallMarkup = await (0, index_1.sceneToSvgMarkup)(index_1.shippingSlipSmallDocument.scene, shippingData);
        (0, vitest_1.expect)(bigMarkup).toContain("OUT-240409-018");
        (0, vitest_1.expect)(bigMarkup).toContain("Chan Ka Yan");
        (0, vitest_1.expect)(smallMarkup).toContain("SF Express // Sender Pay");
        (0, vitest_1.expect)(smallMarkup).toContain("<svg");
    });
    (0, vitest_1.it)("renders the dormant item label document", async () => {
        const itemLabelData = (0, index_1.getSampleDataForSchema)("item-label-v1");
        const markup = await (0, index_1.sceneToSvgMarkup)(index_1.itemLabelBasicDocument.scene, itemLabelData);
        (0, vitest_1.expect)(markup).toContain("SKU-000241");
        (0, vitest_1.expect)(markup).toContain("ITEM Name:");
        (0, vitest_1.expect)(markup).toContain("Repair-focused daily serum");
        (0, vitest_1.expect)(markup).toContain("Description:");
    });
    (0, vitest_1.it)("resolves nested bindings and exposes schema-specific placeholders", () => {
        const shippingData = (0, index_1.getSampleDataForSchema)("shipping-slip-v1");
        (0, vitest_1.expect)((0, index_1.resolveBindingValue)("shipTo.recipientName", shippingData)).toBe("Chan Ka Yan");
        (0, vitest_1.expect)((0, index_1.getPlaceholderDefinitionsForSchema)("item-label-v1").map((placeholder) => placeholder.id)).toContain("item.description");
    });
});
