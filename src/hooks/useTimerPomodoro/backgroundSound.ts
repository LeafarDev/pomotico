import { MutableRefObject, useEffect, useRef } from "react";
import { SCWidget } from "../../types/scTypes.ts";

export const useBackgroundSound = (): {
  backgroundPlay: () => void;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
} => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SCWidget | null>(null);

  const backgroundPlay = () => {
    if (widgetRef) {
      if (widgetRef.current) {
        widgetRef.current.play();
      }
    }
  };

  useEffect(() => {
    const widgetScript = document.createElement("script");
    widgetScript.src = "https://w.soundcloud.com/player/api.js";
    widgetScript.onload = () => {
      if (iframeRef.current) {
        const widget = window.SC.Widget(iframeRef.current);

        widget.bind(window.SC.Widget.Events.FINISH, () => {
          widget.play();
        });

        widgetRef.current = widget;
      }
    };
    document.body.appendChild(widgetScript);

    return () => {
      document.body.removeChild(widgetScript);
    };
  }, []);

  return { backgroundPlay, iframeRef };
};
