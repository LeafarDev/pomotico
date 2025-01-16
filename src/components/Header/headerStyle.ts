import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  color: white;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 2rem;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

export const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  fill: aqua;
`;

export const NavButtons = styled.nav`
  display: flex;
  gap: 1.5rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      font-size: 1.5rem;
    }

    span {
      display: inline;
    }

    @media (max-width: 768px) {
      span {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: flex-end;
    width: auto;
  }
`;
