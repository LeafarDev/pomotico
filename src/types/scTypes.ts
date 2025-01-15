export interface SCWidgetEvents {
  LOAD_PROGRESS: string;
  PLAY_PROGRESS: string;
  PLAY: string;
  PAUSE: string;
  FINISH: string;
  SEEK: string;
  READY: string;
  OPEN_SHARE_PANEL: string;
  CLICK_DOWNLOAD: string;
  CLICK_BUY: string;
  ERROR: string;
}

export interface SCBridge {
  REMOVE_LISTENER: string;
  ADD_LISTENER: string;
}

export interface SCAPIMethods {
  GET_VOLUME: string;
  GET_DURATION: string;
  GET_POSITION: string;
  GET_SOUNDS: string;
  GET_CURRENT_SOUND: string;
  GET_CURRENT_SOUND_INDEX: string;
  IS_PAUSED: string;
}

export interface SCPlaybackMethods {
  PLAY: string;
  PAUSE: string;
  TOGGLE: string;
  SEEK_TO: string;
  SET_VOLUME: string;
  NEXT: string;
  PREV: string;
  SKIP: string;
}

interface SCWidgetLoadOptions {
  params?: Record<string, never>;
  callback?: () => void;
}

export interface SCWidget {
  (
    element: string | HTMLElement,
    track?: string,
    options?: Record<string, any>,/* eslint-disable-line */
  ): any;/* eslint-disable-line */
  Events: SCWidgetEvents;
  bridge: SCBridge;
  API: SCAPIMethods;
  Playback: SCPlaybackMethods;
  current: SCWidget;
  bind(event: string, callback: () => void): void;
  unbind(event: string): void;
  load(track: string, options?: SCWidgetLoadOptions): void;
  play(): Promise<void>;
  getVolume(): Promise<number>;
  getDuration(): Promise<number>;
  getPosition(): Promise<number>;
  getCurrentSoundIndex(): Promise<number>;
  isPaused(): Promise<boolean>;
}
