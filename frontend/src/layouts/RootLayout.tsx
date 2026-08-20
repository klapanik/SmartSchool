import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useCurrentUserQuery } from "@/entities/user/api/queries";
import { useSubjectsCountQuery } from "@/entities/subject/api/query";

import { AppSidebar } from "@/features/AppSidebar";
import { AppHeader } from "@/widgets/AppHeader/AppHeader";
import { Spinner } from "@/components/ui/spinner";

export function RootLayout() {
    const userQuery = useCurrentUserQuery();
    const subjectsCountQuery = useSubjectsCountQuery();

    const isLoading = userQuery.isLoading || subjectsCountQuery.isLoading;
    const isError = userQuery.isError || subjectsCountQuery.isError;
    const error = userQuery.error ?? subjectsCountQuery.error;

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    return (
        <div className="flex w-full">
            <AppSidebar />

            <div className="w-full">
                <AppHeader />

                <div className={`p-6 relative ${isLoading ? "h-screen" : ""}`}>
                    {isError ? (
                        <div className="primary-block">
                            Ошибка в получении ваших данных {String(error)}
                        </div>
                    ) : (
                        <div className={isLoading ? "opacity-20" : ""}>
                            <Outlet />
                        </div>
                    )}

                    {isLoading ? (
                        <Spinner className="absolute size-12 top-3/7 left-1/2 text-primary z-60" />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
