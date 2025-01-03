import { ReactElement } from "react";
import {
  ButtonsController,
  TimerContent,
  TimeRemaining,
} from "./timerStyle.ts";
import { useTimerPomodoro } from "./useTimerPomodoro.ts";

export const Timer = (): ReactElement => {
  const { formatTime, start, pause, reset, isRunning } = useTimerPomodoro();

  return (
    <TimerContent>
      <TimeRemaining>{formatTime()}</TimeRemaining>
      <ButtonsController>
        <button onClick={isRunning ? pause : start}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={reset}>Resetar</button>
      </ButtonsController>
    </TimerContent>
  );
};
