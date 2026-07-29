import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.email("Введите корректный email"),
    password: z
        .string("Введите пароль")
        .min(8, "Минимум 8 символов")
        .max(25, "Максимум 25 символов"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
