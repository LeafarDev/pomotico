import styled, { keyframes, css } from "styled-components";

// Tipagem da propriedade prefersReducedMotion
interface LogoProps {
  prefersreducedmotion?: string;
}

// Keyframe para o efeito de rotação da logo
const logoSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

// Estilos para o #root
export const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

// Estilos para a logo com tipagem para LogoProps
export const Logo = styled.img<LogoProps>`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  /* Animação de rotação se preferir não reduzir movimento */
  ${({ prefersreducedmotion }) =>
    prefersreducedmotion === "no-preference" &&
    css`
      animation: ${logoSpin} infinite 20s linear;
    `}
`;

// Remover a propriedade do DOM
Logo.defaultProps = {
  prefersreducedmotion: undefined, // Remove a propriedade da árvore do DOM
};

// Estilos para a card
export const Card = styled.div`
  padding: 2em;
`;

// Estilos para o texto de "Read the Docs"
export const ReadTheDocs = styled.p`
  color: #888;
`;

// Estilos para o <h1>
export const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`;

// Estilos para o botão
export const CountButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    background-color: #f9f9f9;
  }
`;

export const StyledLink = styled.a`
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;

  &:hover {
    color: #535bf2;
  }

  @media (prefers-color-scheme: light) {
    &:hover {
      color: #747bff;
    }
  }
`;
