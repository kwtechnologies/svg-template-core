import type { SceneBarcodeElement, SceneElement, SceneTextElement, TemplateContextData, TemplateScene } from "./types";
export interface MeasureTextArgs {
    text: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
}
export interface BarcodeRenderArgs {
    element: SceneBarcodeElement;
    value: string;
    escapeXml: (value: string) => string;
}
export interface SceneRenderHooks {
    measureText?: (args: MeasureTextArgs) => number;
    renderBarcode?: (args: BarcodeRenderArgs) => Promise<string> | string;
}
export declare const BARCODE_VALUE_HEIGHT = 14;
export declare const escapeXml: (value: string) => string;
export declare const resolveBindingValue: (binding: string, data: TemplateContextData) => string;
export declare const getElementLabel: (element: SceneElement, data: TemplateContextData) => string;
export declare const getTextValue: (element: SceneTextElement, data: TemplateContextData) => string;
export declare const wrapTextToWidth: (text: string, maxWidth: number, fontSize: number, fontFamily: string, fontWeight: number, measureText: SceneRenderHooks["measureText"]) => string[];
export declare const getTextLines: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => string[];
export declare const getTextBlockHeight: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => number;
export declare const getTextAnchorX: (element: SceneTextElement) => number;
export declare const getTextStartY: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => number;
export declare const getTextLayout: (element: SceneTextElement, data: TemplateContextData, hooks?: SceneRenderHooks) => {
    lines: string[];
    anchorX: number;
    startY: number;
};
export declare const getElementBounds: (element: SceneElement) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const createBarcodeBars: (value: string, width: number) => {
    x: number;
    width: number;
}[];
export declare const getBarcodeGraphicHeight: (element: SceneBarcodeElement) => number;
export declare const getBarcodeValue: (element: SceneBarcodeElement, data: TemplateContextData) => string;
export declare const sceneToSvgMarkup: (scene: TemplateScene, data: TemplateContextData, hooks?: SceneRenderHooks) => Promise<string>;
