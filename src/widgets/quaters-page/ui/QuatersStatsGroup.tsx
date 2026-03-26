import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays } from "lucide-react";

export const QuatersStatsGroup = () => {
    return (
        <div className="flex mb-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            <StatsCard
                title="Четвертей"
                icon={CalendarDays}
                number={4}
                subtext="добавлено"
            />
            <StatsCard
                title="Четвертных оценок"
                icon={CalendarDays}
                number={32}
                subtext="выставлено"
            />
            <StatsCard
                title="Предметов"
                icon={CalendarDays}
                number={16}
                subtext="изучается"
            />
        </div>
    );
};
