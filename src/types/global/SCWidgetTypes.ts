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

export interface SoundCloudTrack {
  id: number;
  title: string;
  duration: number;
  permalink_url: string;
  // Add more properties as needed from SoundCloud's track data.
}
export interface SCWidget {
  (element: string | HTMLElement): SCWidget;

  Events: SCWidgetEvents;
  bind(event: string, callback: () => void): void;
  unbind(event: string): void;

  load(
    track: string,
    options?: {
      auto_play?: boolean;
      buying?: boolean;
      liking?: boolean;
      download?: boolean;
      sharing?: boolean;
      show_artwork?: boolean;
      show_comments?: boolean;
      show_playcount?: boolean;
      show_user?: boolean;
      single_active?: boolean;
      visual?: boolean;
      start_track?: number;
    },
  ): void;

  play(): void;
  pause(): void;

  getVolume(callback: (volume: number) => void): void;
  setVolume(volume: number): void;

  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  seekTo(milliseconds: number): void;

  getCurrentSound(callback: (sound: SoundCloudTrack) => void): void;
  getCurrentSoundIndex(callback: (index: number) => void): void;

  isPaused(callback: (paused: boolean) => void): void;
  toggle(): void;

  next(): void;
  previous(): void;
}
