import { UseFormStateIt } from "./UseFormStateIt.ts";

export interface UseCloseModalProps {
  states: UseFormStateIt;
  resetForm: (id: string | undefined) => void;
}

export interface UseCloseModalIt {
  closeModal: () => void;
}
