import { z } from "zod";

export const activationFormSchema = z.object({
    code: z.string("Введите код").length(15, "Введите верный код"),
});

export type ActivationFormType = z.infer<typeof activationFormSchema>;