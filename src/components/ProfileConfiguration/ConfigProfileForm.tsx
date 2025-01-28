import { ReactElement } from "react";
import Modal from "react-modal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  CheckBoxLabel,
  ButtonConfigModal,
  CreateProfileButton,
  FormWrapper,
  InputGroup,
  TestAmbienceSoundButton,
  DeleteProfileButton,
} from "./profileFormStyle.ts";
import { useProfileForm } from "../../hooks/useProfileForm/useProfileForm.ts";

const ConfigProfileForm = (): ReactElement => {
  const {
    states,
    register,
    closeModal,
    handleSelectProfileOnChange,
    handleCreateNewProfile,
    handleDeleteProfile,
    registerWithMask,
    errors,
    handleTextNotificationChange,
    handleSubmit,
    handleSoundNotificationChange,
    handleButtonTestSound,
    handleAllowAmbienceSoundChange,
    handleSoundChange,
    onSubmit,
  } = useProfileForm();

  const {
    isModalOpen,
    currentEditingProfile,
    formMode,
    profiles,
    textNotificationsAllowed,
    ambianceSoundOptions,
    ambienceSoundChecked,
    selectedSound,
    isTestAmbienceButtonDisabled,
    testAmbienceButtonText,
  } = states;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      contentLabel="Sprint Settings Modal"
      ariaHideApp={true}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Configurações</h2>
      <FormWrapper>
        <form id="sprint-form" onSubmit={(e) => e.preventDefault()}>
          {formMode === "updating" && currentEditingProfile ? (
            <InputGroup>
              <label>Perfil</label>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <select
                  value={currentEditingProfile.id}
                  onChange={handleSelectProfileOnChange}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    backgroundColor: "#444",
                    color: "#fff",
                  }}
                >
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.title}{" "}
                      {currentEditingProfile.id === profile.id
                        ? "(current)"
                        : ""}
                    </option>
                  ))}
                </select>
                <CreateProfileButton onClick={handleCreateNewProfile}>
                  Criar Novo Perfil
                </CreateProfileButton>
                {profiles.length > 1 && !currentEditingProfile.active ? (
                  <DeleteProfileButton onClick={handleDeleteProfile}>
                    Deletar Perfil
                  </DeleteProfileButton>
                ) : (
                  <></>
                )}
              </div>
            </InputGroup>
          ) : (
            <></>
          )}
          <InputGroup>
            <label htmlFor="title">Título do Perfil</label>
            <input
              {...register("title", {
                required: "O título é obrigatório.",
              })}
              id="title"
              type="text"
              placeholder="Insira o título do perfil"
              className={errors.title ? "error" : ""}
              data-tooltip-id="config-tooltip"
              data-tooltip-content={errors.title?.message}
            />
          </InputGroup>

          <InputGroup>
            <CheckBoxLabel>
              <input
                disabled={
                  (profiles.length === 1 && formMode === "updating") ||
                  (formMode === "updating" && currentEditingProfile?.active)
                }
                {...register("active")}
                id="active"
                type="checkbox"
              />
              Ativar perfil
            </CheckBoxLabel>
          </InputGroup>
          <InputGroup>
            <label>Tempo por sprint (Min:Sec)</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                {...registerWithMask("sprintTime.minutes", ["99", "99"], {
                  required: true,
                })}
                type="text"
                placeholder="Minutos"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.sprintTime?.minutes?.message}
                className={errors.sprintTime?.minutes ? "error" : ""}
              />
              <input
                {...registerWithMask("sprintTime.seconds", ["99"], {
                  required: true,
                })}
                type="text"
                placeholder="Segundos"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.sprintTime?.seconds?.message}
                className={errors.sprintTime?.seconds ? "error" : ""}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label>Tempo de descanso (Min:Seg)</label>
            <div>
              <input
                {...registerWithMask("restTime.minutes", ["99"], {
                  required: true,
                })}
                type="text"
                placeholder="Minutos"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.restTime?.minutes?.message}
                className={errors.restTime?.minutes ? "error" : ""}
              />
              <input
                {...registerWithMask("restTime.seconds", ["99", "9"], {
                  required: true,
                })}
                type="text"
                placeholder="Segundos"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.restTime?.seconds?.message}
                className={errors.restTime?.seconds ? "error" : ""}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label>Tempo de pausa longa (Hor:Min:Seg)</label>
            <div>
              <input
                {...registerWithMask("longBreakTime.hours", ["99"], {
                  required: true,
                })}
                type="text"
                placeholder="Horas"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.longBreakTime?.hours?.message}
                className={errors.longBreakTime?.hours ? "error" : ""}
              />
              <input
                {...registerWithMask("longBreakTime.minutes", ["99"], {
                  required: true,
                })}
                type="text"
                placeholder="Minutos"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.longBreakTime?.minutes?.message}
                className={errors.longBreakTime?.minutes ? "error" : ""}
              />
              <input
                {...registerWithMask("longBreakTime.seconds", ["99", "9"], {
                  required: true,
                })}
                type="text"
                placeholder="Segundos"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.longBreakTime?.seconds?.message}
                className={errors.longBreakTime?.seconds ? "error" : ""}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label>Quande de sprint antes da pausa longa</label>
            <input
              {...registerWithMask("qtySprintForLongBreak", ["99"], {
                required: true,
              })}
              type="text"
              placeholder="Quantia"
              data-tooltip-id="config-tooltip"
              data-tooltip-content={errors.qtySprintForLongBreak?.message}
              className={errors.qtySprintForLongBreak ? "error" : ""}
            />
          </InputGroup>

          <InputGroup>
            <CheckBoxLabel>
              <input
                type="checkbox"
                {...register("allowTextNotifications")}
                checked={textNotificationsAllowed}
                onChange={handleTextNotificationChange}
              />
              Autorizar notificações
            </CheckBoxLabel>
          </InputGroup>
          <InputGroup>
            <CheckBoxLabel>
              <input
                type="checkbox"
                {...register("allowSoundNotifications")}
                onChange={handleSoundNotificationChange}
              />
              Autorizar avisos sonoros
            </CheckBoxLabel>
          </InputGroup>
          <InputGroup>
            <CheckBoxLabel>
              <input
                type="checkbox"
                {...register("allowAmbienceSound")}
                onChange={handleAllowAmbienceSoundChange}
              />
              Permitir som ambiente
            </CheckBoxLabel>
          </InputGroup>

          <InputGroup>
            <label>Som ambiente</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
                {...register("ambienceSoundTrack")}
                onChange={handleSoundChange}
                disabled={!ambienceSoundChecked}
                value={selectedSound}
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  backgroundColor: ambienceSoundChecked ? "#444" : "#888",
                  color: "#fff",
                }}
              >
                {ambianceSoundOptions.map((sound) => (
                  <option key={sound.value} value={sound.value}>
                    {sound.label}
                  </option>
                ))}
              </select>
              <TestAmbienceSoundButton
                onClick={handleButtonTestSound}
                $inactive={
                  !(!ambienceSoundChecked || isTestAmbienceButtonDisabled)
                }
              >
                {testAmbienceButtonText}
              </TestAmbienceSoundButton>
            </div>
          </InputGroup>
          <InputGroup>
            <p style={{ fontSize: "1rem", color: "#ccc" }}>
              Autor:{" "}
              <a
                href={
                  ambianceSoundOptions.find(
                    (item) => item.value === selectedSound,
                  )?.url
                }
                target={"_blank"}
              >
                {
                  ambianceSoundOptions.find(
                    (item) => item.value === selectedSound,
                  )?.author
                }
              </a>
            </p>
          </InputGroup>
          <ReactTooltip id="config-tooltip" variant="error" place="top" />
        </form>
      </FormWrapper>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <ButtonConfigModal
          type="button"
          onClick={() => closeModal()}
          className="cancel"
        >
          Cancelar
        </ButtonConfigModal>
        <ButtonConfigModal
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="save"
        >
          Salvar
        </ButtonConfigModal>
      </div>
    </Modal>
  );
};

export default ConfigProfileForm;
