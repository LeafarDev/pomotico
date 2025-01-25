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
import { activeProfile } from "../../atoms/Timer.tsx";
import { useTimerPomodoro } from "../../hooks/useTimerPomodoro";
import { formatTime } from "../../utils/timeUtils.ts";
import { ProfileStatus } from "../ProfileStatus/ProfileStatus.tsx";

export const Timer = (): ReactElement => {
  const {
    start,
    pause,
    reset,
    skip,
    startButtonText,
    statusDescriptionText,
    statusGif,
  } = useTimerPomodoro();

  const [currentActiveProfile] = useAtom(activeProfile);
  const { remainingTime, isRunning } = currentActiveProfile.timer;

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
      <ProfileStatus></ProfileStatus>
    </TimerContent>
  );
};
