import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const countAtom = atom(0);
// Atoms with storage
export const remainingTimeAtom = atomWithStorage(
  "remainingTime",
  25 * 60 * 1000,
); // 25 minutes in milliseconds
export const isConfigModalOpen = atom(false);
export const isRunningAtom = atomWithStorage("isRunning", false);
export const sprintConfigData = atomWithStorage("sprintForm", {
  sprintTime: { minutes: 50, seconds: 0 },
  restTime: { minutes: 15, seconds: 0 },
  sprintGoal: 4,
});

