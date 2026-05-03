import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays, TrendingUp } from "lucide-react";

export default function GradesStatsGroup() {
    return (
        <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-3 text-gray-500">
            <StatsCard
                title="Общий средний балл"
                icon={TrendingUp}
                number={9.23}
                subtext="Из 10 оценок"
            />
            <StatsCard title="Всего оценок" icon={TrendingUp} number={10} subtext="всего оценок" />
            <StatsCard
                title="Предметов"
                icon={CalendarDays}
                number={16}
                subtext="Активных предметов"
            />
        </div>
    );
}
