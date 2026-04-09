"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHIPPING_SLIP_DOCUMENT_IDS = exports.getTemplateSceneSourcePath = exports.getTemplateDocument = exports.TEMPLATE_DOCUMENTS = exports.itemLabelBasicDocument = exports.shippingSlipSmallDocument = exports.shippingSlipBigDocument = exports.TEMPLATE_SCENE_SOURCE_PATHS = exports.DEFAULT_SHIPPING_SLIP_DOCUMENT_ID = exports.ITEM_LABEL_BASIC_DOCUMENT_ID = exports.SHIPPING_SLIP_SMALL_DOCUMENT_ID = exports.SHIPPING_SLIP_BIG_DOCUMENT_ID = void 0;
const item_label_basic_json_1 = __importDefault(require("./scenes/item-label-basic.json"));
const shipping_slip_big_json_1 = __importDefault(require("./scenes/shipping-slip-big.json"));
const shipping_slip_small_json_1 = __importDefault(require("./scenes/shipping-slip-small.json"));
exports.SHIPPING_SLIP_BIG_DOCUMENT_ID = "shipping-slip-big";
exports.SHIPPING_SLIP_SMALL_DOCUMENT_ID = "shipping-slip-small";
exports.ITEM_LABEL_BASIC_DOCUMENT_ID = "item-label-basic";
exports.DEFAULT_SHIPPING_SLIP_DOCUMENT_ID = exports.SHIPPING_SLIP_BIG_DOCUMENT_ID;
exports.TEMPLATE_SCENE_SOURCE_PATHS = {
    "shipping-slip-big": "packages/svg-template-core/src/scenes/shipping-slip-big.json",
    "shipping-slip-small": "packages/svg-template-core/src/scenes/shipping-slip-small.json",
    "item-label-basic": "packages/svg-template-core/src/scenes/item-label-basic.json",
};
exports.shippingSlipBigDocument = {
    id: exports.SHIPPING_SLIP_BIG_DOCUMENT_ID,
    displayName: "Shipping Slip (Big)",
    templateFamily: "shipping-slip",
    contextSchema: "shipping-slip-v1",
    scene: shipping_slip_big_json_1.default,
};
exports.shippingSlipSmallDocument = {
    id: exports.SHIPPING_SLIP_SMALL_DOCUMENT_ID,
    displayName: "Shipping Slip (Small)",
    templateFamily: "shipping-slip",
    contextSchema: "shipping-slip-v1",
    scene: shipping_slip_small_json_1.default,
};
exports.itemLabelBasicDocument = {
    id: exports.ITEM_LABEL_BASIC_DOCUMENT_ID,
    displayName: "Item Label (Basic)",
    templateFamily: "item-label",
    contextSchema: "item-label-v1",
    scene: item_label_basic_json_1.default,
};
exports.TEMPLATE_DOCUMENTS = [
    exports.shippingSlipBigDocument,
    exports.shippingSlipSmallDocument,
    exports.itemLabelBasicDocument,
];
const templateDocumentMap = new Map(exports.TEMPLATE_DOCUMENTS.map((document) => [document.id, document]));
const getTemplateDocument = (documentId) => templateDocumentMap.get(documentId);
exports.getTemplateDocument = getTemplateDocument;
const getTemplateSceneSourcePath = (documentId) => exports.TEMPLATE_SCENE_SOURCE_PATHS[documentId];
exports.getTemplateSceneSourcePath = getTemplateSceneSourcePath;
exports.SHIPPING_SLIP_DOCUMENT_IDS = [
    exports.SHIPPING_SLIP_BIG_DOCUMENT_ID,
    exports.SHIPPING_SLIP_SMALL_DOCUMENT_ID,
];
