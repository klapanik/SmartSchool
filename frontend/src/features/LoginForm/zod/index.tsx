import { z } from "zod";

export const loginFormSchema = z.object({
    code: z.string("Введите код").length(15, "Введите верный код"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;