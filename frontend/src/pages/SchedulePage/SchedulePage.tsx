import { useGradesQuery } from "@/entities/grades/api/queries";
import { useScheduleQuery } from "@/entities/schedule/api/query";

import { ScheduleBlock } from "@/widgets/schedule-page/ui/ScheduleBlock";

import { Skeleton } from "@/components/ui/skeleton";
import { EmptyTodaysSchedule } from "@/shared/ui/EmptyTodaysSchedule";

export function SchedulePage() {
    const scheduleQuery = useScheduleQuery();

    const weekAgoDate = new Date();
    weekAgoDate.setDate(weekAgoDate.getDate() - 7);

    const formattedWeekAgoDate = `${weekAgoDate.getFullYear()}-${String(weekAgoDate.getMonth() + 1).padStart(2, "0")}-${String(weekAgoDate.getDate()).padStart(2, "0")}`;

    const latestGradesQuery = useGradesQuery({ from: formattedWeekAgoDate });

    const dayNumber = new Date().getDay();

    const isLoading = scheduleQuery.isLoading || latestGradesQuery.isLoading;
    const isError = scheduleQuery.isError || latestGradesQuery.isError;
    const error = scheduleQuery.error ?? latestGradesQuery.error;

    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Расписание</h2>
                <p className="page-subtitle">Управление расписанием уроков</p>
            </div>

            <div className="flex flex-col gap-4">
                {dayNumber === 6 || dayNumber === 7 ? (
                    <EmptyTodaysSchedule type="secondary" />
                ) : null}

                {isError ? (
                    <div className="primary-block flex gap-1 text-lg">
                        <span>Ошибка в расписании!</span>
                        <span>
                            <i>{String(error)}</i>
                        </span>
                    </div>
                ) : !scheduleQuery.data || isLoading || !latestGradesQuery.data ? (
                    <>
                        <Skeleton className="w-full h-60" />
                        <Skeleton className="w-full h-60" />
                        <Skeleton className="w-full h-60" />
                        <Skeleton className="w-full h-60" />
                        <Skeleton className="w-full h-60" />
                    </>
                ) : (
                    <>
                        <ScheduleBlock
                            data={scheduleQuery.data.monday}
                            grades={latestGradesQuery.data}
                        />

                        <ScheduleBlock
                            data={scheduleQuery.data.tuesday}
                            grades={latestGradesQuery.data}
                        />

                        <ScheduleBlock
                            data={scheduleQuery.data.wednesday}
                            grades={latestGradesQuery.data}
                        />

                        <ScheduleBlock
                            data={scheduleQuery.data.thursday}
                            grades={latestGradesQuery.data}
                        />

                        <ScheduleBlock
                            data={scheduleQuery.data.friday}
                            grades={latestGradesQuery.data}
                        />
                    </>
                )}
            </div>
        </section>
    );
}
