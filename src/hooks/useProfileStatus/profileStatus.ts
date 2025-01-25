import { useAtom } from "jotai/index";
import { activeProfile, ambianceOptions } from "../../atoms/Timer.tsx";
import { ambienceTrackType } from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";

export const useProfileStatus = () => {
  const { Focusing, LongBreak } = TimerFocusMode;
  const [currentActiveProfile] = useAtom(activeProfile);
  const [ambienceSounds] = useAtom(ambianceOptions);

  const qtyTodayFinished = () => {
    const today = new Date();
    const finishedItems = currentActiveProfile.history.filter((item) => {
      if (item.mode !== Focusing || !item.endTime || item.skipped) {
        return false;
      }

      const endDate = new Date(item.endTime);
      return (
        endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getDate() === today.getDate()
      );
    });
    return finishedItems.length; // Return the count of items that match today's date
  };

  const qtyTotalFinished = () => {
    const finishedItems = currentActiveProfile.history.filter((item) => {
      if (item.mode !== Focusing || !item.endTime || item.skipped) {
        return false;
      }
      return true;
    });
    return finishedItems.length;
  };

  const qtyTotalFinishedSkipped = () => {
    const finishedItems = currentActiveProfile.history.filter((item) => {
      if (item.skipped && item.mode === Focusing) {
        return true;
      }
      return false;
    });
    return finishedItems.length;
  };

  const qtyTodayFinishedSkipped = () => {
    const today = new Date();
    const finishedItems = currentActiveProfile.history.filter((item) => {
      if (item.mode === Focusing && item.skipped && item.endTime) {
        const endDate = new Date(item.endTime);
        return (
          endDate.getFullYear() === today.getFullYear() &&
          endDate.getMonth() === today.getMonth() &&
          endDate.getDate() === today.getDate()
        );
      }
      return false;
    });
    return finishedItems.length; // Return the count of items that match today's date
  };

  const ambienceSound = () => {
    return ambienceSounds.find(
      (item: ambienceTrackType) =>
        item.value === currentActiveProfile.ambienceSoundTrack,
    );
  };

  const qtyFocusUntilNextLongBrake = () => {
    const { history, qtySprintForLongBreak } = currentActiveProfile;
    const completedFocusing =
      history.filter((item) => item.mode === Focusing).length + 1;
    if (completedFocusing >= qtySprintForLongBreak) {
      const lastLongBreakIndex = history.findLastIndex(
        (h) => h.mode === LongBreak,
      );
      const recentFocus = history
        .slice(lastLongBreakIndex + 1)
        .filter((item) => item.mode === Focusing);

      return recentFocus.length;
    }

    return completedFocusing;
  };

  return {
    profile: currentActiveProfile,
    qtyTodayFinished,
    qtyTotalFinished,
    ambienceSound,
    qtyFocusUntilNextLongBrake,
    qtyTotalFinishedSkipped,
    qtyTodayFinishedSkipped,
  };
};
