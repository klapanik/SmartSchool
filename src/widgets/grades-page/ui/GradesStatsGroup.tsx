import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays, TrendingUp } from "lucide-react";

export function GradesStatsGroup() {
    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 ">
            <StatsCard
                title="Общий средний балл"
                icon={TrendingUp}
                number={9.23}
                subtext="Из 10 оценок"
                iconClassName="text-gray-500"
            />
            <StatsCard
                title="Всего оценок"
                icon={TrendingUp}
                number={10}
                subtext="всего оценок"
                iconClassName="text-gray-500"
            />
            <StatsCard
                title="Предметов"
                icon={CalendarDays}
                number={16}
                subtext="Активных предметов"
                iconClassName="text-gray-500"
            />
        </div>
    );
}
