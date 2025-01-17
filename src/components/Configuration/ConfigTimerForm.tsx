import { ReactElement } from "react";
import Modal from "react-modal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  AuthorizeNotificationLabel,
  ButtonConfigModal,
  FormWrapper,
  InputGroup,
} from "./sprintFormStyle.ts";
import { useSprintFormLogic } from "../../hooks/useConfigTimerForm";

const ConfigTimerForm = (): ReactElement => {
  const {
    register,
    registerWithMask,
    handleTextNotificationChange,
    handleSoundNotificationChange,
    handleSubmit,
    errors,
    closeModal,
    onSubmit,
    isModalOpen,
    textNotificationsAllowed,
  } = useSprintFormLogic();

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
            <AuthorizeNotificationLabel>
              <input
                type="checkbox"
                {...register("allowTextNotifications")}
                checked={textNotificationsAllowed}
                onChange={handleTextNotificationChange}
              />
              Autorizar notificações
            </AuthorizeNotificationLabel>
          </InputGroup>
          <InputGroup>
            <AuthorizeNotificationLabel>
              <input
                type="checkbox"
                {...register("allowSoundNotifications")}
                onChange={handleSoundNotificationChange}
              />
              Autorizar avisos sonoros
            </AuthorizeNotificationLabel>
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

export default ConfigTimerForm;
