export type TemplateContextSchema = "shipping-slip-v1" | "item-label-v1";

export type TemplateDocumentId =
  | "shipping-slip-big"
  | "shipping-slip-small"
  | "item-label-basic";

export type TemplateFamily = "shipping-slip" | "item-label";

export interface PlaceholderDefinition {
  id: string;
  label: string;
}

export const DEFAULT_TEMPLATE_FONT_FAMILY =
  '"Noto Sans CJK TC", "Noto Sans TC", sans-serif';

export const placeholderDefinitionsBySchema: Record<
  TemplateContextSchema,
  readonly PlaceholderDefinition[]
> = {
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
} as const;

export type TextAnchor = "start" | "middle" | "end";
export type VerticalAlign = "top" | "middle" | "bottom";

export type SceneElementType = "text" | "rect" | "line" | "barcode";

type SceneElementBase = {
  id: string;
  name: string;
  type: SceneElementType;
  x: number;
  y: number;
  locked?: boolean;
};

export type SceneTextElement = SceneElementBase & {
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

export type SceneRectElement = SceneElementBase & {
  type: "rect";
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  radius: number;
};

export type SceneLineElement = SceneElementBase & {
  type: "line";
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
};

export type SceneBarcodeElement = SceneElementBase & {
  type: "barcode";
  width: number;
  height: number;
  value: string;
  binding: string;
  stroke: string;
  showValue: boolean;
};

export type SceneElement =
  | SceneTextElement
  | SceneRectElement
  | SceneLineElement
  | SceneBarcodeElement;

export type TemplateScene = {
  width: number;
  height: number;
  background: string;
  name: string;
  elements: SceneElement[];
};

export interface ShippingSlipTemplateData {
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

export interface ItemLabelTemplateData {
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

export interface TemplateContextDataMap {
  "shipping-slip-v1": ShippingSlipTemplateData;
  "item-label-v1": ItemLabelTemplateData;
}

export type TemplateContextData =
  TemplateContextDataMap[keyof TemplateContextDataMap];

export interface TemplateDocument<
  Schema extends TemplateContextSchema = TemplateContextSchema,
> {
  id: TemplateDocumentId;
  displayName: string;
  templateFamily: TemplateFamily;
  contextSchema: Schema;
  scene: TemplateScene;
}

export const getPlaceholderDefinitionsForSchema = (
  schema: TemplateContextSchema,
): readonly PlaceholderDefinition[] => placeholderDefinitionsBySchema[schema];

export const cloneTemplateScene = (scene: TemplateScene): TemplateScene =>
  structuredClone(scene);
