import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { activeProfile, ambianceOptions } from "../../atoms/Timer.tsx";
import { tracksValues } from "../../types/components/ConfigTimerFormTypes.ts";
import { SCWidget } from "../../types/global/SCWidgetTypes.ts";
import { UseBackgroundSoundIt } from "../../types/hooks/UseBackgroundSoundIt.ts";

const iframeRefSingleton = { current: null as HTMLIFrameElement | null };
const widgetRefSingleton = { current: null as SCWidget | null };

export const useBackgroundSound = (): UseBackgroundSoundIt => {
  const [ambianceSoundOptions] = useAtom(ambianceOptions);
  const [{ allowAmbienceSound }] = useAtom(activeProfile);
  const [currentTrackUrl, setCurrentTrackUrl] = useState(
    "https://soundcloud.com/mariuszpierog/frogs-sounds-forest-sounds-at-night-owls-crickets-for-sleep-study-relaxing-n018",
  );

  const backgroundPlay = (
    songValue: tracksValues = "city17",
    testMode: boolean = false,
  ): void => {
    if (testMode || allowAmbienceSound) {
      const song = ambianceSoundOptions.find(
        (item) => item.value === songValue,
      );
      const songUrl = song?.url as string;
      setCurrentTrackUrl(songUrl);

      if (widgetRefSingleton.current) {
        widgetRefSingleton.current.load(songUrl, { auto_play: true });
      }
    }
  };

  const backgroundPause = (): void => {
    if (widgetRefSingleton.current) {
      widgetRefSingleton.current.pause();
    }
  };

  useEffect(() => {
    if (!widgetRefSingleton.current) {
      const widgetScript = document.createElement("script");
      widgetScript.src = "https://w.soundcloud.com/player/api.js";
      widgetScript.onload = (): void => {
        if (iframeRefSingleton.current) {
          const widget = window.SC.Widget(iframeRefSingleton.current);

          widget.bind(window.SC.Widget.Events.FINISH, () => {
            widget.play();
          });

          widgetRefSingleton.current = widget;
        }
      };
      document.body.appendChild(widgetScript);

      return (): void => {
        document.body.removeChild(widgetScript);
      };
    }
  }, []);

  return {
    backgroundPlay,
    backgroundPause,
    iframeRef: iframeRefSingleton,
    currentTrackUrl,
  };
};
