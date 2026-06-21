import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
    onSubmit: SubmitHandler<LoginFormType>;
};

export function LoginForm({ onSubmit }: Props) {
    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = form;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-2">
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
                            <FormMessage>{errors.email?.message && ""}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input
                                    className={`primary-input ${errors.password ? "invalid" : ""}`}
                                    placeholder="Введите пароль"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.password?.message && ""}</FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white w-full cursor-pointer"
                >
                    Войти
                </Button>
            </form>
        </Form>
    );
}
