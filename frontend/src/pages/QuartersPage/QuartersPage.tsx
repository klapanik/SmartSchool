import { useQuartersQuery } from "@/entities/quarter/api/query";
import type { Quarter } from "@/entities/quarter/model/type";

import { CurrentQuarter } from "@/widgets/quarters-page/ui/CurrentQuarter";
import { EmptyCurrentQuarter } from "@/widgets/quarters-page/ui/EmptyCurrentQuarter";
import { QuartersBlock } from "@/widgets/quarters-page/ui/QuartersBlock";
import { QuartersStatsGroup } from "@/widgets/quarters-page/ui/QuartersStatsGroup";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuartersGradesQuery } from "@/entities/grades/api/queries";

export function QuartersPage() {
    const {
        data: quartersData,
        isLoading: isQuartersLoading,
        isError: isQuartersError,
        error: quartersError,
    } = useQuartersQuery();

    const {
        data: quartersGradesData,
        isLoading: isQuartersGradesLoading,
        isError: isQuartersGradesError,
        error: quartersGradesError,
    } = useQuartersGradesQuery();

    const currentQuarter: Quarter | null = quartersData
        ? quartersData.filter((quarter) => quarter.is_current)[0]
        : null;

    return (
        <section className="@container">
            <div className="mb-7">
                <h2 className="page-title">Четверти</h2>
                <p className="page-subtitle">Итоговые оценки по четвертям</p>
            </div>

            {isQuartersError || isQuartersGradesError ? (
                <div className="primary-block flex gap-1 text-lg">
                    <span>Ошибка в расписании!</span>
                    <span>
                        <i>{String(quartersError ?? '') + " " + String(quartersGradesError ?? '')}</i>
                    </span>
                </div>
            ) : isQuartersLoading ||
              isQuartersGradesLoading ||
              !quartersData ||
              !quartersGradesData ? (
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
                                    quartersGradesData.filter(
                                        (q) => q.quarter_id === currentQuarter.id,
                                    )[0].average_grade
                                }
                            />
                        ) : (
                            <EmptyCurrentQuarter />
                        )}
                    </div>
                    <QuartersStatsGroup />

                    <div className="flex flex-col gap-4">
                        {quartersData.map((quarter) => {
                            const quarterGrade = quartersGradesData.filter((q) => q.quarter_id === quarter.id)[0]

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
