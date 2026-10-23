import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { activationFormSchema, type ActivationFormType } from "./zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type Props = {
    onSubmit: SubmitHandler<ActivationFormType>;
};

export function ActivationForm({ onSubmit }: Props) {
    const navigate = useNavigate();

    const [isPassword, setIsPassword] = useState(true);
    const [isConfirmPassword, setIsConfirmPassword] = useState(true);

    const form = useForm<ActivationFormType>({
        resolver: zodResolver(activationFormSchema),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = form;

    return (
        <div className="grid gap-2">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-3.5">
                    <FormField
                        control={control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Код</FormLabel>
                                <FormControl>
                                    <Input
                                        className={`primary-input caret-black ${errors.code ? "invalid" : ""}`}
                                        {...field}
                                        onChange={(e) => {
                                            const formatedCode = e.target.value
                                                .replace(/[^A-Za-z0-9]/g, "")
                                                .toUpperCase()
                                                .slice(0, 13)
                                                .replace(
                                                    /^(.{0,4})(.{0,4})(.{0,5}).*$/,
                                                    (_, p1, p2, p3) =>
                                                        [p1, p2, p3].filter(Boolean).join("-"),
                                                );

                                            field.onChange(formatedCode);
                                        }}
                                        placeholder="Введите код, выданный учителем"
                                    />
                                </FormControl>
                                {errors.confirmPassword?.message ? (
                                    <FormMessage />
                                ) : (
                                    <FormDescription className="text-primary">
                                        Этот код нужен, чтобы найти ваш класс.
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className={`primary-input ${errors.email ? "invalid" : ""}`}
                                        placeholder="Введите email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <div className="flex gap-2 relative">
                                    <FormControl>
                                        <Input
                                            className={`primary-input ${errors.password ? "invalid" : ""}`}
                                            placeholder="Создайте надежный пароль"
                                            type={isPassword ? "password" : "text"}
                                            {...field}
                                        />
                                    </FormControl>

                                    <Button
                                        onClick={() => setIsPassword((prev) => !prev)}
                                        variant="ghost"
                                        type="button"
                                        className="hover:bg-transparent absolute bottom-0 right-0"
                                    >
                                        {isPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Потверждение пароля</FormLabel>

                                <div className="flex gap-2 relative">
                                    <FormControl>
                                        <Input
                                            className={`primary-input ${errors.confirmPassword ? "invalid" : ""}`}
                                            placeholder="Подтвердите пароль"
                                            type={isConfirmPassword ? "password" : "text"}
                                            {...field}
                                        />
                                    </FormControl>

                                    <Button
                                        onClick={() => setIsConfirmPassword((prev) => !prev)}
                                        variant="ghost"
                                        type="button"
                                        className="hover:bg-transparent absolute bottom-0 right-0"
                                    >
                                        {isConfirmPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>

                                {errors.confirmPassword?.message ? (
                                    <FormMessage />
                                ) : (
                                    <FormDescription className="text-primary">
                                        После активации вы сможете заходить в приложение по email и
                                        паролю, не вводя код.
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full text-white">
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>

            <div className="flex items-center justify-center gap-1 h-8">
                <span>Уже есть аккаунт?</span>

                <Button
                    type="button"
                    variant="link"
                    className="p-0"
                    onClick={() => {
                        navigate("/auth/login");
                    }}
                >
                    <span>Войти!</span>
                </Button>
            </div>
        </div>
    );
}
