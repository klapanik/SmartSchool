import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <div className="p-6">
            <Outlet />
        </div>
    );
}
