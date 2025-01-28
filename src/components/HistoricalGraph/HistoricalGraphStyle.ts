import styled from "styled-components";

export const HistoricalGraphDiv = styled.div`
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 900px;
    margin: 0 auto;
  }

  .modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const TabsContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#3236b8" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
