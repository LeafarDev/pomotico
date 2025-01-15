import { FC } from "react";
import { HiddenIframe } from "./backgroundSoundStyle.ts";

interface BackgroundSoundProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const BackgroundSound: FC<BackgroundSoundProps> = ({ iframeRef }) => (
  <HiddenIframe
    ref={iframeRef}
    src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/researcher_turtle/half-life-2-city-17-ambience&auto_play=false"
    title="SoundCloud Player"
  />
);
