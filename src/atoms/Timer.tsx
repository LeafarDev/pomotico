import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TimerFocusMode, TimerStatus } from "../types.ts";

export const isConfigModalOpen = atom(false);

export const timerData = atomWithStorage("timerData", {
  mode: TimerFocusMode.Focusing,
  remainingTime: 25 * 60 * 1000,
  isRunning: false,
} as TimerStatus);

export const sprintConfigData = atomWithStorage("sprintForm", {
  sprintTime: { minutes: 25, seconds: 0 },
  restTime: { minutes: 15, seconds: 0 },
  sprintGoal: 4,
});

export const sprintHistory = atomWithStorage(
  "sprintHistory",
  [] as TimerStatus[],
);

export const pausedTime = atomWithStorage(
  "pausedTime",
  undefined as number | undefined,
);
