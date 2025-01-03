import { ReactElement } from "react";
import { FaCog } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";
import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  NavButtons,
} from "./headerStyle";
import ClockIcon from "../../assets/pomotico-logo-white.svg";

export const Header = (): ReactElement => {
  const handleConfigClick = () => {
    console.log("Configurações clicked!");
  };

  const handleActivitiesClick = () => {
    console.log("Atividades clicked!");
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={ClockIcon} alt="App Logo" />
        <span>Pomotico</span>
      </LogoContainer>
      <NavButtons>
        <button onClick={handleActivitiesClick}>
          <MdAutoGraph />
          <span>Atividades</span>
        </button>
        <button onClick={handleConfigClick}>
          <FaCog />
          <span>Configurações</span>
        </button>
      </NavButtons>
    </HeaderContainer>
  );
};
