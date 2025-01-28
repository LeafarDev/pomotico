import { ScaleLinear } from "@visx/vendor/d3-scale";
import React from "react";
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
  profileColorScale: ScaleLinear<string, string>;
  profiles: ProfileType[];
  chartDimensions: ChartDimensions;
  isPhoneScreen: boolean;
}
