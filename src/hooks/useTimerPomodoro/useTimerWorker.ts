// eslint-disable-next-line import/no-unresolved
import { TimerEventDetail } from "../../types/types.ts";
import TimerWorker from "../../workers/timerWorker?worker";
const worker = new TimerWorker();

export const useTimerWorker = () => {
  const sendTimeWorkerMessage = (message: MessageEvent<TimerEventDetail>) => {
    worker.postMessage(message);
  };

  const onTimeWorkerMessage = (
    callback: (data: MessageEvent<TimerEventDetail>) => void,
  ) => {
    worker.onmessage = (e) => callback(e.data);
  };

  const terminateTimeWorker = () => {
    worker.terminate();
  };

  return {
    sendTimeWorkerMessage,
    onTimeWorkerMessage,
    terminateTimeWorker,
  };
};
