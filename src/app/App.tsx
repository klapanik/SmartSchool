import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { RootLayout } from "@/layouts/RootLayout";
import { MainPage } from "@/pages/MainPage/MainPage";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function App() {
    const routes = createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />
            <Route path='/home' element={<MainPage />} />
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
