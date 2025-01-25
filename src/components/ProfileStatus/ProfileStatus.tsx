import { ReactElement } from "react";
import { StatusCard, StatusDiv } from "./profileStatusStyle.ts";
import { useProfileStatus } from "../../hooks/useProfileStatus/profileStatus.ts";

export const ProfileStatus = (): ReactElement => {
  const {
    profile,
    qtyTodayFinished,
    qtyTotalFinished,
    ambienceSound,
    qtyFocusUntilNextLongBrake,
    qtyTotalFinishedSkipped,
    qtyTodayFinishedSkipped,
  } = useProfileStatus();

  return (
    <StatusDiv>
      <StatusCard>
        <span>Perfil: {profile.title}</span>
        <span>Focos do dia: {qtyTodayFinished()}</span>
        <span>Focos no total: {qtyTotalFinished()}</span>
        <span>Total de focos pulados: {qtyTotalFinishedSkipped()}</span>
        <span>Total de focos pulados hoje: {qtyTodayFinishedSkipped()}</span>
        <span>
          Focos até a próxima pausa longa: {qtyFocusUntilNextLongBrake()}/
          {profile.qtySprintForLongBreak}
        </span>
        <span>Som ambiente: {ambienceSound()?.label}</span>
      </StatusCard>
    </StatusDiv>
  );
};
