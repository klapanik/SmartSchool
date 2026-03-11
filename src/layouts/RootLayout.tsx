import { AppSidebar } from "@/widgets/AppSidebar";
import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <div>
            <AppSidebar />

            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
}
