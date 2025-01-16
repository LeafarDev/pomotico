export interface TimerEventDetailIt {
  action:
    | "start"
    | "pause"
    | "reset"
    | "skip"
    | "finished"
    | "updateTimer"
    | "resume";
  type: "background" | "ui";
  value?: unknown;
  lastUpdated?: number;
  sessionId?: number;
}
