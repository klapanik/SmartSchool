import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { apiFetch } from "@/shared/api/fetch";

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
import { setAccessToken } from "@/features/auth/model/token-storage";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

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

            const result = await apiFetch("/user/activate/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

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

            const result = await apiFetch<{ access: string }>("/user/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (result.access) setAccessToken(result.access);

            console.log(result);
        } catch (error) {
            console.log(error);
            // soon we will add loading and alerts for errors
        } finally {
            console.log("This is the end");
        }
    };

    // useEffect(() => {
    //     const handleGetGrades = async (
    //         subject: number,
    //         quarter: number,
    //         dateFrom: string,
    //         dateTo: string,
    //     ) => {
    //         if (!token) console.error("Ошибка авторизации!");

    //         try {
    //             const result = await apiFetch(
    //                 `/grades/?subject=${subject}&quarter=${quarter}&date_from=${dateFrom}&date_to=${dateTo}`,
    //                 {
    //                     method: "GET",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 },
    //             );

    //             console.log("Отметки получены:", result);
    //         } catch (error) {
    //             console.log("Ошибка при получении отметок:", error);
    //         }
    //     };

    //     handleGetGrades(1, 1, "2025-10-08", "2027-10-08");
    // }, [token]);

    // useEffect(() => {
    //     const handleGetAverageGrades = async (quarter: number, groupBy: string) => {
    //         if (!token) console.error("Ошибка авторизации!");

    //         try {
    //             const result = await apiFetch(`/grades/?quarter=${quarter}&group_by=${groupBy}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             console.log("Средние отметки получены:", result);
    //         } catch (error) {
    //             console.log("Ошибка при получении средних отметок:", error);
    //         }
    //     };

    //     handleGetAverageGrades(1, "");
    // }, [token]);

    // useEffect(() => {
    //     const handleGetQuarterGrades = async (quarter: number) => {
    //         if (!token) console.error("Ошибка авторизации!");

    //         try {
    //             const result = await apiFetch(`/quarters/grades/?quarter=${quarter}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             console.log("Четвертные оценки получены:", result);
    //         } catch (error) {
    //             console.log("Ошибка при получении четвертных отметок:", error);
    //         }
    //     };
    //     handleGetQuarterGrades(1);
    // }, [token]);

    // useEffect(() => {
    //     const handleGetSubjects = async (countOnly: boolean) => {
    //         if (!token) console.error("Ошибка авторизации!");

    //         try {
    //             const result = await apiFetch(`/subjects/?count_only=${countOnly}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             console.log("Список предметов получен:", result);
    //         } catch (error) {
    //             console.log("Ошибка при получении списка предметов:", error);
    //         }
    //     };
    //     handleGetSubjects(true);
    //     handleGetSubjects(false);
    // }, [token]);

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
