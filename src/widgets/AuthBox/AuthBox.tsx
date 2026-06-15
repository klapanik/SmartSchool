import { BookOpen } from "lucide-react";

export function AuthBox() {
    return (
        <div className="bg-smoky-white p-6 flex flex-col rounded-lg">
            <div className="flex flex-col items-center">
                <div className="flex gap-2 items-center justify-center">
                    <BookOpen />
                    <p className="text-2xl font-bold">Добро пожаловать</p>
                </div>
                <span className="text-gray-500">Войдите или создайте новый аккаунт</span>
            </div>
        </div>
    );
}
