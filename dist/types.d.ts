export type TemplateContextSchema = "shipping-slip-v1" | "item-label-v1";
export type TemplateDocumentId = "shipping-slip-big" | "shipping-slip-small" | "item-label-basic";
export type TemplateFamily = "shipping-slip" | "item-label";
export interface PlaceholderDefinition {
    id: string;
    label: string;
}
export declare const DEFAULT_TEMPLATE_FONT_FAMILY = "\"Noto Sans CJK TC\", \"Noto Sans TC\", sans-serif";
export declare const placeholderDefinitionsBySchema: Record<TemplateContextSchema, readonly PlaceholderDefinition[]>;
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
export type SceneElement = SceneTextElement | SceneRectElement | SceneLineElement | SceneBarcodeElement;
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
export type TemplateContextData = TemplateContextDataMap[keyof TemplateContextDataMap];
export interface TemplateDocument<Schema extends TemplateContextSchema = TemplateContextSchema> {
    id: TemplateDocumentId;
    displayName: string;
    templateFamily: TemplateFamily;
    contextSchema: Schema;
    scene: TemplateScene;
}
export declare const getPlaceholderDefinitionsForSchema: (schema: TemplateContextSchema) => readonly PlaceholderDefinition[];
export declare const cloneTemplateScene: (scene: TemplateScene) => TemplateScene;
export {};
