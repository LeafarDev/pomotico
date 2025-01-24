import { ProfileType } from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import { toMilliseconds } from "../../utils/timeUtils.ts";

export const getOriginalRemainingTime = ({
  mode,
  profile,
}: {
  mode: TimerFocusMode;
  profile: ProfileType;
}): number => {
  const { Resting, LongBreak } = TimerFocusMode;

  switch (mode) {
    case Resting:
      return toMilliseconds(profile.restTime.minutes, profile.restTime.seconds);
    case LongBreak:
      return toMilliseconds(
        profile.longBreakTime.minutes,
        profile.longBreakTime.seconds,
      );
    default:
      return toMilliseconds(
        profile.sprintTime.minutes,
        profile.sprintTime.seconds,
      );
  }
};
