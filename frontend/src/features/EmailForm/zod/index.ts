import { z } from "zod";

export const emailFormSchema = z.object({
    email: z.email("Введите корректный email"),
    password: z
        .string("Введите пароль")
        .min(8, "Минимум 8 символов")
        .max(25, "Максимум 25 символов"),
});

export type EmailFormType = z.infer<typeof emailFormSchema>;
