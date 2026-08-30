import { useNavigate } from "react-router-dom";

import { apiFetch } from "@/shared/api/fetch";

import { useCurrentUserQuery } from "@/entities/user/api/queries";
import { useSubjectsCountQuery } from "@/entities/subject/api/query";
import { useAverageGradeQuery } from "@/entities/grades/api/queries";

import { PersonalData } from "./PersonalData";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatsCards } from "./ProfileStatsCards";

import { Settings } from "@/features/Settings";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

export function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiFetch("/user/logout/", { method: "POST" });
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const userQuery = useCurrentUserQuery();
    const subjectsCountQuery = useSubjectsCountQuery();
    const averageGradeQuery = useAverageGradeQuery();

    const isLoading =
        userQuery.isLoading || subjectsCountQuery.isLoading || averageGradeQuery.isLoading;
    const isError = userQuery.isError || subjectsCountQuery.isError || averageGradeQuery.isError;
    const error = userQuery.error ?? subjectsCountQuery.error ?? averageGradeQuery.error;

    const userFullName =
        userQuery.data && !userQuery.isLoading ? (
            userQuery.data.first_name + " " + userQuery.data.last_name
        ) : (
            <Skeleton className="w-52 h-4 bg-white" />
        );

    const userClass =
        userQuery.data && !userQuery.isLoading ? (
            userQuery.data.form + userQuery.data.letter
        ) : (
            <Skeleton className="w-5 h-4 bg-white" />
        );

    return (
        <section
            className={`rounded-md relative ${isLoading || !userQuery.data ? "opacity-20" : ""}`}
        >
            {isLoading || !userQuery.data ? (
                <Spinner className="absolute size-12 top-1/2 left-9/20 text-primary z-60" />
            ) : isError ? (
                <div className="primary-block">{String(error)}</div>
            ) : null}
            <div className={isLoading ? "opacity-20" : ""}>
                <ProfileHeader
                    userFullName={userFullName}
                    userClass={userClass}
                    avatar={userQuery.data?.avatar}
                />
                <div className="p-5 flex flex-col gap-4">
                    <ProfileStatsCards
                        averageGrade={averageGradeQuery.data?.average ?? 0}
                        subjectsCount={subjectsCountQuery.data?.count ?? 0}
                    />

                    <Separator className="bg-muted" />

                    <PersonalData
                        classTeacher={
                            userQuery.data
                                ? userQuery.data?.class_teacher_first_name +
                                  " " +
                                  userQuery.data?.class_teacher_last_name
                                : null
                        }
                        parent={
                            userQuery.data
                                ? userQuery.data?.parent_first_name +
                                  " " +
                                  userQuery.data?.parent_last_name
                                : null
                        }
                        email={userQuery.data?.email}
                        phone_number={userQuery.data?.phone_number}
                    />
                    <Settings handleLogout={handleLogout} />
                </div>
            </div>
        </section>
    );
}
