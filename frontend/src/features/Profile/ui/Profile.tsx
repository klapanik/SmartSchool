import { useNavigate } from "react-router-dom";

import { PersonalData } from "./PersonalData";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatsCards } from "./ProfileStatsCards";

import { Settings } from "@/features/Settings";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { BASE_URL } from "@/shared/api/config";
import { useCurrentUserQuery } from "@/entities/user/api/queries";
import { Skeleton } from "@/components/ui/skeleton";

export function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const accessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1NjAyOTIwLCJpYXQiOjE3ODU2MDExMjAsImp0aSI6IjAyMzE0MTI0NzM4NDRlMDQ5ZDM2ZDE1NDc0YTZjYmMzIiwidXNlcl9pZCI6IjIifQ.UUIrdwJ6XtDCcUYzl-e0LuuhbdfBA4Vp4oFBkfpjf2Q";

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

    const { data: userData, isLoading } = useCurrentUserQuery();
    const userFullName =
        userData && !isLoading ? (
            userData.first_name + " " + userData.last_name
        ) : (
            <Skeleton className="w-52 h-4 bg-white" />
        );

    const userClass =
        userData && !isLoading ? (
            userData.form + userData.letter
        ) : (
            <Skeleton className="w-5 h-4 bg-white" />
        );

    return (
        <section className="rounded-md relative">
            {isLoading ? (
                <Spinner className="absolute size-12 top-1/2 left-9/20 text-primary z-60" />
            ) : null}
            <div className={isLoading ? "opacity-20" : ""}>
                <ProfileHeader
                    userFullName={userFullName}
                    userClass={userClass}
                    avatar={userData?.avatar}
                />
                <div className="p-5 flex flex-col gap-4">
                    <ProfileStatsCards />
                    <Separator className="bg-muted" />
                    <PersonalData
                        classTeacher={
                            userData
                                ? userData?.class_teacher_first_name +
                                  " " +
                                  userData?.class_teacher_last_name
                                : null
                        }
                        parent={
                            userData
                                ? userData?.parent_first_name + " " + userData?.parent_last_name
                                : null
                        }
                        email={userData?.email}
                        phone_number={userData?.phone_number}
                    />
                    <Settings handleLogout={handleLogout} />
                </div>
            </div>
        </section>
    );
}
