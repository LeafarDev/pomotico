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
import { activeProfileTimerData } from "../../atoms/Timer.tsx";
import { useTimerPomodoro } from "../../hooks/useTimerPomodoro";
import { useServiceWorker } from "../../serviceWorker/ServiceWorkerContext.tsx";
import { formatTime } from "../../utils/timeUtils.ts";

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
  } = useTimerPomodoro(sw);
  const [{ remainingTime, isRunning }] = useAtom(activeProfileTimerData);

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
    </TimerContent>
  );
};
