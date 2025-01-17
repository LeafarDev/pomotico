import { z } from "zod";

export const sprintFormSchema = z.object({
  sprintTime: z.object({
    minutes: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
        message: "Informe um valor entre 5 e 59.",
      }),
    seconds: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
        message: "Informe um valor entre 0 e 59.",
      }),
  }),
  restTime: z.object({
    minutes: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
        message: "Informe um valor entre 5 e 59.",
      }),
    seconds: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
        message: "Informe um valor entre 0 e 59.",
      }),
  }),
  longBreakTime: z
    .object({
      hours: z
        .string()
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value >= 0 && value <= 24, {
          message: "Informe um valor entre 0 e 24.",
        }),
      minutes: z
        .string()
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
          message: "Informe um valor entre 0 e 59.",
        }),
      seconds: z
        .string()
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
          message: "Informe um valor entre 0 e 59.",
        }),
    })
    .refine(
      (data) => !(data.hours === 0 && (data.minutes < 1 || data.minutes > 59)),
      {
        message:
          "Se o valor de horas for 0, os minutos devem estar entre 1 e 59.",
        path: ["minutes"],
      },
    ),
  qtySprintForLongBreak: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value >= 1, {
      message: "Informe uma quantia.",
    }),
  allowSoundNotifications: z.boolean(),
  allowTextNotifications: z.boolean(),
});
