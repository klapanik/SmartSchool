import { AppSidebar } from "@/widgets/AppSidebar";
import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <div className="flex">
            <AppSidebar />

            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
}
