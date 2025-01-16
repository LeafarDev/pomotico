import { TimerStatusType } from "../components/TimerTypes.ts";
import { TimerEventDetailIt } from "../webWorker/TimerEventDetailIt.ts";

export interface UseTimerWorkerIt {
  sendTimeWorkerMessage: (message: unknown) => void;
  onTimeWorkerMessage: (callback: (e: TimerEventDetailIt) => void) => void;
  terminateTimeWorker: () => void;
  startWorker: (timerState: TimerStatusType) => void;
  resetWorker: (timerState: TimerStatusType) => void;
  pauseWorker: (timerState: TimerStatusType) => void;
  skipWorker: (timerState: TimerStatusType) => void;
  resumeWorker: (timerState: TimerStatusType) => void;
}
