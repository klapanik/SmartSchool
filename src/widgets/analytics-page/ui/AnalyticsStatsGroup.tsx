import { AnalyticStatsCard } from "@/shared/ui/AnalyticStatsCard";
import { CalendarDays, TriangleAlert, Trophy } from "lucide-react";

export function AnalyticStatsGroup() {
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4 md:grid-cols-2">
            <AnalyticStatsCard
                title="Пропуски"
                titleSubtext="за четверть"
                number={3}
                icon={CalendarDays}
                prevNumber={3}
            />
            <AnalyticStatsCard
                title="Общий средний
 балл"
                titleSubtext="за четверть"
                number={9.23}
                icon={CalendarDays}
                prevNumber={8.93}
            />
            <AnalyticStatsCard
                title="Худшая оценка"
                titleSubtext="по Химии"
                number={7}
                icon={CalendarDays}
                prevNumber={5}
                description="по Математике"
            />
            <AnalyticStatsCard
                title="Всего оценок"
                titleSubtext="за четверть"
                number={126}
                icon={CalendarDays}
                prevNumber={159}
            />
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                <AnalyticStatsCard
                    title="Лучший предмет"
                    icon={Trophy}
                    prevNumber={9.5}
                    subject="География"
                    number={10.0}
                />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                <AnalyticStatsCard
                    title="Трудный предмет"
                    subject="Химия"
                    number={7.2}
                    icon={TriangleAlert}
                    prevNumber={8.1}
                />
            </div>
        </div>
    );
}
