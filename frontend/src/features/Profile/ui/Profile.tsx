import { Settings } from "@/features/Settings";
import { PersonalData } from "./PersonalData";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatsCards } from "./ProfileStatsCards";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const BASE_URL = import.meta.env.VITE_API_URL;
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
    return (
        <section className="rounded-md">
            <ProfileHeader />
            <div className="p-5 flex flex-col gap-4">
                <ProfileStatsCards />
                <div className="bg-smoky-white w-full h-px"></div>
                <PersonalData />
                <Settings handleLogout={handleLogout} />
            </div>
        </section>
    );
}
