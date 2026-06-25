import { z } from "zod";

export const PersonalDataFormSchema = z.object({
    phone: z.string("Введите номер телефона").length(13, "Введите номер в формате +375XXXXXXXXX"),
    email: z.string("Введите свой email"),
});

export type PersonalDataFormType = z.infer<typeof PersonalDataFormSchema>;
