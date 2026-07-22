import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { emailFormSchema, type EmailFormType } from "./zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, KeyRound } from "lucide-react";

type Props = {
    onSubmit: SubmitHandler<EmailFormType>;
    type?: "registration" | "login";
};

export function EmailForm({ onSubmit, type }: Props) {
    const [isPassword, setIsPassword] = useState(true);
    const [isConfirmPassword, setIsConfirmPassword] = useState(true);

    const navigate = useNavigate();

    const form = useForm<EmailFormType>({
        resolver: zodResolver(emailFormSchema),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = form;

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`flex flex-col gap-3 ${type === "login" ? "mb-4" : ""}`}
                >
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className={`primary-input ${errors.email ? "invalid" : ""}`}
                                        placeholder="your@email.com"
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
                                <div className="flex gap-2">
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
                                        className="hover:bg-white my-auto"
                                    >
                                        {isPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {type === "login" ? (
                        ""
                    ) : (
                        <FormField
                            control={control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Потверждение пароля</FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input
                                                className={`primary-input ${errors.confirmPassword ? "invalid" : ""}`}
                                                placeholder="Потвердите свой пароль"
                                                type={isConfirmPassword ? "password" : "text"}
                                                {...field}
                                            />
                                        </FormControl>

                                        <Button
                                            onClick={() => setIsConfirmPassword((prev) => !prev)}
                                            variant="ghost"
                                            type="button"
                                            className="hover:bg-white my-auto"
                                        >
                                            {isConfirmPassword ? <Eye /> : <EyeOff />}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <Button type="submit" disabled={isSubmitting} className="w-full text-white">
                        {type === "registration" ? "Зарегистрироваться" : "Войти"}
                    </Button>
                </form>
            </Form>

            {type === "login" ? (
                <Tooltip>
                    <TooltipTrigger className="w-full">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white hover:bg-muted"
                            onClick={() => {
                                navigate("/auth/activate");
                            }}
                        >
                            <KeyRound />
                            <span>Активировать аккаунт</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="border border-primary">
                        <p>
                            Вы можете активировать свой аккаунт с помощью кода <br /> активации,
                            который вы получили от своего классного руководителя
                        </p>
                    </TooltipContent>
                </Tooltip>
            ) : (
                ""
            )}
        </div>
    );
}
