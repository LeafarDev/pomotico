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
import { timerData } from "../../atoms/Timer.tsx";
import { useTimerPomodoro } from "../../hooks/useTimerPomodoro";
import { useServiceWorker } from "../../serviceWorker/ServiceWorkerContext.tsx";
import { formatTime } from "../../utils/timeUtils.ts";
import { BackgroundSound } from "../BackgroundSound/BackgroundSound.tsx";

export const Timer = (): ReactElement => {
  const { sw } = useServiceWorker();
  const {
    start,
    pause,
    reset,
    skip,
    startButtonText,
    statusDescriptionText,
    statusGif,
    iframeRef,
  } = useTimerPomodoro(sw);
  const [{ remainingTime, isRunning }] = useAtom(timerData);

  return (
    <TimerContent>
      <StatusWrapper>
        <GifImage src={statusGif} alt={statusDescriptionText} />
        <StatusText $statusText={statusDescriptionText}>
          {statusDescriptionText}
        </StatusText>
      </StatusWrapper>
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
