import { Hero } from "@/widgets/main-page/ui/Hero/Hero";
import { LatestGrades } from "@/widgets/main-page/ui/LatestGrades/LatestGrades";
import { StatsGroup } from "@/widgets/main-page/ui/StatsGroup/StatsGroup";
import { EmptyTodaysSchedule } from "@/shared/ui/EmptyTodaysSchedule";

export function MainPage() {
    return (
        <section className="@container">
            <Hero />
            <StatsGroup />
            <section className="grid grid-cols-1 gap-6 @2xl:grid-cols-2">
                <EmptyTodaysSchedule type="main" />
                <LatestGrades />
            </section>
        </section>
    );
}
