import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginFormSchema, type LoginFormType } from "./zod";
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
    onSubmit: SubmitHandler<LoginFormType>;
};

export function LoginForm({ onSubmit }: Props) {
    const navigate = useNavigate();
    const [isPassword, setIsPassword] = useState(true);

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = form;

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mb-2">
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
                                            placeholder="Введите пароль"
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
                                {errors.password?.message ? (
                                    <FormMessage />
                                ) : (
                                    <FormDescription className="text-primary text-sm ml-auto">
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="p-0 h-5 font-normal"
                                        >
                                            Забыли пароль?
                                        </Button>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full text-white">
                        Войти
                    </Button>
                </form>
            </Form>

            <div className="flex items-center justify-center gap-1 h-8">
                <span>Ещё нет аккаунта?</span>

                <Button
                    type="button"
                    variant="link"
                    className="p-0"
                    onClick={() => {
                        navigate("/auth/activate");
                    }}
                >
                    <span>Зарегистрироваться!</span>
                </Button>
            </div>
        </div>
    );
}
