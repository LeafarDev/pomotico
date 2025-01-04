export const secondsToMilliseconds = (seconds: number): number =>
  seconds * 1000;
export const minutesToMilliseconds = (minutes: number): number =>
  minutes * 60 * 1000;

export const toMilliseconds = (minutes: number, seconds: number): number => {
  return minutesToMilliseconds(minutes) + secondsToMilliseconds(seconds);
};

export const formatTime = (remainingTime: number): string => {
  const minutes = Math.floor(remainingTime / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = ((remainingTime % 60000) / 1000).toFixed(0).padStart(2, "0");
  return `${minutes}:${seconds}`;
};
