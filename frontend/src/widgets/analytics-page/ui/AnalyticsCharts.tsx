import { ChartPieLabel } from "@/widgets/analytics-page/ui/Charts/PieChart";
import {
    monthsData,
} from "../models/mock";

import { ChartLineLabel } from "@/widgets/analytics-page/ui/Charts/LineChart";
import { HorizontalBarChart } from "@/widgets/analytics-page/ui/Charts/HorizontalBarChart";
import { HorizontalMultipleBarChart } from "@/widgets/analytics-page/ui/Charts/HorizontalMultipleBarChart";
import { VerticalMultipleBarChart } from "@/widgets/analytics-page/ui/Charts/VerticalMultipleBarChart";

import { PresenceCalendar } from "./PresenceCalendar";
import type { Analytics } from "@/entities/user/model/type";

export function AnalyticsCharts({ analyticsData }: { analyticsData: Analytics }) {
    return (
        <div className="grid @min-[700px]:grid-cols-2 gap-5">
            {analyticsData.monthly_average.length > 1 && (
                <ChartLineLabel chartData={analyticsData.monthly_average} />
            )}

            <ChartPieLabel chartData={analyticsData.grade_distribution} />

            <HorizontalBarChart
                title="Рейтинг лучших предметов"
                subtitle="Средние баллы по лучшим предметам"
                chartData={analyticsData.best_subjects}
                type="averageGrades"
            />

            <HorizontalBarChart
                title="Рейтинг худших предметов"
                subtitle="Средние баллы по худшим предметам"
                chartData={analyticsData.worst_subjects}
                type="averageGrades"
            />

            <PresenceCalendar monthsData={monthsData} />

            <VerticalMultipleBarChart
                title="Сравнение с классом"
                subtitle="Сравнение среднего балла по лучшим предметам с классом"
                chartData={analyticsData.comparison}
            />

            <HorizontalMultipleBarChart
                title="Сравнение текущей и прошлой четвертей"
                subtitle="По каким предметам успеваемость выросла или упала (наибольшие положительные и отрицательные разрывы)"
                chartData={analyticsData.comparison}
            />

            <HorizontalBarChart
                title="Нагрузка по предметам (количество оценок)"
                subtitle="По каким предметам больше всего оценок"
                chartData={analyticsData.subject_workload}
            />
        </div>
    );
}
