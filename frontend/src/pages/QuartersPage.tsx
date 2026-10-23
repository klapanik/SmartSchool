import { useQuartersQuery } from "@/entities/quarter/api/query";
import type { Quarter } from "@/entities/quarter/model/type";
import { useQuartersGradesQuery } from "@/entities/grades/api/queries";
import { useSubjectsCountQuery } from "@/entities/subject/api/query";

import { CurrentQuarter } from "@/widgets/quarters-page/ui/CurrentQuarter";
import { EmptyCurrentQuarter } from "@/widgets/quarters-page/ui/EmptyCurrentQuarter";
import { QuartersBlock } from "@/widgets/quarters-page/ui/QuartersBlock";
import { QuartersStatsGroup } from "@/widgets/quarters-page/ui/QuartersStatsGroup";
import { Skeleton } from "@/components/ui/skeleton";

export function QuartersPage() {
    const quartersQuery = useQuartersQuery();
    const quartersGradesQuery = useQuartersGradesQuery();
    const subjectsCountQuery = useSubjectsCountQuery();

    const isLoading =
        quartersQuery.isLoading || quartersGradesQuery.isLoading || subjectsCountQuery.isLoading;
    const isError =
        quartersQuery.isError || quartersGradesQuery.isError || subjectsCountQuery.isError;
    const error = quartersQuery.error ?? quartersGradesQuery.error ?? subjectsCountQuery.error;

    const currentQuarter: Quarter | null = quartersQuery.data
        ? quartersQuery.data.filter((quarter) => quarter.is_current)[0]
        : null;

    return (
        <section className="@container">
            <div className="mb-7">
                <h2 className="page-title">Четверти</h2>
                <p className="page-subtitle">Итоговые оценки по четвертям</p>
            </div>

            {isError ? (
                <div className="primary-block flex gap-1 text-lg">
                    <span>Ошибка в расписании!</span>
                    <span>
                        <i>{String(error)}</i>
                    </span>
                </div>
            ) : isLoading || !quartersQuery.data || !quartersGradesQuery.data ? (
                <div className="flex flex-col gap-5">
                    <Skeleton className="w-full h-44" />

                    <div className="flex gap-5">
                        <Skeleton className="w-full h-30" />
                        <Skeleton className="w-full h-30" />
                        <Skeleton className="w-full h-30" />
                    </div>

                    <Skeleton className="w-full h-51" />
                    <Skeleton className="w-full h-51" />
                    <Skeleton className="w-full h-51" />
                    <Skeleton className="w-full h-51" />
                </div>
            ) : (
                <>
                    <div className="primary-block">
                        {currentQuarter ? (
                            <CurrentQuarter
                                number={currentQuarter.number}
                                starts_at={currentQuarter.starts_at}
                                ends_at={currentQuarter.ends_at}
                                average={
                                    quartersGradesQuery.data.filter(
                                        (q) => q.quarter_id === currentQuarter.id,
                                    )[0].average_grade
                                }
                            />
                        ) : (
                            <EmptyCurrentQuarter />
                        )}
                    </div>
                    <QuartersStatsGroup
                        quartersAmount={quartersQuery.data.length}
                        quarterGradesAmount={quartersGradesQuery.data.reduce(
                            (sum, item) =>
                                sum +
                                (item.quarter_grades?.filter((grade) => Number(grade.grade) > 0)
                                    .length || 0),
                            0,
                        )}
                        subjectsCount={subjectsCountQuery.data?.count ?? 0}
                    />

                    <div className="flex flex-col gap-4">
                        {quartersQuery.data.map((quarter) => {
                            const quarterGrade = quartersGradesQuery.data.filter(
                                (q) => q.quarter_id === quarter.id,
                            )[0];

                            return (
                                <QuartersBlock
                                    key={quarter.id}
                                    number={quarter.number}
                                    average={quarterGrade.average_grade}
                                    starts_at={quarter.starts_at}
                                    ends_at={quarter.ends_at}
                                    quarterGrades={quarterGrade.quarter_grades}
                                />
                            );
                        })}
                        {/* <QuartersBlock quarter={year} subjects={subjects} /> */}
                    </div>
                </>
            )}
        </section>
    );
}
