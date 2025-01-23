import { ChangeEvent } from "react";
import { UseFormStateIt } from "./UseFormStateIt.ts";
import { AmbienceTracks } from "../../components/ConfigTimerFormTypes.ts";

export interface UseAmbienceSoundHandlersProps {
  states: UseFormStateIt;
  backgroundPlay: (songValue: AmbienceTracks, testMode: boolean) => void;
  backgroundPause: () => void;
}

export interface UseAmbienceSoundHandlersIt {
  enableAmbienceTestButton: () => void;
  handleAllowAmbienceSoundChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleButtonTestSound: () => void;
  handleSoundChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
