import { StatsCard } from "@/shared/ui/StatsCard";
import { CalendarDays, TrendingUp } from "lucide-react";

type Props = {
    todaysLessonsAmount: string | number;
    latestGradesAmount: number;
    averageGrade: string | number;
};

export function StatsGroup({ todaysLessonsAmount, latestGradesAmount, averageGrade }: Props) {
    return (
        <div className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-2 @3xl:grid-cols-4">
            <StatsCard
                title="Сегодня уроков"
                icon={CalendarDays}
                number={todaysLessonsAmount}
                subtext={todaysLessonsAmount === 0 ? "Выходной день" : "Сегодня рабочий день"}
            />
            <StatsCard
                title="Оценки"
                icon={TrendingUp}
                number={latestGradesAmount}
                subtext="за последнюю неделю"
            />
            <StatsCard
                title="Средний балл"
                icon={TrendingUp}
                number={averageGrade}
                subtext="за все время"
            />
            <StatsCard
                title="Текущая неделя"
                icon={CalendarDays}
                number={0}
                subtext="Учебного года"
            />
        </div>
    );
}
