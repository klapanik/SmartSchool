import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays, TrendingUp } from "lucide-react";

type Props = {
    gradesAmount: number;
    averageGrade: number;
    subjectsCount: number;
};

export function GradesStatsGroup({ gradesAmount, averageGrade, subjectsCount }: Props) {
    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <StatsCard
                title="Общий средний балл"
                icon={TrendingUp}
                number={averageGrade}
                subtext={`Из ${gradesAmount ?? 0} оценок`}
                iconClassName="text-gray-500"
            />
            <StatsCard
                title="Всего оценок"
                icon={TrendingUp}
                number={gradesAmount}
                subtext="всего оценок"
                iconClassName="text-gray-500"
            />
            <StatsCard
                title="Предметов"
                icon={CalendarDays}
                number={subjectsCount}
                subtext="Активных предметов"
                iconClassName="text-gray-500"
            />
        </div>
    );
}
