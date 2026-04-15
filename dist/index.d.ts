//#region src/types.d.ts
type TemplateContextSchema = "shipping-slip-v1" | "item-label-v1";
type TemplateDocumentId = "shipping-slip-big" | "shipping-slip-small" | "item-label-basic";
type TemplateFamily = "shipping-slip" | "item-label";
interface PlaceholderDefinition {
  id: string;
  label: string;
}
declare const DEFAULT_TEMPLATE_FONT_FAMILY = "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif";
declare const placeholderDefinitionsBySchema: Record<TemplateContextSchema, readonly PlaceholderDefinition[]>;
type TextAnchor = "start" | "middle" | "end";
type VerticalAlign = "top" | "middle" | "bottom";
type SceneElementType = "text" | "rect" | "line" | "barcode";
type SceneElementBase = {
  id: string;
  name: string;
  type: SceneElementType;
  x: number;
  y: number;
  locked?: boolean;
};
type SceneTextElement = SceneElementBase & {
  type: "text";
  width: number;
  height: number;
  text: string;
  binding: string;
  fill: string;
  fontSize: number;
  fontWeight: 400 | 500 | 600 | 700;
  fontFamily: string;
  lineHeight: number;
  anchor: TextAnchor;
  verticalAlign: VerticalAlign;
  uppercase?: boolean;
};
type SceneRectElement = SceneElementBase & {
  type: "rect";
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  radius: number;
};
type SceneLineElement = SceneElementBase & {
  type: "line";
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
};
type SceneBarcodeElement = SceneElementBase & {
  type: "barcode";
  width: number;
  height: number;
  value: string;
  binding: string;
  stroke: string;
  showValue: boolean;
};
type SceneElement = SceneTextElement | SceneRectElement | SceneLineElement | SceneBarcodeElement;
type TemplateScene = {
  width: number;
  height: number;
  background: string;
  name: string;
  elements: SceneElement[];
};
interface ShippingSlipTemplateData {
  order: {
    orderNumber: string;
    courier: string;
    courierFeePaymentMethod: string;
    remarks: string;
    kubeRemarks: string;
  };
  shipTo: {
    recipientName: string;
    recipientContactPhone: string;
    shipToAddress: string;
    shipToDistrict: string;
    shipToProvince: string;
    shipToCountry: string;
    shipToZipCode: string;
  };
  computed: {
    ownerLabel: string;
    generatedAt: string;
    totalQty: string;
    lineCount: string;
    fullAddress: string;
    remarks: string;
    courierPayment: string;
  };
}
interface ItemLabelTemplateData {
  item: {
    sku: string;
    name: string;
    description: string;
    barcode: string;
    ownerLabel: string;
  };
  computed: {
    generatedAt: string;
    binLabel: string;
  };
}
interface TemplateContextDataMap {
  "shipping-slip-v1": ShippingSlipTemplateData;
  "item-label-v1": ItemLabelTemplateData;
}
type TemplateContextData = TemplateContextDataMap[keyof TemplateContextDataMap];
interface TemplateDocument<Schema extends TemplateContextSchema = TemplateContextSchema> {
  id: TemplateDocumentId;
  displayName: string;
  templateFamily: TemplateFamily;
  contextSchema: Schema;
  scene: TemplateScene;
}
declare const getPlaceholderDefinitionsForSchema: (schema: TemplateContextSchema) => readonly PlaceholderDefinition[];
declare const cloneTemplateScene: (scene: TemplateScene) => TemplateScene;
//#endregion
//#region src/documents.d.ts
declare const SHIPPING_SLIP_BIG_DOCUMENT_ID = "shipping-slip-big";
declare const SHIPPING_SLIP_SMALL_DOCUMENT_ID = "shipping-slip-small";
declare const ITEM_LABEL_BASIC_DOCUMENT_ID = "item-label-basic";
declare const DEFAULT_SHIPPING_SLIP_DOCUMENT_ID = "shipping-slip-big";
declare const TEMPLATE_SCENE_SOURCE_PATHS: Record<TemplateDocumentId, string>;
declare const shippingSlipBigDocument: TemplateDocument<"shipping-slip-v1">;
declare const shippingSlipSmallDocument: TemplateDocument<"shipping-slip-v1">;
declare const itemLabelBasicDocument: TemplateDocument<"item-label-v1">;
declare const TEMPLATE_DOCUMENTS: readonly [TemplateDocument<"shipping-slip-v1">, TemplateDocument<"shipping-slip-v1">, TemplateDocument<"item-label-v1">];
declare const getTemplateDocument: (documentId: TemplateDocumentId) => TemplateDocument;
declare const getTemplateSceneSourcePath: (documentId: TemplateDocumentId) => string;
declare const SHIPPING_SLIP_DOCUMENT_IDS: readonly ["shipping-slip-big", "shipping-slip-small"];
type ShippingSlipTemplateDocumentId = (typeof SHIPPING_SLIP_DOCUMENT_IDS)[number];
//#endregion
//#region src/render.d.ts
interface MeasureTextArgs {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
}
interface BarcodeRenderArgs {
  element: SceneBarcodeElement;
  value: string;
  escapeXml: (value: string) => string;
}
interface SceneRenderHooks {
  measureText?: (args: MeasureTextArgs) => number;
  renderBarcode?: (args: BarcodeRenderArgs) => Promise<string> | string;
}
declare const BARCODE_VALUE_HEIGHT = 14;
declare const escapeXml: (value: string) => string;
declare const resolveBindingValue: (binding: string, data: TemplateContextData) => string;
declare const getElementLabel: (element: SceneElement, data: TemplateContextData) => string;
declare const getTextValue: (element: SceneTextElement, data: TemplateContextData) => string;
declare const wrapTextToWidth: (text: string, maxWidth: number, fontSize: number, fontFamily: string, fontWeight: number, measureText: SceneRenderHooks["measureText"]) => string[];
declare const getTextLines: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => string[];
declare const getTextBlockHeight: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => number;
declare const getTextAnchorX: (element: SceneTextElement) => number;
declare const getTextStartY: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => number;
declare const getTextLayout: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => {
  lines: string[];
  anchorX: number;
  startY: number;
};
declare const getElementBounds: (element: SceneElement) => {
  x: number;
  y: number;
  width: number;
  height: number;
};
declare const createBarcodeBars: (value: string, width: number) => {
  x: number;
  width: number;
}[];
declare const getBarcodeGraphicHeight: (element: SceneBarcodeElement) => number;
declare const getBarcodeValue: (element: SceneBarcodeElement, data: TemplateContextData) => string;
declare const sceneToSvgMarkup: (scene: TemplateScene, data: TemplateContextData, hooks?: SceneRenderHooks) => Promise<string>;
//#endregion
//#region src/sample-data.d.ts
declare const sampleShippingSlipData: ShippingSlipTemplateData;
declare const sampleItemLabelData: ItemLabelTemplateData;
declare const sampleDataBySchema: TemplateContextDataMap;
declare const getSampleDataForSchema: <Schema extends TemplateContextSchema>(schema: Schema) => TemplateContextDataMap[Schema];
//#endregion
export { BARCODE_VALUE_HEIGHT, BarcodeRenderArgs, DEFAULT_SHIPPING_SLIP_DOCUMENT_ID, DEFAULT_TEMPLATE_FONT_FAMILY, ITEM_LABEL_BASIC_DOCUMENT_ID, ItemLabelTemplateData, MeasureTextArgs, PlaceholderDefinition, SHIPPING_SLIP_BIG_DOCUMENT_ID, SHIPPING_SLIP_DOCUMENT_IDS, SHIPPING_SLIP_SMALL_DOCUMENT_ID, SceneBarcodeElement, SceneElement, SceneElementType, SceneLineElement, SceneRectElement, SceneRenderHooks, SceneTextElement, ShippingSlipTemplateData, ShippingSlipTemplateDocumentId, TEMPLATE_DOCUMENTS, TEMPLATE_SCENE_SOURCE_PATHS, TemplateContextData, TemplateContextDataMap, TemplateContextSchema, TemplateDocument, TemplateDocumentId, TemplateFamily, TemplateScene, TextAnchor, VerticalAlign, cloneTemplateScene, createBarcodeBars, escapeXml, getBarcodeGraphicHeight, getBarcodeValue, getElementBounds, getElementLabel, getPlaceholderDefinitionsForSchema, getSampleDataForSchema, getTemplateDocument, getTemplateSceneSourcePath, getTextAnchorX, getTextBlockHeight, getTextLayout, getTextLines, getTextStartY, getTextValue, itemLabelBasicDocument, placeholderDefinitionsBySchema, resolveBindingValue, sampleDataBySchema, sampleItemLabelData, sampleShippingSlipData, sceneToSvgMarkup, shippingSlipBigDocument, shippingSlipSmallDocument, wrapTextToWidth };