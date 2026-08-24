import { useGradesQuery } from "@/entities/grades/api/queries";
import { useQuartersQuery } from "@/entities/quarter/api/query";
import type { Quarter } from "@/entities/quarter/model/type";

import { GradesFilters } from "@/widgets/grades-page/ui/GradesFilters";
import { GradesList } from "@/widgets/grades-page/ui/GradesList";
import { GradesStatsGroup } from "@/widgets/grades-page/ui/GradesStatsGroup";
import { ScrollTopArrow } from "@/widgets/grades-page/ui/ScrollTopArrow";
import { SubjectAverageGrade } from "@/widgets/grades-page/ui/SubjectAverageGrade";

import { Skeleton } from "@/components/ui/skeleton";

export function GradesPage() {
    const quartersQuery = useQuartersQuery();

    const currentQuarter: Quarter | null = quartersQuery.data
        ? quartersQuery.data.filter((quarter) => quarter.is_current)[0]
        : null;

    const { data, isLoading, isError, error } = useGradesQuery({ quarter: currentQuarter?.id });

    return (
        <section className="@container flex flex-col gap-5">
            <div className="mb-2">
                <h2 className="page-title">Оценки</h2>
                <p className="page-subtitle">Управление вашими оценками</p>
            </div>
            {isError ? (
                <div className="primary-block">
                    Ошибка в получении ваших оценок! Пожалуйста, обновите страницу или попробуйте
                    ещё раз позже {String(error)}
                </div>
            ) : isLoading || !data ? (
                <>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <Skeleton className="w-full h-30" />
                        <Skeleton className="w-full h-30" />
                        <Skeleton className="w-full h-30" />
                    </div>

                    <Skeleton className="w-full h-72" />
                    <Skeleton className="w-full h-71" />
                    <Skeleton className="w-full h-64" />
                </>
            ) : (
                <>
                    <GradesStatsGroup gradesAmount={data.length} />
                    <SubjectAverageGrade />
                    <GradesFilters />
                    <GradesList grades={data} />
                    <ScrollTopArrow />
                </>
            )}
        </section>
    );
}
