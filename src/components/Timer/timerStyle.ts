import { styled, keyframes } from "styled-components";

export const TimerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const TimeRemaining = styled.span`
  font-size: clamp(8em, 17vw, 17em);
  font-weight: 700;
  padding: 1rem;
  color: #dfd8d8;
  font-family: "Roboto Mono", monospace;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ButtonsController = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    padding: 0.6rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #f44336;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: #e53935;
    }

    &:active {
      transform: scale(0.95);
    }

    &:nth-child(2) {
      background-color: #6203f1;
    }

    &:nth-child(2):hover {
      background-color: #4c02c1;
    }

    &:nth-child(3) {
      background-color: #02363e;
    }

    &:nth-child(3):hover {
      background-color: #02282c;
    }
  }
`;

export const GifImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const dotAnimation = keyframes`
    0% {
        content: ".";
    }
    33% {
        content: "..";
    }
    66% {
        content: "...";
    }
    100% {
        content: ".";
    }
`;

export const StatusText = styled.div<{ $statusText: string }>`
  font-size: 18px;
  font-weight: bold;
  color: #dfd8d8;
  ${(props): string => `--status-text: "${props.$statusText}";`}
  &::after {
    content: var(--status-text);
    animation: ${dotAnimation} 1.5s infinite;
  }
`;
