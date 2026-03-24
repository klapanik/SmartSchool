import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays, TrendingUp } from "lucide-react";

export const StatsGroup = () => {
    return (
        <div className="flex mb-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Сегодня уроков"
                icon={CalendarDays}
                number={0}
                subtext="Выходной день"
            />
            <StatsCard
                title="Оценки"
                icon={TrendingUp}
                number={0}
                subtext="за последнее время"
            />
            <StatsCard
                title="Средний балл"
                icon={TrendingUp}
                number={0}
                subtext="за все время"
            />
            <StatsCard
                title="Текущая неделя"
                icon={CalendarDays}
                number={0}
                subtext="учебного года"
            />
        </div>
    );
};
