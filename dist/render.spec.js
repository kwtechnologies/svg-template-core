"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
const measureText = ({ text }) => Array.from(text).length;
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
    (0, vitest_1.it)("wraps spaced, unspaced, and chinese text to the box width", () => {
        (0, vitest_1.expect)((0, index_1.wrapTextToWidth)("Hello world test", 11, 12, index_1.DEFAULT_TEMPLATE_FONT_FAMILY, 400, measureText)).toEqual(["Hello world", "test"]);
        (0, vitest_1.expect)((0, index_1.wrapTextToWidth)("helloworld", 4, 12, index_1.DEFAULT_TEMPLATE_FONT_FAMILY, 400, measureText)).toEqual(["hell", "owor", "ld"]);
        (0, vitest_1.expect)((0, index_1.wrapTextToWidth)("中文測試換行", 3, 12, index_1.DEFAULT_TEMPLATE_FONT_FAMILY, 400, measureText)).toEqual(["中文測", "試換行"]);
    });
    (0, vitest_1.it)("preserves explicit newlines when rendering text elements", async () => {
        const markup = await (0, index_1.sceneToSvgMarkup)({
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
                    fontFamily: index_1.DEFAULT_TEMPLATE_FONT_FAMILY,
                    lineHeight: 1.2,
                    anchor: "start",
                    verticalAlign: "top",
                },
            ],
        }, (0, index_1.getSampleDataForSchema)("item-label-v1"), { measureText });
        (0, vitest_1.expect)(markup.match(/<tspan /g)?.length).toBe(2);
        (0, vitest_1.expect)(markup).toContain('<tspan x="0" dy="0">第一行</tspan><tspan x="0" dy="14.399999999999999">Second line</tspan>');
    });
});
