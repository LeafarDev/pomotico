import styled from "styled-components";

export const TimerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const TimeRemaining = styled.span`
  font-size: clamp(8em, 20vw, 17em);
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
    background-color: #4caf50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: #45a049;
    }

    &:active {
      transform: scale(0.95);
    }

    &:nth-child(2) {
      background-color: #f44336;
    }

    &:nth-child(2):hover {
      background-color: #e53935;
    }
  }
`;
