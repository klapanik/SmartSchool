import { LoginForm } from "@/features/LoginForm/LoginForm";
import { BookOpen, GraduationCap } from "lucide-react";

export function AuthPage() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center bg-[url('/auth_background.png')] bg-cover bg-no-repeat bg-center">
            <div className="flex flex-col gap-5 items-center mb-7.5">
                <GraduationCap
                    strokeWidth={1.5}
                    className="size-14 bg-primary text-white rounded-full p-3"
                />
                <h2 className="page-title text-primary">SmartSchool</h2>
            </div>
            <div className="sm:w-md bg-smoky-white p-6 flex flex-col rounded-lg gap-5">
                <div className="flex flex-col items-center">
                    <div className="flex gap-2 items-center justify-center">
                        <BookOpen />
                        <p className="text-2xl font-bold">Добро пожаловать</p>
                    </div>
                    <span className="text-gray-500">Войдите или создайте новый аккаунт</span>
                </div>
                <div className="w-full">
                    <LoginForm onSubmit={() => {}} />
                </div>
            </div>
        </section>
    );
}
