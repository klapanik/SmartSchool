import { StatsCard } from "@/shared/ui/StatsCard";
import { BookOpen, CalendarDays, TrendingUp } from "lucide-react";

export function QuatersStatsGroup() {
    return (
        <div className="flex mb-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
            <StatsCard
                title="Четвертей"
                icon={CalendarDays}
                number={4}
                subtext="добавлено"
            />
            <StatsCard
                title="Четвертных оценок"
                icon={TrendingUp}
                number={32}
                subtext="выставлено"
            />
            <StatsCard
                title="Предметов"
                icon={BookOpen}
                number={16}
                subtext="изучается"
            />
        </div>
    );
}
