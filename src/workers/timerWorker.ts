import { TimerEventDetail, TimerStatusType } from "../types/types.ts";
let intervalId: number | undefined;

const updateTimer = (
  lastUpdated: number,
  timerState: TimerStatusType,
  action: "start",
) => {
  return setInterval(() => {
    const now = Date.now();
    const elapsedTime = now - lastUpdated;
    if (timerState.remainingTime <= elapsedTime) {
      self.postMessage({
        action: "finished",
        type: "background",
      });
    }

    const remainingTime = timerState.remainingTime - elapsedTime;
    self.postMessage({
      action: "updateTimer",
      type: "background",
      value: {
        ...timerState,
        remainingTime,
      },
      lastUpdated,
    });
    timerState = {
      ...timerState,
      remainingTime,
    };

    console.log(intervalId, action);
    lastUpdated = Date.now();
  }, 1000);
};

const stopUpdateTimer = () => {
  clearInterval(intervalId);
  intervalId = undefined;
};

self.onmessage = (e: MessageEvent<TimerEventDetail>): void => {
  const { action, value, lastUpdated: lastUpdatedState } = e.data;
  let timerState: TimerStatusType;
  let lastUpdated = Date.now();

  if (lastUpdatedState === -1) {
    lastUpdated = Date.now();
  }

  if (action == "start") {
    if (intervalId) {
      return;
    }
    timerState = value as TimerStatusType;
    intervalId = updateTimer(lastUpdated, timerState, action);
  }

  if (action == "pause") {
    stopUpdateTimer();
  }

  if (action == "reset") {
    stopUpdateTimer();
  }

  if (action == "skip") {
    stopUpdateTimer();
  }
};

export {};
