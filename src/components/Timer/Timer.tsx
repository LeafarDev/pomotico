import { ReactElement } from "react";
import { TimerProps } from "../../types.ts";
/*
    servirá para exibir o tempo passando,
    enquanto não alcançar timeleft continua rodando
 */
export function Timer({ title, disabled }: TimerProps): ReactElement {
  return <button disabled={disabled}>{title}</button>;
}
