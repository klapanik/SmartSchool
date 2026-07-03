import { EmailForm } from "@/features/EmailForm/EmailForm";
import { BookOpen } from "lucide-react";

export function AuthTabs() {
    return (
        <div className="sm:w-md bg-smoky-white p-6 flex flex-col rounded-lg gap-5">
            <div className="flex flex-col items-center">
                <div className="flex gap-2 items-center justify-center">
                    <BookOpen />
                    <p className="text-2xl font-bold">Добро пожаловать</p>
                </div>
                <span className="text-gray-500">Войдите или создайте новый аккаунт</span>
            </div>
            <div className="w-full ">
                <EmailForm onSubmit={() => {}} />
            </div>
        </div>
    );
}
