import { ProfileType } from "../../components/ConfigTimerFormTypes.ts";

export interface UseTimerManagementIt {
  swapProfile: (profile: ProfileType, formattedData: ProfileType) => void;
}
