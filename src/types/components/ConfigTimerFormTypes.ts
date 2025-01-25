import { TimerStatusType } from "./TimerTypes.ts";

export enum AmbienceTracks {
  City17 = "city17",
  ForestNight = "forestNight",
  Rain = "rain",
  Library = "library",
  Ravenholm = "ravenholm",
}

export type ProfileType = {
  id: string;
  title: string;
  active: boolean;
  sprintTime: {
    minutes: number;
    seconds: number;
  };
  restTime: {
    minutes: number;
    seconds: number;
  };
  longBreakTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  history: TimerStatusType[];
  qtySprintForLongBreak: number;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
  allowAmbienceSound: boolean;
  timer: TimerStatusType;
  ambienceSoundTrack: AmbienceTracks;
};

export type ProfileToFormDataType = Omit<
  ProfileType,
  "sprintTime" | "restTime" | "longBreakTime" | "qtySprintForLongBreak"
> & {
  qtySprintForLongBreak: string;
  sprintTime: {
    minutes: string;
    seconds: string;
  };
  restTime: {
    minutes: string;
    seconds: string;
  };
  longBreakTime: {
    hours: string;
    minutes: string;
    seconds: string;
  };
};

export interface TestAmbienceSoundButtonProps {
  $inactive: boolean;
}
export type ambienceTrackType = {
  label: string;
  value: string;
  url: string;
  author: string;
  path: string;
  description: string;
};

export type AmbienceSoundOptionsType = ambienceTrackType[];
