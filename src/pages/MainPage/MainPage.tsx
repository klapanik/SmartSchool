import { Hero } from "@/widgets/main-page/ui/Hero/Hero";
import { StatsGroup } from "@/widgets/main-page/ui/StatsGroup/StatsGroup";
import { EmptyTodaysSchedule } from "@/widgets/main-page/ui/TodaysSchedule/EmptyTodaysSchedule";

export function MainPage() {
    return (
        <section>
            <Hero />
            <StatsGroup />
            <EmptyTodaysSchedule />
        </section>
    );
}
