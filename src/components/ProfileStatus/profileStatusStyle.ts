import { styled } from "styled-components";

export const StatusDiv = styled.div`
  display: block;
  margin: 40px;
  min-height: 200px;
  min-width: 500px;
  border: 1px solid rgba(149, 8, 207, 0.1);
  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;

  @media (max-width: 768px) {
    margin: 20px;
    min-width: 400px;
  }

  @media (max-width: 480px) {
    margin: 10px;
    min-width: 100%;
  }
`;

export const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(28, 27, 34);
  padding: 30px;
  min-height: inherit;
  min-width: inherit;

  span {
    margin-top: 8px;
    text-align: left;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    span {
      text-align: center;
    }
  }
`;
