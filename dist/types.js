"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneTemplateScene = exports.getPlaceholderDefinitionsForSchema = exports.placeholderDefinitionsBySchema = exports.DEFAULT_TEMPLATE_FONT_FAMILY = void 0;
exports.DEFAULT_TEMPLATE_FONT_FAMILY = '"Noto Sans CJK TC", "Noto Sans TC", sans-serif';
exports.placeholderDefinitionsBySchema = {
    "shipping-slip-v1": [
        { id: "order.orderNumber", label: "Order Number" },
        { id: "order.courier", label: "Courier" },
        { id: "order.courierFeePaymentMethod", label: "Courier Payment" },
        { id: "order.remarks", label: "Order Remarks" },
        { id: "order.kubeRemarks", label: "Kube Remarks" },
        { id: "shipTo.recipientName", label: "Recipient Name" },
        { id: "shipTo.recipientContactPhone", label: "Recipient Phone" },
        { id: "shipTo.shipToAddress", label: "Street Address" },
        { id: "shipTo.shipToDistrict", label: "District" },
        { id: "shipTo.shipToProvince", label: "Province" },
        { id: "shipTo.shipToCountry", label: "Country" },
        { id: "shipTo.shipToZipCode", label: "Zip Code" },
        { id: "computed.ownerLabel", label: "Owner Label" },
        { id: "computed.generatedAt", label: "Generated At" },
        { id: "computed.totalQty", label: "Total Quantity" },
        { id: "computed.lineCount", label: "Line Count" },
        { id: "computed.fullAddress", label: "Full Address" },
        { id: "computed.remarks", label: "Remarks" },
        { id: "computed.courierPayment", label: "Courier + Payment" },
    ],
    "item-label-v1": [
        { id: "item.sku", label: "Item SKU" },
        { id: "item.name", label: "Item Name" },
        { id: "item.description", label: "Item Description" },
        { id: "item.barcode", label: "Item Barcode" },
        { id: "item.ownerLabel", label: "Owner Label" },
        { id: "computed.generatedAt", label: "Generated At" },
        { id: "computed.binLabel", label: "Bin Label" },
    ],
};
const getPlaceholderDefinitionsForSchema = (schema) => exports.placeholderDefinitionsBySchema[schema];
exports.getPlaceholderDefinitionsForSchema = getPlaceholderDefinitionsForSchema;
const cloneTemplateScene = (scene) => structuredClone(scene);
exports.cloneTemplateScene = cloneTemplateScene;
