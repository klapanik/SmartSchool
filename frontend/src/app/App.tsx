import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RootLayout } from "@/layouts/RootLayout";
import { AuthLayout } from "@/layouts/AuthLayout";

import { MainPage } from "@/pages/MainPage/MainPage";
import { QuartersPage } from "@/pages/QuartersPage/QuartersPage";
import { SchedulePage } from "@/pages/SchedulePage/SchedulePage";
import { AnalyticsPage } from "@/pages/AnalyticsPage/AnalyticsPage";
import { GradesPage } from "@/pages/GradesPage/GradesPage";

import { ActivationForm } from "@/features/ActivationForm/ActivationForm";
import type { ActivationFormType } from "@/features/ActivationForm/zod";
import { LoginForm } from "@/features/LoginForm/LoginForm";
import type { LoginFormType } from "@/features/LoginForm/zod";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const BASE_URL = import.meta.env.VITE_API_URL;
const queryClient = new QueryClient();

export function App() {
    const handleUserActivation = async (data: ActivationFormType) => {
        if (!data) return;

        try {
            const requestBody = {
                code: data.code,
                email: data.email,
                password: data.password,
            };

            const response = await fetch(`${BASE_URL}/user/activate/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const result = await response.json();

            console.log(result);
        } catch (error) {
            console.log(error);
            // soon we will add loading and alerts for errors
        } finally {
            console.log("This is the end");
        }
    };

    const handleLogin = async (data: LoginFormType) => {
        if (!data) return;

        try {
            const requestBody = {
                email: data.email,
                password: data.password,
            };

            const response = await fetch(`${BASE_URL}/user/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const result = await response.json();

            console.log(result);
        } catch (error) {
            console.log(error);
            // soon we will add loading and alerts for errors
        } finally {
            console.log("This is the end");
        }
    };

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg2NTIxMTA3LCJpYXQiOjE3ODY1MTkzMDcsImp0aSI6IjI0MDU4MmNjZjgwZjQwODBiMDEyOTdjY2EyMGU2ZGJmIiwidXNlcl9pZCI6IjUifQ.yskkGUrEQa4H1DkTi0iIjkjpiAKHWQPuu3uEjT9VGMc";
    const handleGetSchedule = async () => {
        try {
            const response = await fetch(`${BASE_URL}/schedule/`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const result = await response.json();
            console.log("Расписание получено:", result);
        } catch (error) {
            console.log("Ошибка при получении расписания:", error);
        }
    };

    handleGetSchedule();

    const handleGetGrades = async (
        subject: number,
        quarter: number,
        dateFrom: string,
        dateTo: string,
    ) => {
        try {
            const response = await fetch(
                `${BASE_URL}/grades/?subject=${subject}&quarter=${quarter}&date_from=${dateFrom}&date_to=${dateTo}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const result = await response.json();
            console.log("Отметки получены:", result);
        } catch (error) {
            console.log("Ошибка при получении отметок:", error);
        }
    };

    handleGetGrades(1, 1, "2025-10-08", "2027-10-08");

    const handleGetAverageGrades = async (quarter: number, groupBy: string) => {
        try {
            const response = await fetch(
                `${BASE_URL}/grades/?quarter=${quarter}&group_by=${groupBy}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const result = await response.json();
            console.log("Средние отметки получены:", result);
        } catch (error) {
            console.log("Ошибка при получении средних отметок:", error);
        }
    };

    handleGetAverageGrades(1, "");

    const handleGetQuarters = async () => {
        try {
            const response = await fetch(`${BASE_URL}/quarters/`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const result = await response.json();
            console.log("Список четвертей получен:", result);
        } catch (error) {
            console.log("Ошибка при получении списка четвертей:", error);
        }
    };

    handleGetQuarters();

    const handleGetQuarterGrades = async (quarter: number) => {
        try {
            const response = await fetch(`${BASE_URL}/quarters/grades?quarter=${quarter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const result = await response.json();
            console.log("Четвертные оценки получены:", result);
        } catch (error) {
            console.log("Ошибка при получении четвертных отметок:", error);
        }
    };

    handleGetQuarterGrades(1);

    const routes = createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/grades" element={<GradesPage />} />
                <Route path="/quarters" element={<QuartersPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
                <Route
                    path="/auth/activate"
                    element={<ActivationForm onSubmit={handleUserActivation} />}
                />
                <Route path="/auth/login" element={<LoginForm onSubmit={handleLogin} />} />
            </Route>
        </>,
    );

    const router = createBrowserRouter(routes);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <SidebarProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                    <ReactQueryDevtools initialIsOpen={false} />
                </SidebarProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}
