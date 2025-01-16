import { useAtom } from "jotai";
import { ReactElement } from "react";
import {
  ButtonsController,
  GifImage,
  StatusText,
  StatusWrapper,
  TimerContent,
  TimeRemaining,
} from "./timerStyle.ts";

import workingGif from "../../assets/gifs/reading.gif";
import restingGif from "../../assets/gifs/resting.gif";
import waitingGif from "../../assets/gifs/waiting.gif";
import { timerData } from "../../atoms/Timer.tsx";
import { useTimerPomodoro } from "../../hooks/useTimerPomodoro";
import { useServiceWorker } from "../../ServiceWorker/ServiceWorkerContext.tsx";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import { formatTime } from "../../utils/timeUtils.ts";
import { BackgroundSound } from "../BackgroundSound/BackgroundSound.tsx";

export const Timer = (): ReactElement => {
  const { sw } = useServiceWorker();
  const { start, pause, reset, skip, startButtonText, iframeRef } =
    useTimerPomodoro(sw);
  const [{ mode: focusMode, remainingTime, isRunning }] = useAtom(timerData);

  return (
    <TimerContent>
      {isRunning && (
        <StatusWrapper>
          <GifImage
            src={
              focusMode === TimerFocusMode.Focusing ? workingGif : restingGif
            }
            alt={
              focusMode === TimerFocusMode.Resting ? "Focando" : "Descansando"
            }
          />
          <StatusText $isFocusing={focusMode === TimerFocusMode.Focusing}>
            {focusMode === TimerFocusMode.Focusing ? "Focando" : "Descansando"}
          </StatusText>
        </StatusWrapper>
      )}
      {!isRunning && (
        <StatusWrapper>
          <GifImage src={waitingGif} alt={"Aguardando"} />
          <StatusText $isFocusing={focusMode === TimerFocusMode.Focusing}>
            {"Aguardando"}
          </StatusText>
        </StatusWrapper>
      )}
      <TimeRemaining>{formatTime(remainingTime)}</TimeRemaining>
      <ButtonsController>
        <button onClick={reset}>Resetar Tempo</button>
        <button onClick={skip}>Pular</button>
        <button onClick={isRunning ? pause : start}>{startButtonText}</button>
      </ButtonsController>
      <BackgroundSound iframeRef={iframeRef} />
    </TimerContent>
  );
};
