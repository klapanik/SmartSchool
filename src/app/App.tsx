import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { RootLayout } from "@/layouts/RootLayout";
import { MainPage } from "@/pages/MainPage/MainPage";
import { QuatersPage } from "@/pages/QuatersPage/QuatersPage";
import { SchedulePage } from "@/pages/SchedulePage/SchedulePage";
import { AnalyticsPage } from "@/pages/AnalyticsPage/AnalyticsPage";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function App() {
    const routes = createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />
            <Route path='/home' element={<MainPage />} />
            <Route path='/schedule' element={<SchedulePage />} />
            <Route path='/quarters' element={<QuatersPage />} />
            <Route path='/analytics' element={<AnalyticsPage />} />
        </Route>
    );
    const router = createBrowserRouter(routes);

    return (
        <TooltipProvider>
            <SidebarProvider>
                <RouterProvider router={router} />
            </SidebarProvider>
        </TooltipProvider>
    );
}
