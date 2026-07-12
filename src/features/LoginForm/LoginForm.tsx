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
import { Separator } from "@/components/ui/separator";

import { GoogleIcon } from "@/shared/ui/GoogleIcon";
import { Mail } from "lucide-react";

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
        <div className="flex flex-col gap-2">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormField
                        control={control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Код</FormLabel>
                                <FormControl>
                                    <Input
                                        className={`primary-input caret-black
                                        ${errors.code ? "invalid" : ""}`}
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
                                        placeholder="****-****-*****"
                                    />
                                </FormControl>
                                <FormMessage>{errors.code?.message && ""}</FormMessage>
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

            <Separator className="bg-ring my-2" />

            <Button
                variant="secondary"
                className="bg-white w-full cursor-pointer hover:text-primary"
            >
                <GoogleIcon />
                <span>Продолжить с Google</span>
            </Button>

            <Button
                variant="secondary"
                className="bg-white w-full cursor-pointer hover:text-primary"
            >
                <Mail className="size-5" />
                <span>Продолжить с Email</span>
            </Button>
        </div>
    );
}
