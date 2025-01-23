import {
  UseCloseModalProps,
  UseCloseModalIt,
} from "../../types/hooks/useProfileForm/CloseModalIt.ts";

export const UseCloseModal = ({
  states,
  resetForm,
}: UseCloseModalProps): UseCloseModalIt => {
  const closeModal = (): void => {
    const { profiles, setIsModalOpen } = states;
    setIsModalOpen(false);
    const activeProfile = profiles.find((profile) => profile.active);
    resetForm(activeProfile?.id);
  };

  return {
    closeModal,
  };
};
