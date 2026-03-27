import { Hero } from "@/widgets/main-page/ui/Hero/Hero";
import { LatestGrades } from "@/widgets/main-page/ui/LatestGrades/LatestGrades";
import { StatsGroup } from "@/widgets/main-page/ui/StatsGroup/StatsGroup";
import { EmptyTodaysSchedule } from "@/widgets/main-page/ui/TodaysSchedule/EmptyTodaysSchedule";

export function MainPage() {
    return (
        <section>
            <Hero />
            <StatsGroup />
            <section className="grid grid-cols-2 gap-6">
                <EmptyTodaysSchedule />
                <LatestGrades />
            </section>
        </section>
    );
}
