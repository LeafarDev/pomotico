import { ReactElement } from "react";
import { HiddenIframe } from "./backgroundSoundStyle.ts";
import { useBackgroundSound } from "../../hooks/useBackgroundSound";

export const BackgroundSound = (): ReactElement => {
  const { iframeRef, currentTrackUrl } = useBackgroundSound();
  return (
    <HiddenIframe
      ref={iframeRef}
      src={
        `https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrackUrl)}` ||
        "about:blank"
      } // Fallback URL to avoid invalid iframe state
      title="SoundCloud Player"
    />
  );
};
