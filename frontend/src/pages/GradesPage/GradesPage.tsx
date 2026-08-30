import { useSubjectsCountQuery } from "@/entities/subject/api/query";
import {
    useAverageGradeQuery,
    useAverageGradesQuery,
    useGradesQuery,
} from "@/entities/grades/api/queries";
import { useQuartersQuery } from "@/entities/quarter/api/query";
import type { Quarter } from "@/entities/quarter/model/type";

import { GradesList } from "@/widgets/grades-page/ui/GradesList";
import { GradesStatsGroup } from "@/widgets/grades-page/ui/GradesStatsGroup";
import { ScrollTopArrow } from "@/widgets/grades-page/ui/ScrollTopArrow";
import { SubjectAverageGrade } from "@/widgets/grades-page/ui/SubjectAverageGrade";

import { Skeleton } from "@/components/ui/skeleton";

export function GradesPage() {
    const quartersQuery = useQuartersQuery();
    const subjectsQuery = useSubjectsCountQuery();
    const averageGradeQuery = useAverageGradeQuery();
    const averagesGradesQuery = useAverageGradesQuery();

    const currentQuarter: Quarter | null = quartersQuery.data
        ? quartersQuery.data.filter((quarter) => quarter.is_current)[0]
        : null;

    const gradesQuery = useGradesQuery({ quarter: currentQuarter?.id });

    const isLoading =
        quartersQuery.isLoading ||
        subjectsQuery.isLoading ||
        gradesQuery.isLoading ||
        averageGradeQuery.isLoading ||
        averagesGradesQuery.isLoading;

    const isError =
        quartersQuery.isError ||
        subjectsQuery.isError ||
        gradesQuery.isError ||
        averageGradeQuery.isError ||
        averagesGradesQuery.isError;

    const error =
        quartersQuery.error ??
        subjectsQuery.error ??
        gradesQuery.error ??
        averageGradeQuery.error ??
        averagesGradesQuery.error;

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
            ) : isLoading || gradesQuery.data === undefined || averagesGradesQuery.data === undefined ? (
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
                    <GradesStatsGroup
                        gradesAmount={gradesQuery.data.length}
                        averageGrade={averageGradeQuery.data?.average ?? 0}
                        subjectsCount={subjectsQuery.data?.count ?? 0}
                    />
                    <SubjectAverageGrade averageGrades={averagesGradesQuery.data} />
                    <GradesList grades={gradesQuery.data} />
                    <ScrollTopArrow />
                </>
            )}
        </section>
    );
}
