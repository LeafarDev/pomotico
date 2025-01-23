import { ChangeEvent } from "react";
import { AmbienceTracks } from "../../types/components/ConfigTimerFormTypes.ts";
import {
  UseAmbienceSoundHandlersIt,
  UseAmbienceSoundHandlersProps,
} from "../../types/hooks/useProfileForm/useAmbienceSoundHandlersIt.ts";

export const useAmbienceSoundHandlers = ({
  states,
  backgroundPlay,
  backgroundPause,
}: UseAmbienceSoundHandlersProps): UseAmbienceSoundHandlersIt => {
  const {
    setIsTestAmbienceButtonDisabled,
    setTestAmbienceButtonText,
    selectedSound,
    setSelectedSound,
    setAmbienceSoundChecked,
  } = states;

  const disableAmbienceTestButton = (): void => {
    setIsTestAmbienceButtonDisabled(true);
    setTestAmbienceButtonText("Tocando");
    backgroundPlay(selectedSound, true);
  };

  const enableAmbienceTestButton = (): void => {
    setIsTestAmbienceButtonDisabled(false);
    setTestAmbienceButtonText("Ouvir");
    backgroundPause();
  };

  const handleButtonTestSound = (): void => {
    disableAmbienceTestButton();

    setTimeout(() => {
      enableAmbienceTestButton();
    }, 35000);
  };

  const handleSoundChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    enableAmbienceTestButton();
    const songValue = e.target.value as AmbienceTracks;
    setSelectedSound(songValue);
  };

  const handleAllowAmbienceSoundChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (e.target.checked) {
      setAmbienceSoundChecked(true);
    } else {
      setAmbienceSoundChecked(false);
    }
  };

  return {
    handleAllowAmbienceSoundChange,
    handleSoundChange,
    handleButtonTestSound,
    enableAmbienceTestButton,
  };
};
