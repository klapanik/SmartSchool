import { Outlet, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export function AuthLayout() {
    const location = useLocation();
    const currentUrl = location.pathname;

    return (
        <section className="min-h-screen w-full px-3 py-2 flex flex-col justify-center items-center bg-[url('/auth_background.png')] bg-cover bg-no-repeat bg-center">
            <div className="flex flex-col gap-1 items-center mb-7">
                <GraduationCap
                    strokeWidth={1.5}
                    className="size-14 bg-primary text-white rounded-full p-3"
                />
                <h2 className="page-title text-primary">SmartSchool</h2>
            </div>
            <div className="sm:w-md bg-smoky-white px-6 py-4 flex flex-col rounded-lg gap-5">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold">Добро пожаловать</h3>
                    <span className="text-gray-500 text-center">
                        {currentUrl.includes("login")
                            ? "Введите электронную почту и пароль для входа."
                            : "Введите данные для активации вашего аккаунта."}
                    </span>
                </div>
                <Outlet />
            </div>
        </section>
    );
}
