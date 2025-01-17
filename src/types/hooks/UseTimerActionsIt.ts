export interface UseTimerActionsIt {
  pause: () => void;
  reset: () => void;
  skip: () => void;
  start: () => void;
  checkAlreadyStarted: () => boolean;
}
