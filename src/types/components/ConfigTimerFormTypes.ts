export type tracksValues =
  | "city17"
  | "forestNight"
  | "rain"
  | "library"
  | "ravenholm";

export type ConfigDataType = {
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
  qtySprintForLongBreak: number;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
  allowAmbienceSound: boolean;
  ambienceSoundTrack: tracksValues;
};
export interface TestAmbienceSoundButtonProps {
  $inactive: boolean;
}
export type ConfigDataToFormType = {
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
  qtySprintForLongBreak: string;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
  allowAmbienceSound: boolean;
  ambienceSoundTrack: tracksValues;
};

export type AmbienceSoundOptions = {
  label: string;
  value: string;
  url: string;
  author: string;
  description: string;
}[];
