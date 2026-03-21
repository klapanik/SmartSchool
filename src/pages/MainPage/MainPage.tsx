import { Hero } from "@/widgets/main-page/ui/Hero/Hero";
import { EmptyTodaysSchedule } from "@/widgets/main-page/ui/TodaysSchedule/EmptyTodaysSchedule";

export function MainPage() {
    return (
        <section>
            <Hero />
            <EmptyTodaysSchedule />
        </section>
    );
}
