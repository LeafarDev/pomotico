import { useAtom } from "jotai/index";
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
import { isConfigModalOpen, isGraphModalOpen } from "../../atoms/Timer.tsx";

export const Header = (): ReactElement => {
  const [, setIsModalOpen] = useAtom(isConfigModalOpen);
  const [, setIsGraphModalOpen] = useAtom(isGraphModalOpen);
  const openConfigModal = (): void => {
    setIsModalOpen(true);
  };

  const openGraphModel = (): void => {
    setIsGraphModalOpen(true);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={ClockIcon} alt="App Logo" />
        <span>Pomotico</span>
      </LogoContainer>
      <NavButtons>
        <button onClick={openGraphModel}>
          <MdAutoGraph />
          <span>Atividades</span>
        </button>
        <button onClick={openConfigModal}>
          <FaCog />
          <span>Configurações</span>
        </button>
      </NavButtons>
    </HeaderContainer>
  );
};
