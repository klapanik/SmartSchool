import { Hero } from "@/widgets/main-page/ui/Hero/Hero";
import { LatestGrades } from "@/widgets/main-page/ui/LatestGrades/LatestGrades";
import { StatsGroup } from "@/widgets/main-page/ui/StatsGroup/StatsGroup";
import { EmptyTodaysSchedule } from "@/shared/ui/EmptyTodaysSchedule";

import { useScheduleQuery } from "@/entities/schedule/api/query";
import type { Schedule } from "@/entities/schedule/model/type";
import { ScheduleBlock } from "@/widgets/schedule-page/ui/ScheduleBlock";
import { useAverageGradeQuery, useGradesQuery } from "@/entities/grades/api/queries";

export function MainPage() {
    const scheduleQuery = useScheduleQuery();
    const averageGradeQuery = useAverageGradeQuery();

    const todaysSchedule: Schedule = Object.values(scheduleQuery.data ?? []).find(
        (item) => item.isToday,
    );

    const weekAgoDate = new Date();
    weekAgoDate.setDate(weekAgoDate.getDate() - 7);

    const formattedWeekAgoDate = `${weekAgoDate.getFullYear()}-${String(weekAgoDate.getMonth() + 1).padStart(2, "0")}-${String(weekAgoDate.getDate()).padStart(2, "0")}`;

    const latestGradesQuery = useGradesQuery({ from: formattedWeekAgoDate });

    return (
        <section className="@container">
            <Hero todaysSchedule={todaysSchedule?.schedule} />

            <StatsGroup
                todaysLessonsAmount={todaysSchedule?.schedule?.length ?? 0}
                latestGradesAmount={latestGradesQuery?.data?.length ?? 0}
                averageGrade={averageGradeQuery?.data?.average ?? 0}
            />

            <section className="grid grid-cols-1 gap-6 @2xl:grid-cols-2">
                <div>
                    {todaysSchedule?.schedule.length ? (
                        <ScheduleBlock data={todaysSchedule} isLinkNeeded={true} />
                    ) : (
                        <EmptyTodaysSchedule type="main" />
                    )}
                </div>
                <LatestGrades latestGrades={latestGradesQuery?.data} />
            </section>
        </section>
    );
}
