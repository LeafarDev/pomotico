import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ConfigDataType } from "../types/components/ConfigTimerFormTypes.ts";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../types/components/TimerTypes.ts";

export const isConfigModalOpen = atom(false);

export const timerData = atomWithStorage(
  "timerData",
  {
    mode: TimerFocusMode.Focusing,
    skipped: false,
    remainingTime: 25 * 60 * 1000,
    isRunning: false,
  } as TimerStatusType,
  undefined,
  {
    getOnInit: true,
  },
);

export const lastUpdatedTime = atomWithStorage("lastUpdatedTime", -1);

export const sprintConfigData = atomWithStorage<ConfigDataType>("sprintForm", {
  sprintTime: { minutes: 25, seconds: 0 },
  restTime: { minutes: 15, seconds: 0 },
  sprintGoal: 4,
  allowTextNotifications: false,
  allowSoundNotifications: true,
} as ConfigDataType);

export const sprintHistory = atomWithStorage<TimerStatusType[]>(
  "sprintHistory",
  [] as TimerStatusType[],
);

export const pausedTime = atomWithStorage(
  "pausedTime",
  undefined as number | undefined,
);
