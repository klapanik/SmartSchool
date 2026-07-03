import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type Props = {
    onSubmit: SubmitHandler<EmailFormType>;
};

export function EmailForm({ onSubmit }: Props) {
    const [isPassword, setIsPassword] = useState(true);

    const form = useForm<EmailFormType>({
        resolver: zodResolver(emailFormSchema),
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
                            <FormMessage>{errors.email?.message}</FormMessage>
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
                                    className="hover:bg-white cursor-pointer my-auto"
                                >
                                    {isPassword ? <Eye /> : <EyeOff />}
                                </Button>
                            </div>
                            <FormMessage>{errors.password?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white w-full cursor-pointer"
                >
                    Привязать email
                </Button>
            </form>
        </Form>
    );
}
