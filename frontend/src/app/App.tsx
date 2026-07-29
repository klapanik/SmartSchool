import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { RootLayout } from "@/layouts/RootLayout";
import { AuthLayout } from "@/layouts/AuthLayout";

import { MainPage } from "@/pages/MainPage/MainPage";
import { QuartersPage } from "@/pages/QuartersPage/QuartersPage";
import { SchedulePage } from "@/pages/SchedulePage/SchedulePage";
import { AnalyticsPage } from "@/pages/AnalyticsPage/AnalyticsPage";
import { GradesPage } from "@/pages/GradesPage/GradesPage";

import { ActivationForm } from "@/features/ActivationForm/ActivationForm";
import { LoginForm } from "@/features/LoginForm/LoginForm";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function App() {
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
                <Route path="/auth/activate" element={<ActivationForm onSubmit={() => {}} />} />
                <Route path="/auth/login" element={<LoginForm onSubmit={() => {}} />} />
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
