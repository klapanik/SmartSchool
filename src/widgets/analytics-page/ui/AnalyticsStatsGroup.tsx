import { AnalyticStatsCard } from "@/shared/ui/AnalyticStatsCard";
import { CalendarDays } from "lucide-react";

export function AnalyticStatsGroup() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4">
            <AnalyticStatsCard
                title="Пропуски"
                titleSubtext="за четверть"
                number={3}
                icon={CalendarDays}
                prevNumber={3}
            />
        </div>
    );
}
