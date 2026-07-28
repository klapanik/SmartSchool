import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { GoogleIcon } from "@/shared/ui/GoogleIcon";
import { Mail } from "lucide-react";

type Props = {
    onSubmit: SubmitHandler<ActivationFormType>;
};

export function ActivationForm({ onSubmit }: Props) {
    const navigate = useNavigate();

    const form = useForm<ActivationFormType>({
        resolver: zodResolver(activationFormSchema),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = form;

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mb-4">
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
                                <FormMessage>{errors.code?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full text-white">
                        Активировать аккаунт
                    </Button>
                </form>
            </Form>

            <Button type="button" variant="outline" className="w-full mb-2 bg-white hover:bg-muted">
                <GoogleIcon />
                <span>Войти с Google</span>
            </Button>

            <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-muted"
                onClick={() => {
                    navigate("/auth/login");
                }}
            >
                <Mail className="size-5" />
                <span>Войти с Email</span>
            </Button>
        </div>
    );
}
