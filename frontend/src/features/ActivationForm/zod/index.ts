import { z } from "zod";

export const activationFormSchema = z
    .object({
        code: z.string("Введите код").length(15, "Введите верный код"),
        email: z.email("Введите корректный email"),
        password: z
            .string("Введите пароль")
            .min(8, "Минимум 8 символов")
            .max(25, "Максимум 25 символов"),
        confirmPassword: z.string("Подтвердите пароль"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    });

export type ActivationFormType = z.infer<typeof activationFormSchema>;
