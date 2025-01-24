import { getOriginalRemainingTime } from "./getOriginalRemainingTime.ts";
import { ProfileType } from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerStatusType } from "../../types/components/TimerTypes.ts";

export const checkTimerAlreadyStarted = ({
  timerStatus,
  profile,
}: {
  timerStatus: TimerStatusType;
  profile: ProfileType;
}): boolean => {
  const { mode, startTime, remainingTime } = timerStatus;
  const originalRemainingTime = getOriginalRemainingTime({ mode, profile });

  if (!startTime) {
    return false;
  }

  return <boolean>(startTime && remainingTime < originalRemainingTime);
};
