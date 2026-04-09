import type { ItemLabelTemplateData, ShippingSlipTemplateData, TemplateContextDataMap, TemplateContextSchema } from "./types";
export declare const sampleShippingSlipData: ShippingSlipTemplateData;
export declare const sampleItemLabelData: ItemLabelTemplateData;
export declare const sampleDataBySchema: TemplateContextDataMap;
export declare const getSampleDataForSchema: <Schema extends TemplateContextSchema>(schema: Schema) => TemplateContextDataMap[Schema];
