import { z } from "zod";

export const sprintFormSchema = z.object({
  sprintTime: z.object({
    minutes: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value >= 5 && value <= 59, {
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
      .refine((value) => !isNaN(value) && value >= 5 && value <= 59, {
        message: "Informe um valor entre 5 e 59.",
      }),
    seconds: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value >= 0 && value <= 59, {
        message: "Informe um valor entre 0 e 59.",
      }),
  }),
  sprintGoal: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value >= 1, {
      message: "Informe uma quantia.",
    }),
});

export type SprintFormValues = {
  sprintTime: {
    minutes: string;
    seconds: string;
  };
  restTime: { minutes: string; seconds: string };
  sprintGoal: string;
};
