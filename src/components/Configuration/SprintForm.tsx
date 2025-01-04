import { ReactElement } from "react";
import Modal from "react-modal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  ButtonConfigModal,
  FormWrapper,
  InputGroup,
} from "./sprintFormStyle.ts";
import { useSprintFormLogic } from "./useSprintForm.ts";

const SprintForm = (): ReactElement => {
  const {
    registerWithMask,
    handleSubmit,
    errors,
    closeModal,
    onSubmit,
    isModalOpen,
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
      <h2>Configure Sprint Settings</h2>
      <FormWrapper>
        <form id="sprint-form" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <label>Tempo por sprint (Min:Sec)</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                {...registerWithMask("sprintTime.minutes", ["99", "99"], {
                  required: true,
                })}
                type="text"
                placeholder="Min"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.sprintTime?.minutes?.message}
                className={errors.sprintTime?.minutes ? "error" : ""}
              />
              <input
                {...registerWithMask("sprintTime.seconds", ["99"], {
                  required: true,
                })}
                type="text"
                placeholder="Sec"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.sprintTime?.seconds?.message}
                className={errors.sprintTime?.seconds ? "error" : ""}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label>Tempo de descanso (Min:Sec)</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                {...registerWithMask("restTime.minutes", ["99"], {
                  required: true,
                })}
                type="text"
                placeholder="Min"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.restTime?.minutes?.message}
                className={errors.restTime?.minutes ? "error" : ""}
              />
              <input
                {...registerWithMask("restTime.seconds", ["99", "9"], {
                  required: true,
                })}
                type="text"
                placeholder="Sec"
                data-tooltip-id="config-tooltip"
                data-tooltip-content={errors.restTime?.seconds?.message}
                className={errors.restTime?.seconds ? "error" : ""}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label>Meta de sprint por sessão</label>
            <input
              {...registerWithMask("sprintGoal", ["99"], {
                required: true,
              })}
              type="text"
              placeholder="Quantity"
              data-tooltip-id="config-tooltip"
              data-tooltip-content={errors.sprintGoal?.message}
              className={errors.sprintGoal ? "error" : ""}
            />
          </InputGroup>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <ButtonConfigModal
              type="button"
              onClick={() => closeModal()}
              className="cancel"
            >
              Cancelar
            </ButtonConfigModal>
            <ButtonConfigModal type="submit" className="save">
              Salvar
            </ButtonConfigModal>
          </div>
        </form>
        <ReactTooltip id="config-tooltip" variant="error" place="top" />
      </FormWrapper>
    </Modal>
  );
};

export default SprintForm;
