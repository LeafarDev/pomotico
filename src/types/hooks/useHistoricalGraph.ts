import { ProfileType } from "../components/ConfigTimerFormTypes.ts";

interface HistoricalGraphData {
  x: string;
  y: number;
}

interface ProfileData {
  id: string;
  name: string;
  data: HistoricalGraphData[];
}

interface ChartDimensions {
  width: number;
  height: number;
}

export interface UseHistoricalGraphReturn {
  isModalOpen: boolean;
  closeModal: () => void;
  activeTab: "months" | "days";
  setActiveTab: React.Dispatch<React.SetStateAction<"months" | "days">>;
  adjustedMonthlyData: ProfileData[];
  adjustedDailyData: ProfileData[];
  profileColorScale: (value: number) => string;
  profiles: ProfileType[]; // Replace `any[]` with the actual type of your profiles
  chartDimensions: ChartDimensions;
  isPhoneScreen: boolean;
}
