import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

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

    const handleLogout = async () => {
        const accessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1NjAyOTIwLCJpYXQiOjE3ODU2MDExMjAsImp0aSI6IjAyMzE0MTI0NzM4NDRlMDQ5ZDM2ZDE1NDc0YTZjYmMzIiwidXNlcl9pZCI6IjIifQ.UUIrdwJ6XtDCcUYzl-e0LuuhbdfBA4Vp4oFBkfpjf2Q";
        const navigate = useNavigate();

        try {
            const response = await fetch(`${BASE_URL}/user/logout/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Logout failed");
            }
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

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
                <Route
                    path="/auth/login"
                    element={<LoginForm onSubmit={handleLogin} />}
                />
            </Route>
        </>,
    );

    const router = createBrowserRouter(routes);

    return (
        <TooltipProvider>
            <SidebarProvider>
                <RouterProvider router={router} />
                <Toaster />
            </SidebarProvider>
        </TooltipProvider>
    );
}
