import { Outlet } from "react-router-dom";

import { AppHeader } from "@/widgets/AppHeader";
import { AppSidebar } from "@/widgets/AppSidebar";

export function RootLayout() {
    return (
        <div className="flex w-full">
            <AppSidebar />

            <div className="w-full">
                <AppHeader />

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
