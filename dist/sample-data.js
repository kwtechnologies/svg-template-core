"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSampleDataForSchema = exports.sampleDataBySchema = exports.sampleItemLabelData = exports.sampleShippingSlipData = void 0;
exports.sampleShippingSlipData = {
    order: {
        orderNumber: "OUT-240409-018",
        courier: "SF Express",
        courierFeePaymentMethod: "Sender Pay",
        remarks: "Leave by concierge if no answer at the door.",
        kubeRemarks: "Fragile bottles. Keep upright.",
    },
    shipTo: {
        recipientName: "Chan Ka Yan",
        recipientContactPhone: "+852 9123 4567",
        shipToAddress: "Flat B, 18/F, Harbour Heights, 88 King's Road",
        shipToDistrict: "North Point",
        shipToProvince: "Hong Kong Island",
        shipToCountry: "Hong Kong",
        shipToZipCode: "000000",
    },
    computed: {
        ownerLabel: "joyce01 - Joyce Beauty Lab",
        generatedAt: "13:42:08",
        totalQty: "17",
        lineCount: "5",
        fullAddress: "Flat B, 18/F, Harbour Heights, 88 King's Road, North Point, Hong Kong Island, Hong Kong",
        remarks: "Leave by concierge if no answer at the door.",
        courierPayment: "SF Express // Pay by Receiver",
    },
};
exports.sampleItemLabelData = {
    item: {
        sku: "SKU-000241",
        name: "Hydrating Repair Serum 50ml",
        description: "Repair-focused daily serum with panthenol, ceramides, and hyaluronic acid.",
        barcode: "4890001234567",
        ownerLabel: "joyce01 - Joyce Beauty Lab",
    },
    computed: {
        generatedAt: "2026-04-09 18:22:10",
        binLabel: "A-03-02",
    },
};
exports.sampleDataBySchema = {
    "shipping-slip-v1": exports.sampleShippingSlipData,
    "item-label-v1": exports.sampleItemLabelData,
};
const getSampleDataForSchema = (schema) => exports.sampleDataBySchema[schema];
exports.getSampleDataForSchema = getSampleDataForSchema;
