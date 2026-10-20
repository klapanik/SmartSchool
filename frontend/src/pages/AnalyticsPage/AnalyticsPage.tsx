import { useAverageGradeQuery } from "@/entities/grades/api/queries";
import { useAnalyticsQuery } from "@/entities/user/api/queries";

import { AnalyticStatsGroup } from "@/widgets/analytics-page/ui/AnalyticsStatsGroup";
import { AnalyticsCharts } from "@/widgets/analytics-page/ui/AnalyticsCharts";

import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsPage() {
    const analyticsQuery = useAnalyticsQuery();
    const averageGradeQuery = useAverageGradeQuery();

    const isLoading = analyticsQuery.isLoading || averageGradeQuery.isLoading;
    const isError = analyticsQuery.isError || averageGradeQuery.isError;
    const error = analyticsQuery.error ?? averageGradeQuery.error;

    return (
        <section className="@container flex flex-col gap-7">
            <div>
                <h2 className="page-title">Аналитика</h2>
                <p className="page-subtitle">Подробная аналитика вашей успеваемости</p>
            </div>

            {isLoading || !analyticsQuery.data || !averageGradeQuery.data ? (
                <>
                    <div className="grid grid-cols-1 gap-5 @min-[550px]:grid-cols-2 @min-[1200px]:grid-cols-4">
                        <Skeleton className="w-full h-36" />
                        <Skeleton className="w-full h-36" />
                        <Skeleton className="w-full h-36" />
                        <Skeleton className="w-full h-36" />
                    </div>
                    <div className="grid grid-cols-1 @min-[550px]:grid-cols-2 gap-5">
                        <Skeleton className="w-full h-35" />
                        <Skeleton className="w-full h-35" />
                    </div>
                    <div className="grid @min-[700px]:grid-cols-2 gap-5">
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                        <Skeleton className="w-full h-96" />
                    </div>
                </>
            ) : isError ? (
                <div className="primary-block">
                    <p>Произошла ошибка: {String(error)}</p>
                </div>
            ) : (
                <>
                    <AnalyticStatsGroup
                        analyticsData={analyticsQuery.data}
                        averageGrade={averageGradeQuery.data.average}
                    />
                    <AnalyticsCharts analyticsData={analyticsQuery.data} />
                </>
            )}
        </section>
    );
}
