import itemLabelBasicScene from "./scenes/item-label-basic.json";
import shippingSlipBigScene from "./scenes/shipping-slip-big.json";
import shippingSlipSmallScene from "./scenes/shipping-slip-small.json";
import type {
  TemplateDocument,
  TemplateDocumentId,
  TemplateScene,
} from "./types";

export const SHIPPING_SLIP_BIG_DOCUMENT_ID = "shipping-slip-big";
export const SHIPPING_SLIP_SMALL_DOCUMENT_ID = "shipping-slip-small";
export const ITEM_LABEL_BASIC_DOCUMENT_ID = "item-label-basic";
export const DEFAULT_SHIPPING_SLIP_DOCUMENT_ID = SHIPPING_SLIP_BIG_DOCUMENT_ID;

export const TEMPLATE_SCENE_SOURCE_PATHS: Record<TemplateDocumentId, string> = {
  "shipping-slip-big":
    "packages/svg-template-core/src/scenes/shipping-slip-big.json",
  "shipping-slip-small":
    "packages/svg-template-core/src/scenes/shipping-slip-small.json",
  "item-label-basic":
    "packages/svg-template-core/src/scenes/item-label-basic.json",
};

export const shippingSlipBigDocument: TemplateDocument<"shipping-slip-v1"> = {
  id: SHIPPING_SLIP_BIG_DOCUMENT_ID,
  displayName: "Shipping Slip (Big)",
  templateFamily: "shipping-slip",
  contextSchema: "shipping-slip-v1",
  scene: shippingSlipBigScene as TemplateScene,
};

export const shippingSlipSmallDocument: TemplateDocument<"shipping-slip-v1"> = {
  id: SHIPPING_SLIP_SMALL_DOCUMENT_ID,
  displayName: "Shipping Slip (Small)",
  templateFamily: "shipping-slip",
  contextSchema: "shipping-slip-v1",
  scene: shippingSlipSmallScene as TemplateScene,
};

export const itemLabelBasicDocument: TemplateDocument<"item-label-v1"> = {
  id: ITEM_LABEL_BASIC_DOCUMENT_ID,
  displayName: "Item Label (Basic)",
  templateFamily: "item-label",
  contextSchema: "item-label-v1",
  scene: itemLabelBasicScene as TemplateScene,
};

export const TEMPLATE_DOCUMENTS = [
  shippingSlipBigDocument,
  shippingSlipSmallDocument,
  itemLabelBasicDocument,
] as const;

const templateDocumentMap = new Map<TemplateDocumentId, TemplateDocument>(
  TEMPLATE_DOCUMENTS.map((document) => [document.id, document]),
);

export const getTemplateDocument = (
  documentId: TemplateDocumentId,
): TemplateDocument => templateDocumentMap.get(documentId)!;

export const getTemplateSceneSourcePath = (
  documentId: TemplateDocumentId,
): string => TEMPLATE_SCENE_SOURCE_PATHS[documentId];

export const SHIPPING_SLIP_DOCUMENT_IDS = [
  SHIPPING_SLIP_BIG_DOCUMENT_ID,
  SHIPPING_SLIP_SMALL_DOCUMENT_ID,
] as const;

export type ShippingSlipTemplateDocumentId =
  (typeof SHIPPING_SLIP_DOCUMENT_IDS)[number];
