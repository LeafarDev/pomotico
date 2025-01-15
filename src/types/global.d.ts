import { SCWidget } from "./scTypes.ts";

declare global {
  interface Window {
    SC: { Widget: SCWidget };
  }
}
