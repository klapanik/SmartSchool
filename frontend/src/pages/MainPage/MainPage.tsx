import { Hero } from "@/widgets/main-page/ui/Hero/Hero";
import { LatestGrades } from "@/widgets/main-page/ui/LatestGrades/LatestGrades";
import { StatsGroup } from "@/widgets/main-page/ui/StatsGroup/StatsGroup";
import { EmptyTodaysSchedule } from "@/shared/ui/EmptyTodaysSchedule";

import { useScheduleQuery } from "@/entities/schedule/api/query";
import type { Schedule } from "@/entities/schedule/model/type";
import { ScheduleBlock } from "@/widgets/schedule-page/ui/ScheduleBlock";

export function MainPage() {
    const { data: schedule } = useScheduleQuery();

    const todaysSchedule: Schedule = Object.values(schedule ?? []).find((item) => item.isToday);

    return (
        <section className="@container">
            <Hero todaysSchedule={todaysSchedule?.schedule} />
            <StatsGroup todaysLessonsAmount={todaysSchedule?.schedule.length} />
            <section className="grid grid-cols-1 gap-6 @2xl:grid-cols-2">
                <div>
                    {todaysSchedule?.schedule.length ? (
                        <ScheduleBlock data={todaysSchedule} isLinkNeeded={true} />
                    ) : (
                        <EmptyTodaysSchedule type="main" />
                    )}
                </div>
                <LatestGrades />
            </section>
        </section>
    );
}
