import workingGif from "../../assets/gifs/reading.gif";
import restingGif from "../../assets/gifs/resting.gif";
import longBreakGif from "../../assets/gifs/sleeping.gif";
import waitingGif from "../../assets/gifs/waiting.gif";

import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";
import { TimerTextDescriptionStatusIt } from "../../types/hooks/UseTimerTextDescriptionStatusIt.ts";

export const useTimerStatusDescriptions = (
  states: UseTimerStateIt,
  checkAlreadyStarted: () => boolean,
): TimerTextDescriptionStatusIt => {
  const { currentTimerState, currentActiveProfile } = states;

  const getStartButtonText = (): string => {
    const mode = currentTimerState.mode;
    const { Focusing, Resting } = TimerFocusMode;

    if (currentTimerState.isRunning) return "Pausar";
    if (mode === Focusing) {
      return checkAlreadyStarted() ? "Retomar Sprint" : "Iniciar Foco";
    } else if (mode === Resting) {
      return checkAlreadyStarted() ? "Retomar Descanso" : "Iniciar Descanso";
    }

    return checkAlreadyStarted()
      ? "Retomar Pausa Longa"
      : "Iniciar Pausa Longa";
  };

  const getStatusText = (): string => {
    const mode = currentTimerState.mode;
    const { Focusing, Resting } = TimerFocusMode;
    const profile = currentActiveProfile.title;
    if (!currentTimerState.isRunning) {
      return profile + ":Aguardando";
    }

    if (mode === Focusing) {
      return profile + ":Focando";
    } else if (mode === Resting) {
      return profile + ":Descanso rápido";
    }

    return profile + ":Pausa longa";
  };

  const getStatusGif = (): string => {
    const mode = currentTimerState.mode;
    const { Focusing, Resting } = TimerFocusMode;

    if (!currentTimerState.isRunning) {
      return waitingGif;
    }

    if (mode === Focusing) {
      return workingGif;
    } else if (mode === Resting) {
      return restingGif;
    }

    return longBreakGif;
  };

  return {
    getStartButtonText,
    getStatusText,
    getStatusGif,
  };
};
