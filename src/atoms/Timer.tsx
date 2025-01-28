import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import city17 from "../assets/songs/ambience/city17.mp3";
import forestNight from "../assets/songs/ambience/forestNight.mp3";
import library from "../assets/songs/ambience/library.mp3";
import rain from "../assets/songs/ambience/rain.mp3";
import ravenholm from "../assets/songs/ambience/ravenholm.mp3";
import {
  AmbienceSoundOptionsType,
  AmbienceTracks,
  ProfileType,
} from "../types/components/ConfigTimerFormTypes.ts";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../types/components/TimerTypes.ts";

export const isConfigModalOpen = atom(false);
export const isGraphModalOpen = atom(false);

export const lastUpdatedTime = atomWithStorage("lastUpdatedTime", -1);
export const lastEndedNotified = atomWithStorage(
  "lastEndedNotified",
  -1,
  undefined,
  {
    getOnInit: true,
  },
);

export const defaultTimer: TimerStatusType = {
  mode: TimerFocusMode.Focusing,
  skipped: false,
  remainingTime: 25 * 60 * 1000,
  isRunning: false,
};

export const defaultProfile: ProfileType = {
  id: "cbd69f8f-1ace-4c77-997e-df96ad695f08",
  title: "Perfil Padrão",
  sprintTime: { minutes: 25, seconds: 0 },
  restTime: { minutes: 5, seconds: 0 },
  longBreakTime: { hours: 0, minutes: 35, seconds: 0 },
  history: [],
  qtySprintForLongBreak: 4,
  allowTextNotifications: true,
  allowSoundNotifications: false,
  allowAmbienceSound: true,
  ambienceSoundTrack: AmbienceTracks.City17,
  timer: defaultTimer,
  active: true,
};

export const activeProfile = atomWithStorage<ProfileType>(
  "activeProfile",
  defaultProfile,
  undefined,
  {
    getOnInit: true,
  },
);
export const profileTypes = atomWithStorage<ProfileType[]>("profileTypes", [
  defaultProfile,
]);

export const pausedTime = atomWithStorage(
  "pausedTime",
  undefined as number | undefined,
);

export const ambianceOptions = atomWithStorage<AmbienceSoundOptionsType>(
  "ambianceOptions",
  [
    {
      label: "City 17",
      value: "city17",
      url: "https%3A//soundcloud.com/researcher_turtle/half-life-2-city-17-ambience",
      author: "sole",
      path: city17,
      description: "Half-Life 2 - City 17 Ambience [1 Hour]",
    },
    {
      label: "Floresta à Noite",
      value: "forestNight",
      url: "https://soundcloud.com/mariuszpierog/frogs-sounds-forest-sounds-at-night-owls-crickets-for-sleep-study-relaxing-n018",
      author: "Mariusz Pierog",
      path: forestNight,
      description:
        'Frogs sounds "Forest Sounds at Night", owls, crickets for sleep, study, relaxing #N018',
    },
    {
      label: "Chuva",
      value: "rain",
      url: "https://soundcloud.com/relaxingwhitenoisesounds/pure-rain-1-hour-of-relaxing",
      author: "Relaxing White Noise Sounds",
      path: rain,
      description:
        "Pure Rain: 1 Hour of Relaxing Rain Sounds for Study and Sleep",
    },
    {
      label: "Biblioteca",
      value: "library",
      url: "https://soundcloud.com/user-538256880-946417747/library-ambience",
      author: "bqchypx",
      path: library,
      description: "Library ambience",
    },
    {
      label: "Ravenholm",
      value: "ravenholm",
      url: "https://soundcloud.com/hexadecadent/half-life-2-ravenholm-ambience",
      author: "Hexadecadent",
      path: ravenholm,
      description: "Half - Life 2 - Ravenholm Ambience",
    },
  ],
);
