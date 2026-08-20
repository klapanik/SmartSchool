import { StatsCard } from "@/shared/ui/StatsCard";
import { BookOpen, CalendarDays, TrendingUp } from "lucide-react";

type Props = {
    quartersAmount: string | number,
    quarterGradesAmount: string | number
}

export function QuartersStatsGroup({quartersAmount, quarterGradesAmount}: Props) {
    return (
        <div className="my-5 grid grid-cols-1 gap-5 @min-[720px]:grid-cols-3">
            <StatsCard title="Четвертей" icon={CalendarDays} number={quartersAmount} subtext="добавлено" />
            <StatsCard
                title="Четвертных оценок"
                icon={TrendingUp}
                number={quarterGradesAmount}
                subtext="выставлено"
            />
            <StatsCard title="Предметов" icon={BookOpen} number={16} subtext="изучается" />
        </div>
    );
}
