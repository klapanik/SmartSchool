import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays, TrendingUp } from "lucide-react";

export default function GradesStatsGroup() {
    return (
        <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <StatsCard title="Четвертей" icon={TrendingUp} number={4} subtext="добавлено" />
            <StatsCard
                title="Четвертных оценок"
                icon={TrendingUp}
                number={32}
                subtext="выставлено"
            />
            <StatsCard title="Предметов" icon={CalendarDays} number={16} subtext="изучается" />
        </div>
    );
}
