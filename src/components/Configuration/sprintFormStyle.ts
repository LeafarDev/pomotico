import styled from "styled-components";
export const InputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #fff;
  }

  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #555;
    background-color: #444;
    color: #fff;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ButtonConfigModal = styled.button`
  padding: 8px 16px; /* Smaller padding for more compact buttons */
  border-radius: 6px; /* Slightly smaller border radius */
  font-size: 14px; /* Smaller font size */
  font-weight: 600; /* Bold text for visibility */
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  margin: 5px 0;

  /* Cancel button */
  &.cancel {
    background-color: #8f9097; /* Dark gray for cancel */
    color: #fff;

    &:hover {
      background-color: #6c6e73; /* Slightly darker gray for hover */
    }
  }

  /* Save button */
  &.save {
    background-color: #1c8591; /* Dark teal for save */
    color: #fff;

    &:hover {
      background-color: #148c96; /* Slightly lighter teal for hover */
    }
  }

  /* Common button styles */
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 188, 212, 0.6);
  }
`;
