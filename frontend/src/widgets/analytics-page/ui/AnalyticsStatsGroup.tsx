import type { Analytics } from "@/entities/user/model/type";
import { AnalyticStatsCard } from "@/widgets/analytics-page/ui/AnalyticStatsCard";
import { CalendarDays, TriangleAlert, Trophy } from "lucide-react";

export function AnalyticStatsGroup({
    analyticsData,
    averageGrade,
}: {
    analyticsData: Analytics;
    averageGrade: number;
}) {
    const { absence_count, worst_grade, best_subjects, worst_subjects } = analyticsData;

    return (
        <section>
            <div className="grid grid-cols-1 gap-5 @min-[550px]:grid-cols-2 @min-[1200px]:grid-cols-4 mb-5">
                <AnalyticStatsCard
                    title="Пропуски"
                    titleSubtext="за четверть"
                    number={absence_count}
                    icon={CalendarDays}
                    prevNumber={3}
                />
                <AnalyticStatsCard
                    title="Средний балл"
                    titleSubtext="за четверть"
                    number={averageGrade}
                    icon={CalendarDays}
                    prevNumber={8.93}
                />
                <AnalyticStatsCard
                    title="Худшая оценка"
                    titleSubtext={`по предмету '${worst_grade.subject}'`}
                    number={worst_grade.grade}
                    icon={CalendarDays}
                    prevNumber={5}
                    description="по предмету 'Математика'"
                />
                <AnalyticStatsCard
                    title="Всего оценок"
                    titleSubtext="за четверть"
                    number={126}
                    icon={CalendarDays}
                    prevNumber={159}
                />
            </div>
            <div className="grid grid-cols-1 @min-[550px]:grid-cols-2 gap-5">
                <div>
                    <AnalyticStatsCard
                        title="Лучший предмет"
                        subject={best_subjects[0].subject}
                        number={best_subjects[0].averageGrade}
                        icon={Trophy}
                        prevNumber={best_subjects[0].last_average_grade}
                    />
                </div>
                <div>
                    <AnalyticStatsCard
                        title="Трудный предмет"
                        subject={worst_subjects[0].subject}
                        number={worst_subjects[0].averageGrade}
                        icon={TriangleAlert}
                        prevNumber={worst_subjects[0].last_average_grade}
                    />
                </div>
            </div>
        </section>
    );
}
