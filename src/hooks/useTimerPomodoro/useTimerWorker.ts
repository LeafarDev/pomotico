import {
  TimerEventDetail,
  TimerStatusType,
  UseTimerWorkerIt,
} from "../../types/types.ts";
// eslint-disable-next-line import/no-unresolved
import TimerWorker from "../../workers/timerWorker?worker";

const worker = new TimerWorker();

export const useTimerWorker = (): UseTimerWorkerIt => {
  const sendTimeWorkerMessage = (message: unknown): void => {
    worker.postMessage(message);
  };

  const onTimeWorkerMessage = (callback: (e: TimerEventDetail) => void) => {
    worker.onmessage = (e): void => callback(e.data);
  };

  const terminateTimeWorker = (): void => {
    worker.terminate();
  };

  const startWorker = (timerState: TimerStatusType): void => {
    const now = Date.now();
    sendTimeWorkerMessage({
      action: "start",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };

  const pauseWorker = (timerState: TimerStatusType): void => {
    const now = Date.now();
    sendTimeWorkerMessage({
      action: "pause",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };
  const resetWorker = (timerState: TimerStatusType): void => {
    const now = Date.now();
    sendTimeWorkerMessage({
      action: "reset",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };

  const skipWorker = (timerState: TimerStatusType): void => {
    const now = Date.now();
    sendTimeWorkerMessage({
      action: "skip",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };

  return {
    sendTimeWorkerMessage,
    onTimeWorkerMessage,
    terminateTimeWorker,
    startWorker,
    resetWorker,
    pauseWorker,
    skipWorker,
  };
};
