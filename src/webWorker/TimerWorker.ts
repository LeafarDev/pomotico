import { IndexedDB } from "../indexedDB/indexedDB.ts";
import { TimerStatusType } from "../types/components/TimerTypes.ts";
import { TimerEventDetailIt } from "../types/webWorker/TimerEventDetailIt.ts";

let intervalId: number | undefined;
const { saveToDB, loadFromDB } = IndexedDB();

const calculateElapsedTime = (lastUpdated: number): number => {
  const now = Date.now();
  return now - lastUpdated;
};

const calculateRemainingTimer = (
  remainingTime: number,
  elapsedTime: number,
): number => {
  return remainingTime - elapsedTime;
};

const updateTimer = (timerState: TimerStatusType) => {
  return setInterval(async () => {
    const lastUpdated = Number(await loadFromDB("lastUpdatedWorker"));
    const elapsedTime = calculateElapsedTime(lastUpdated);

    if (timerState.remainingTime <= elapsedTime) {
      self.postMessage({
        action: "finished",
        type: "background",
      });

      stopUpdateTimer();
      return;
    }

    const remainingTime = calculateRemainingTimer(
      timerState.remainingTime,
      elapsedTime,
    );

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

    await saveToDB("lastUpdatedWorker", Date.now());
  }, 1000);
};

const stopUpdateTimer = (): void => {
  clearInterval(intervalId);
  intervalId = undefined;
};
const startUpdateTimer = (timerState: TimerStatusType): void => {
  intervalId = updateTimer(timerState) as unknown as number;
};

self.onmessage = async (e: MessageEvent<TimerEventDetailIt>): Promise<void> => {
  const { action, value, lastUpdated: lastUpdatedState } = e.data;

  if (action == "start") {
    if (lastUpdatedState === -1) {
      await saveToDB("lastUpdatedWorker", Date.now());
    } else {
      await saveToDB("lastUpdatedWorker", lastUpdatedState);
    }

    if (!intervalId) {
      startUpdateTimer(value as TimerStatusType);
    }
  }

  if (action == "resume") {
    if (!intervalId) {
      startUpdateTimer(value as TimerStatusType);
    }
  }

  if (action == "pause" || action == "skip") {
    stopUpdateTimer();
  }

  if (action === "reset") {
    stopUpdateTimer();
    await saveToDB("lastUpdatedWorker", Date.now());
  }

  if (action === "terminateTimer") {
    await saveToDB("lastUpdatedWorker", -1);
  }
};

export {};
