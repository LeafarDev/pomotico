import { SCWidget } from "./SCWidgetTypes.ts";

import { TimerEventDetailIt } from "../webWorker/TimerEventDetailIt.ts";

declare global {
  interface Window {
    SC: { Widget: SCWidget };
  }
  interface WindowEventMap {
    timerEvent: CustomEvent<TimerEventDetailIt>;
  }
}
