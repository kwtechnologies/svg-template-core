Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/scenes/item-label-basic.json
var item_label_basic_default = {
	name: "Item Label / Basic",
	width: 816,
	height: 408,
	background: "#ffffff",
	elements: [
		{
			"id": "item-id",
			"name": "Item ID",
			"type": "text",
			"x": 26,
			"y": 26,
			"width": 362,
			"height": 96,
			"text": "",
			"binding": "item.sku",
			"fill": "#111111",
			"fontSize": 43,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "barcode",
			"name": "Barcode",
			"type": "barcode",
			"x": 398,
			"y": 22,
			"width": 402,
			"height": 104,
			"value": "",
			"binding": "item.sku",
			"stroke": "#111111",
			"showValue": false
		},
		{
			"id": "item-name-label",
			"name": "Item Name Label",
			"type": "text",
			"x": 18,
			"y": 154,
			"width": 200,
			"height": 32,
			"text": "Item Name:",
			"binding": "",
			"fill": "#111111",
			"fontSize": 18,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "item-name",
			"name": "Item Name",
			"type": "text",
			"x": 134,
			"y": 142,
			"width": 640,
			"height": 106,
			"text": "",
			"binding": "item.name",
			"fill": "#111111",
			"fontSize": 39,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "description-label",
			"name": "Description Label",
			"type": "text",
			"x": 18,
			"y": 252,
			"width": 160,
			"height": 22,
			"text": "Description:",
			"binding": "",
			"fill": "#111111",
			"fontSize": 18,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "description",
			"name": "Description",
			"type": "text",
			"x": 134,
			"y": 246,
			"width": 660,
			"height": 138,
			"text": "",
			"binding": "item.description",
			"fill": "#111111",
			"fontSize": 29,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.25,
			"anchor": "start",
			"verticalAlign": "top"
		}
	]
};
//#endregion
//#region src/scenes/shipping-slip-big.json
var shipping_slip_big_default = {
	name: "Shipping Slip / Big",
	width: 815,
	height: 480,
	background: "#ffffff",
	elements: [
		{
			"id": "title-label",
			"name": "Title Label",
			"type": "text",
			"x": 28,
			"y": 18,
			"width": 298,
			"height": 44,
			"text": "Shipment Slip",
			"binding": "",
			"fill": "#000000",
			"fontSize": 36,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "title-order-number",
			"name": "Title Order Number",
			"type": "text",
			"x": 278,
			"y": 18,
			"width": 460,
			"height": 48,
			"text": "",
			"binding": "order.orderNumber",
			"fill": "#000000",
			"fontSize": 37,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "barcode",
			"name": "Barcode",
			"type": "barcode",
			"x": 28,
			"y": 74,
			"width": 486,
			"height": 50,
			"value": "OUT-240409-018",
			"binding": "order.orderNumber",
			"stroke": "#000000",
			"showValue": false
		},
		{
			"id": "qty-box",
			"name": "Qty Box",
			"type": "rect",
			"x": 524,
			"y": 76,
			"width": 250,
			"height": 56,
			"fill": "#000000",
			"stroke": "#000000",
			"strokeWidth": 0,
			"radius": 0
		},
		{
			"id": "qty-label",
			"name": "Qty Label",
			"type": "text",
			"x": 540,
			"y": 82,
			"width": 94,
			"height": 44,
			"text": "QTY:",
			"binding": "",
			"fill": "#ffffff",
			"fontSize": 34,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "qty-value",
			"name": "Qty Value",
			"type": "text",
			"x": 636,
			"y": 82,
			"width": 134,
			"height": 44,
			"text": "",
			"binding": "computed.totalQty",
			"fill": "#ffffff",
			"fontSize": 34,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "generated-at",
			"name": "Generated At",
			"type": "text",
			"x": 716,
			"y": 26,
			"width": 132,
			"height": 18,
			"text": "",
			"binding": "computed.generatedAt",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "owner-label",
			"name": "Owner Label",
			"type": "text",
			"x": 28,
			"y": 128,
			"width": 760,
			"height": 28,
			"text": "",
			"binding": "computed.ownerLabel",
			"fill": "#000000",
			"fontSize": 22,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "courier-strip",
			"name": "Courier Strip",
			"type": "rect",
			"x": 24,
			"y": 168,
			"width": 500,
			"height": 52,
			"fill": "#000000",
			"stroke": "#000000",
			"strokeWidth": 0,
			"radius": 0
		},
		{
			"id": "courier-payment",
			"name": "Courier Payment",
			"type": "text",
			"x": 28,
			"y": 176,
			"width": 484,
			"height": 42,
			"text": "",
			"binding": "computed.courierPayment",
			"fill": "#ffffff",
			"fontSize": 28,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "middle",
			"verticalAlign": "top"
		},
		{
			"id": "remarks-label",
			"name": "Remarks Label",
			"type": "text",
			"x": 374,
			"y": 230,
			"width": 96,
			"height": 24,
			"text": "Remarks",
			"binding": "",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "end",
			"verticalAlign": "top"
		},
		{
			"id": "remarks-value",
			"name": "Remarks Value",
			"type": "text",
			"x": 486,
			"y": 228,
			"width": 318,
			"height": 84,
			"text": "",
			"binding": "order.remarks",
			"fill": "#000000",
			"fontSize": 17,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.2,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "kube-remarks-label",
			"name": "Kube Remarks Label",
			"type": "text",
			"x": 382,
			"y": 320,
			"width": 86,
			"height": 42,
			"text": "Kube remarks",
			"binding": "",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "end",
			"verticalAlign": "top"
		},
		{
			"id": "kube-remarks-value",
			"name": "Kube Remarks Value",
			"type": "text",
			"x": 488,
			"y": 322,
			"width": 320,
			"height": 120,
			"text": "",
			"binding": "order.kubeRemarks",
			"fill": "#000000",
			"fontSize": 17,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.2,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-label",
			"name": "Ship To Label",
			"type": "text",
			"x": 76,
			"y": 228,
			"width": 204,
			"height": 24,
			"text": "Ship to",
			"binding": "",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "middle",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-name",
			"name": "Ship To Name",
			"type": "text",
			"x": 34,
			"y": 288,
			"width": 344,
			"height": 24,
			"text": "Chan Ka Yan",
			"binding": "shipTo.recipientName",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-phone",
			"name": "Ship To Phone",
			"type": "text",
			"x": 32,
			"y": 262,
			"width": 330,
			"height": 24,
			"text": "+852 9123 4567",
			"binding": "shipTo.recipientContactPhone",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-address",
			"name": "Ship To Address",
			"type": "text",
			"x": 32,
			"y": 316,
			"width": 334,
			"height": 148,
			"text": "Flat B, 18/F, Harbour Heights, 88 King's Road, North Point, Hong Kong Island, Hong Kong",
			"binding": "computed.fullAddress",
			"fill": "#000000",
			"fontSize": 17,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.22,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "text-o0nb8q",
			"name": "New Text",
			"type": "text",
			"x": 624,
			"y": 26,
			"width": 146,
			"height": 28,
			"text": "Generated:",
			"binding": "",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.2,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "line-9z4wuj",
			"name": "New Divider",
			"type": "line",
			"x": 24,
			"y": 254,
			"width": 325,
			"height": 0,
			"stroke": "#000000",
			"strokeWidth": 2
		},
		{
			"id": "line-98z2yw",
			"name": "New Divider",
			"type": "line",
			"x": 476,
			"y": 224,
			"width": 0,
			"height": 241,
			"stroke": "#000000",
			"strokeWidth": 1
		},
		{
			"id": "line-17qopp",
			"name": "New Divider",
			"type": "line",
			"x": 372,
			"y": 226,
			"width": 0,
			"height": 252,
			"stroke": "#000000",
			"strokeWidth": 1
		}
	]
};
//#endregion
//#region src/scenes/shipping-slip-small.json
var shipping_slip_small_default = {
	name: "Shipping Slip / Small",
	width: 610,
	height: 686,
	background: "#ffffff",
	elements: [
		{
			"id": "title-label",
			"name": "Title Label",
			"type": "text",
			"x": 28,
			"y": 28,
			"width": 304,
			"height": 44,
			"text": "Shipment Slip:",
			"binding": "",
			"fill": "#000000",
			"fontSize": 32,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "title-order-number",
			"name": "Title Order Number",
			"type": "text",
			"x": 260,
			"y": 30,
			"width": 354,
			"height": 28,
			"text": "",
			"binding": "order.orderNumber",
			"fill": "#000000",
			"fontSize": 32,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "barcode",
			"name": "Barcode",
			"type": "barcode",
			"x": 24,
			"y": 78,
			"width": 334,
			"height": 50,
			"value": "OUT-240409-018",
			"binding": "order.orderNumber",
			"stroke": "#000000",
			"showValue": false
		},
		{
			"id": "qty-box",
			"name": "Qty Box",
			"type": "rect",
			"x": 370,
			"y": 74,
			"width": 210,
			"height": 56,
			"fill": "#000000",
			"stroke": "#000000",
			"strokeWidth": 0,
			"radius": 0
		},
		{
			"id": "qty-label",
			"name": "Qty Label",
			"type": "text",
			"x": 382,
			"y": 84,
			"width": 106,
			"height": 26,
			"text": "QTY:",
			"binding": "",
			"fill": "#ffffff",
			"fontSize": 30,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "qty-value",
			"name": "Qty Value",
			"type": "text",
			"x": 462,
			"y": 84,
			"width": 90,
			"height": 36,
			"text": "",
			"binding": "computed.totalQty",
			"fill": "#ffffff",
			"fontSize": 30,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "generated-at",
			"name": "Generated At",
			"type": "text",
			"x": 508,
			"y": 140,
			"width": 92,
			"height": 24,
			"text": "",
			"binding": "computed.generatedAt",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "owner-label",
			"name": "Owner Label",
			"type": "text",
			"x": 24,
			"y": 140,
			"width": 446,
			"height": 24,
			"text": "",
			"binding": "computed.ownerLabel",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "courier-strip",
			"name": "Courier Strip",
			"type": "rect",
			"x": 22,
			"y": 174,
			"width": 476,
			"height": 42,
			"fill": "#000000",
			"stroke": "#000000",
			"strokeWidth": 0,
			"radius": 0
		},
		{
			"id": "courier-payment",
			"name": "Courier Payment",
			"type": "text",
			"x": 30,
			"y": 178,
			"width": 464,
			"height": 32,
			"text": "SF Express // Sender Pay",
			"binding": "computed.courierPayment",
			"fill": "#ffffff",
			"fontSize": 26,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "middle",
			"verticalAlign": "top"
		},
		{
			"id": "remarks-label",
			"name": "Remarks Label",
			"type": "text",
			"x": 30,
			"y": 404,
			"width": 92,
			"height": 20,
			"text": "Remark:",
			"binding": "",
			"fill": "#000000",
			"fontSize": 16,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "remarks-value",
			"name": "Remarks Value",
			"type": "text",
			"x": 30,
			"y": 424,
			"width": 556,
			"height": 88,
			"text": "",
			"binding": "order.remarks",
			"fill": "#000000",
			"fontSize": 16,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.18,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "kube-remarks-label",
			"name": "Kube Remarks Label",
			"type": "text",
			"x": 32,
			"y": 526,
			"width": 180,
			"height": 20,
			"text": "Kube Remarks:",
			"binding": "",
			"fill": "#000000",
			"fontSize": 16,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "kube-remarks-value",
			"name": "Kube Remarks Value",
			"type": "text",
			"x": 32,
			"y": 548,
			"width": 556,
			"height": 88,
			"text": "",
			"binding": "order.kubeRemarks",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.18,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-label",
			"name": "Ship To Label",
			"type": "text",
			"x": 30,
			"y": 236,
			"width": 78,
			"height": 20,
			"text": "Ship to:",
			"binding": "",
			"fill": "#000000",
			"fontSize": 16,
			"fontWeight": 700,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-name",
			"name": "Ship To Name",
			"type": "text",
			"x": 102,
			"y": 234,
			"width": 214,
			"height": 22,
			"text": "",
			"binding": "shipTo.recipientName",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-phone",
			"name": "Ship To Phone",
			"type": "text",
			"x": 376,
			"y": 232,
			"width": 208,
			"height": 24,
			"text": "",
			"binding": "shipTo.recipientContactPhone",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1,
			"anchor": "start",
			"verticalAlign": "top"
		},
		{
			"id": "ship-to-address",
			"name": "Ship To Address",
			"type": "text",
			"x": 30,
			"y": 264,
			"width": 566,
			"height": 130,
			"text": "",
			"binding": "computed.fullAddress",
			"fill": "#000000",
			"fontSize": 18,
			"fontWeight": 400,
			"fontFamily": "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif",
			"lineHeight": 1.18,
			"anchor": "start",
			"verticalAlign": "top"
		}
	]
};
//#endregion
//#region src/documents.ts
const SHIPPING_SLIP_BIG_DOCUMENT_ID = "shipping-slip-big";
const SHIPPING_SLIP_SMALL_DOCUMENT_ID = "shipping-slip-small";
const ITEM_LABEL_BASIC_DOCUMENT_ID = "item-label-basic";
const DEFAULT_SHIPPING_SLIP_DOCUMENT_ID = SHIPPING_SLIP_BIG_DOCUMENT_ID;
const TEMPLATE_SCENE_SOURCE_PATHS = {
	"shipping-slip-big": "packages/svg-template-core/src/scenes/shipping-slip-big.json",
	"shipping-slip-small": "packages/svg-template-core/src/scenes/shipping-slip-small.json",
	"item-label-basic": "packages/svg-template-core/src/scenes/item-label-basic.json"
};
const shippingSlipBigDocument = {
	id: SHIPPING_SLIP_BIG_DOCUMENT_ID,
	displayName: "Shipping Slip (Big)",
	templateFamily: "shipping-slip",
	contextSchema: "shipping-slip-v1",
	scene: shipping_slip_big_default
};
const shippingSlipSmallDocument = {
	id: SHIPPING_SLIP_SMALL_DOCUMENT_ID,
	displayName: "Shipping Slip (Small)",
	templateFamily: "shipping-slip",
	contextSchema: "shipping-slip-v1",
	scene: shipping_slip_small_default
};
const itemLabelBasicDocument = {
	id: ITEM_LABEL_BASIC_DOCUMENT_ID,
	displayName: "Item Label (Basic)",
	templateFamily: "item-label",
	contextSchema: "item-label-v1",
	scene: item_label_basic_default
};
const TEMPLATE_DOCUMENTS = [
	shippingSlipBigDocument,
	shippingSlipSmallDocument,
	itemLabelBasicDocument
];
const templateDocumentMap = new Map(TEMPLATE_DOCUMENTS.map((document) => [document.id, document]));
const getTemplateDocument = (documentId) => templateDocumentMap.get(documentId);
const getTemplateSceneSourcePath = (documentId) => TEMPLATE_SCENE_SOURCE_PATHS[documentId];
const SHIPPING_SLIP_DOCUMENT_IDS = [SHIPPING_SLIP_BIG_DOCUMENT_ID, SHIPPING_SLIP_SMALL_DOCUMENT_ID];
//#endregion
//#region src/types.ts
const DEFAULT_TEMPLATE_FONT_FAMILY = "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif";
const placeholderDefinitionsBySchema = {
	"shipping-slip-v1": [
		{
			id: "order.orderNumber",
			label: "Order Number"
		},
		{
			id: "order.courier",
			label: "Courier"
		},
		{
			id: "order.courierFeePaymentMethod",
			label: "Courier Payment"
		},
		{
			id: "order.remarks",
			label: "Order Remarks"
		},
		{
			id: "order.kubeRemarks",
			label: "Kube Remarks"
		},
		{
			id: "shipTo.recipientName",
			label: "Recipient Name"
		},
		{
			id: "shipTo.recipientContactPhone",
			label: "Recipient Phone"
		},
		{
			id: "shipTo.shipToAddress",
			label: "Street Address"
		},
		{
			id: "shipTo.shipToDistrict",
			label: "District"
		},
		{
			id: "shipTo.shipToProvince",
			label: "Province"
		},
		{
			id: "shipTo.shipToCountry",
			label: "Country"
		},
		{
			id: "shipTo.shipToZipCode",
			label: "Zip Code"
		},
		{
			id: "computed.ownerLabel",
			label: "Owner Label"
		},
		{
			id: "computed.generatedAt",
			label: "Generated At"
		},
		{
			id: "computed.totalQty",
			label: "Total Quantity"
		},
		{
			id: "computed.lineCount",
			label: "Line Count"
		},
		{
			id: "computed.fullAddress",
			label: "Full Address"
		},
		{
			id: "computed.remarks",
			label: "Remarks"
		},
		{
			id: "computed.courierPayment",
			label: "Courier + Payment"
		}
	],
	"item-label-v1": [
		{
			id: "item.sku",
			label: "Item SKU"
		},
		{
			id: "item.name",
			label: "Item Name"
		},
		{
			id: "item.description",
			label: "Item Description"
		},
		{
			id: "item.barcode",
			label: "Item Barcode"
		},
		{
			id: "item.ownerLabel",
			label: "Owner Label"
		},
		{
			id: "computed.generatedAt",
			label: "Generated At"
		},
		{
			id: "computed.binLabel",
			label: "Bin Label"
		}
	]
};
const getPlaceholderDefinitionsForSchema = (schema) => placeholderDefinitionsBySchema[schema];
const cloneTemplateScene = (scene) => structuredClone(scene);
//#endregion
//#region src/render.ts
const fallbackMeasure = (text, fontSize) => Array.from(text).length * fontSize * .58;
const createMeasurementContext = () => {
	if (typeof document === "undefined") return null;
	return document.createElement("canvas").getContext("2d");
};
const measurementContext = createMeasurementContext();
const BARCODE_VALUE_HEIGHT = 14;
const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const defaultMeasureText = ({ text, fontSize, fontFamily, fontWeight }) => {
	if (!measurementContext) return fallbackMeasure(text, fontSize);
	measurementContext.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
	return measurementContext.measureText(text).width;
};
const resolveBindingValue = (binding, data) => {
	if (!binding) return "";
	const resolved = binding.split(".").reduce((current, key) => {
		if (typeof current !== "object" || current === null) return;
		return current[key];
	}, data);
	if (resolved === void 0 || resolved === null) return "";
	return typeof resolved === "string" ? resolved : String(resolved);
};
const getElementLabel = (element, data) => {
	if (element.type === "text") return element.binding ? resolveBindingValue(element.binding, data) : element.text;
	if (element.type === "barcode") return element.binding ? resolveBindingValue(element.binding, data) : element.value;
	return element.name;
};
const getTextValue = (element, data) => {
	const value = (element.binding ? resolveBindingValue(element.binding, data) : element.text) || element.text;
	return element.uppercase ? value.toUpperCase() : value;
};
const splitTokenToWidth = (token, maxWidth, fontSize, fontFamily, fontWeight, measureText) => {
	const chunks = [];
	let current = "";
	for (const character of Array.from(token)) {
		const candidate = `${current}${character}`;
		if (current && measureText({
			text: candidate,
			fontSize,
			fontFamily,
			fontWeight
		}) > maxWidth) {
			chunks.push(current);
			current = character;
			continue;
		}
		if (!current && measureText({
			text: candidate,
			fontSize,
			fontFamily,
			fontWeight
		}) > maxWidth) {
			chunks.push(character);
			continue;
		}
		current = candidate;
	}
	if (current) chunks.push(current);
	return chunks;
};
const wrapSegmentToWidth = (text, maxWidth, fontSize, fontFamily, fontWeight, measureText) => {
	const source = text.trim();
	if (!source) return [""];
	const words = source.split(/\s+/);
	const lines = [];
	let current = "";
	for (const word of words) {
		const candidate = current ? `${current} ${word}` : word;
		if (current && measureText({
			text: candidate,
			fontSize,
			fontFamily,
			fontWeight
		}) > maxWidth) {
			lines.push(current);
			current = "";
		}
		if (!current) {
			if (measureText({
				text: word,
				fontSize,
				fontFamily,
				fontWeight
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
	if (current) lines.push(current);
	return lines;
};
const wrapTextToWidth = (text, maxWidth, fontSize, fontFamily, fontWeight, measureText) => {
	const source = text.replace(/\r\n?/g, "\n").trim();
	if (!source) return [""];
	const measure = measureText ?? defaultMeasureText;
	return source.split("\n").flatMap((segment) => wrapSegmentToWidth(segment, maxWidth, fontSize, fontFamily, fontWeight, measure));
};
const getTextLines = (element, data, hooks = {}) => wrapTextToWidth(getTextValue(element, data), element.width, element.fontSize, element.fontFamily, element.fontWeight, hooks.measureText);
const getTextBlockHeight = (element, data, hooks = {}) => {
	const lines = getTextLines(element, data, hooks);
	return element.fontSize + Math.max(lines.length - 1, 0) * element.fontSize * element.lineHeight;
};
const getTextAnchorX = (element) => {
	if (element.anchor === "middle") return element.x + element.width / 2;
	if (element.anchor === "end") return element.x + element.width;
	return element.x;
};
const getTextStartY = (element, data, hooks = {}) => {
	const blockHeight = getTextBlockHeight(element, data, hooks);
	if (element.verticalAlign === "middle") return element.y + (element.height - blockHeight) / 2 + element.fontSize;
	if (element.verticalAlign === "bottom") return element.y + element.height - blockHeight + element.fontSize;
	return element.y + element.fontSize;
};
const getTextLayout = (element, data, hooks = {}) => ({
	lines: getTextLines(element, data, hooks),
	anchorX: getTextAnchorX(element),
	startY: getTextStartY(element, data, hooks)
});
const getElementBounds = (element) => {
	if (element.type === "line") return {
		x: Math.min(element.x, element.x + element.width),
		y: Math.min(element.y, element.y + element.height),
		width: Math.abs(element.width) || 1,
		height: Math.abs(element.height) || element.strokeWidth || 1
	};
	return {
		x: element.x,
		y: element.y,
		width: "width" in element ? element.width : 1,
		height: "height" in element ? element.height : 1
	};
};
const createBarcodeBars = (value, width) => {
	const bars = [];
	const units = [...value].map((character) => character.charCodeAt(0)).flatMap((code, index) => {
		const seed = code + index * 13;
		return [
			1 + seed % 3,
			1 + (seed >> 1) % 4,
			1 + (seed >> 2) % 2,
			1 + (seed >> 3) % 4,
			2 + (seed >> 4) % 5
		];
	});
	const scale = width / (units.reduce((sum, unit) => sum + unit, 0) || 1);
	let cursor = 0;
	units.forEach((unit, index) => {
		const barWidth = Math.max(1, unit * scale);
		if (index % 2 === 0) bars.push({
			x: cursor,
			width: barWidth
		});
		cursor += barWidth;
	});
	return bars;
};
const getBarcodeGraphicHeight = (element) => element.showValue ? Math.max(element.height - 14, 0) : element.height;
const getBarcodeValue = (element, data) => element.binding ? resolveBindingValue(element.binding, data) : element.value;
const renderTextElement = async (element, data, hooks) => {
	const { lines, anchorX, startY } = getTextLayout(element, data, hooks);
	const tspans = lines.map((line, index) => {
		return `<tspan x="${anchorX}" dy="${index === 0 ? 0 : element.fontSize * element.lineHeight}">${escapeXml(line)}</tspan>`;
	}).join("");
	return `<g><rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="#ffffff" fill-opacity="0.001" /><text x="${anchorX}" y="${startY}" font-family="${escapeXml(element.fontFamily)}" font-size="${element.fontSize}" font-weight="${element.fontWeight}" fill="${element.fill}" text-anchor="${element.anchor}">${tspans}</text></g>`;
};
const defaultRenderBarcode = ({ element, value }) => {
	const graphicHeight = getBarcodeGraphicHeight(element);
	const bars = createBarcodeBars(value, element.width).map((bar) => {
		return `<rect x="${bar.x}" y="0" width="${bar.width}" height="${graphicHeight}" fill="${element.stroke}" />`;
	}).join("");
	const caption = element.showValue ? `<text x="${element.width / 2}" y="${element.height}" text-anchor="middle" font-size="12" font-family="${escapeXml(DEFAULT_TEMPLATE_FONT_FAMILY)}" fill="${element.stroke}">${escapeXml(value)}</text>` : "";
	return `<g transform="translate(${element.x} ${element.y})"><rect x="0" y="0" width="${element.width}" height="${element.height}" fill="#ffffff" fill-opacity="0.001" />${bars}${caption}</g>`;
};
const renderElement = async (element, data, hooks) => {
	if (element.type === "rect") return `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" rx="${element.radius}" fill="${element.fill}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`;
	if (element.type === "line") return `<line x1="${element.x}" y1="${element.y}" x2="${element.x + element.width}" y2="${element.y + element.height}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}" />`;
	if (element.type === "barcode") {
		const value = getBarcodeValue(element, data);
		return (hooks.renderBarcode ?? defaultRenderBarcode)({
			element,
			value,
			escapeXml
		});
	}
	return renderTextElement(element, data, hooks);
};
const sceneToSvgMarkup = async (scene, data, hooks = {}) => {
	const content = await Promise.all(scene.elements.map((element) => renderElement(element, data, hooks)));
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" fill="none"><rect width="100%" height="100%" fill="${scene.background}" />${content.join("")}</svg>`;
};
//#endregion
//#region src/sample-data.ts
const sampleShippingSlipData = {
	order: {
		orderNumber: "OUT-240409-018",
		courier: "SF Express",
		courierFeePaymentMethod: "Sender Pay",
		remarks: "Leave by concierge if no answer at the door.",
		kubeRemarks: "Fragile bottles. Keep upright."
	},
	shipTo: {
		recipientName: "Chan Ka Yan",
		recipientContactPhone: "+852 9123 4567",
		shipToAddress: "Flat B, 18/F, Harbour Heights, 88 King's Road",
		shipToDistrict: "North Point",
		shipToProvince: "Hong Kong Island",
		shipToCountry: "Hong Kong",
		shipToZipCode: "000000"
	},
	computed: {
		ownerLabel: "joyce01 - Joyce Beauty Lab",
		generatedAt: "13:42:08",
		totalQty: "17",
		lineCount: "5",
		fullAddress: "Flat B, 18/F, Harbour Heights, 88 King's Road, North Point, Hong Kong Island, Hong Kong",
		remarks: "Leave by concierge if no answer at the door.",
		courierPayment: "SF Express // Pay by Receiver"
	}
};
const sampleItemLabelData = {
	item: {
		sku: "SKU-000241",
		name: "Hydrating Repair Serum 50ml",
		description: "Repair-focused daily serum with panthenol, ceramides, and hyaluronic acid.",
		barcode: "4890001234567",
		ownerLabel: "joyce01 - Joyce Beauty Lab"
	},
	computed: {
		generatedAt: "2026-04-09 18:22:10",
		binLabel: "A-03-02"
	}
};
const sampleDataBySchema = {
	"shipping-slip-v1": sampleShippingSlipData,
	"item-label-v1": sampleItemLabelData
};
const getSampleDataForSchema = (schema) => sampleDataBySchema[schema];
//#endregion
exports.BARCODE_VALUE_HEIGHT = BARCODE_VALUE_HEIGHT;
exports.DEFAULT_SHIPPING_SLIP_DOCUMENT_ID = DEFAULT_SHIPPING_SLIP_DOCUMENT_ID;
exports.DEFAULT_TEMPLATE_FONT_FAMILY = DEFAULT_TEMPLATE_FONT_FAMILY;
exports.ITEM_LABEL_BASIC_DOCUMENT_ID = ITEM_LABEL_BASIC_DOCUMENT_ID;
exports.SHIPPING_SLIP_BIG_DOCUMENT_ID = SHIPPING_SLIP_BIG_DOCUMENT_ID;
exports.SHIPPING_SLIP_DOCUMENT_IDS = SHIPPING_SLIP_DOCUMENT_IDS;
exports.SHIPPING_SLIP_SMALL_DOCUMENT_ID = SHIPPING_SLIP_SMALL_DOCUMENT_ID;
exports.TEMPLATE_DOCUMENTS = TEMPLATE_DOCUMENTS;
exports.TEMPLATE_SCENE_SOURCE_PATHS = TEMPLATE_SCENE_SOURCE_PATHS;
exports.cloneTemplateScene = cloneTemplateScene;
exports.createBarcodeBars = createBarcodeBars;
exports.escapeXml = escapeXml;
exports.getBarcodeGraphicHeight = getBarcodeGraphicHeight;
exports.getBarcodeValue = getBarcodeValue;
exports.getElementBounds = getElementBounds;
exports.getElementLabel = getElementLabel;
exports.getPlaceholderDefinitionsForSchema = getPlaceholderDefinitionsForSchema;
exports.getSampleDataForSchema = getSampleDataForSchema;
exports.getTemplateDocument = getTemplateDocument;
exports.getTemplateSceneSourcePath = getTemplateSceneSourcePath;
exports.getTextAnchorX = getTextAnchorX;
exports.getTextBlockHeight = getTextBlockHeight;
exports.getTextLayout = getTextLayout;
exports.getTextLines = getTextLines;
exports.getTextStartY = getTextStartY;
exports.getTextValue = getTextValue;
exports.itemLabelBasicDocument = itemLabelBasicDocument;
exports.placeholderDefinitionsBySchema = placeholderDefinitionsBySchema;
exports.resolveBindingValue = resolveBindingValue;
exports.sampleDataBySchema = sampleDataBySchema;
exports.sampleItemLabelData = sampleItemLabelData;
exports.sampleShippingSlipData = sampleShippingSlipData;
exports.sceneToSvgMarkup = sceneToSvgMarkup;
exports.shippingSlipBigDocument = shippingSlipBigDocument;
exports.shippingSlipSmallDocument = shippingSlipSmallDocument;
exports.wrapTextToWidth = wrapTextToWidth;
