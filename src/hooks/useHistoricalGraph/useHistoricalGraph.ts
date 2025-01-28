import { scaleLinear } from "@visx/scale";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { isGraphModalOpen, profileTypes } from "../../atoms/Timer.tsx";
import { UseHistoricalGraphReturn } from "../../types/hooks/useHistoricalGraph.ts";

export const useHistoricalGraph = (): UseHistoricalGraphReturn => {
  const [isModalOpen, setIsModalOpen] = useAtom(isGraphModalOpen);
  const [profiles] = useAtom(profileTypes);
  const [activeTab, setActiveTab] = useState<"months" | "days">("days");
  const [chartDimensions, setChartDimensions] = useState({
    width: 800,
    height: 400,
  });
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString("default", { month: "short" });
  }).reverse();

  const last12Days = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleString("default", { day: "numeric", month: "short" });
  }).reverse();

  const monthlyData = profiles.map((profile) => {
    const counts = last12Months.map((month, index) => {
      const monthData = profile.history.filter((item) => {
        if (item.endTime) {
          const itemDate = new Date(item.endTime);
          return (
            item.mode === 0 &&
            !item.skipped &&
            itemDate.getMonth() === new Date().getMonth() - (11 - index)
          );
        }
        return false;
      });
      return { x: month, y: monthData.length };
    });
    return { id: profile.id, name: profile.title, data: counts };
  });

  const dailyData = profiles.map((profile) => {
    const counts = last12Days.map((day, index) => {
      const dayData = profile.history.filter((item) => {
        if (item.endTime) {
          const itemDate = new Date(item.endTime);
          return (
            item.mode === 0 &&
            !item.skipped &&
            itemDate.toDateString() ===
              new Date(
                new Date().setDate(new Date().getDate() - (11 - index)),
              ).toDateString()
          );
        }
        return false;
      });
      return { x: day, y: dayData.length };
    });
    return { id: profile.id, name: profile.title, data: counts };
  });

  const profileColorScale = scaleLinear<string>({
    domain: profiles.map((_, i) => i),
    range: [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#F1C40F",
      "#8E44AD",
      "#1ABC9C",
      "#E74C3C",
      "#3498DB",
      "#2ECC71",
      "#9B59B6",
      "#F39C12",
    ],
  });

  useEffect(() => {
    const updateDimensions = (): void => {
      const isPhone = window.innerWidth <= 768;
      setIsPhoneScreen(isPhone);
      setChartDimensions({
        width: isPhone ? window.innerWidth * 0.9 : 800,
        height: 400,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return (): void => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const adjustedMonthlyData = monthlyData.map((profile) => ({
    ...profile,
    data: isPhoneScreen ? profile.data.slice(-6) : profile.data,
  }));

  const adjustedDailyData = dailyData.map((profile) => ({
    ...profile,
    data: isPhoneScreen ? profile.data.slice(-5) : profile.data,
  }));

  return {
    isModalOpen,
    closeModal,
    activeTab,
    setActiveTab,
    adjustedMonthlyData,
    adjustedDailyData,
    profileColorScale,
    profiles,
    chartDimensions,
    isPhoneScreen,
  };
};
