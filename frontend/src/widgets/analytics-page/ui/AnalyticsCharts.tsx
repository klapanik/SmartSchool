import { ChartPieLabel } from "@/widgets/analytics-page/ui/Charts/PieChart";
import {
    averageGradeDynamicsChartData,
    bestSubjectsChartData,
    comparisonWithClassChartData,
    comparisonWithPastChartData,
    monthsData,
    pieChartData,
    workloadChartData,
    worstSubjectsChartData,
} from "../models/mock";

import { ChartLineLabel } from "@/widgets/analytics-page/ui/Charts/LineChart";
import { HorizontalBarChart } from "@/widgets/analytics-page/ui/Charts/HorizontalBarChart";
import { HorizontalMultipleBarChart } from "@/widgets/analytics-page/ui/Charts/HorizontalMultipleBarChart";
import { VerticalMultipleBarChart } from "@/widgets/analytics-page/ui/Charts/VerticalMultipleBarChart";

import { PresenceCalendar } from "./PresenceCalendar";

export function AnalyticsCharts() {
    return (
        <div className="grid @min-[700px]:grid-cols-2 gap-5">
            <ChartLineLabel chartData={averageGradeDynamicsChartData} />
            <ChartPieLabel chartData={pieChartData} />

            <HorizontalBarChart
                title="Рейтинг лучших предметов"
                subtitle="Средние баллы по лучшим предметам"
                chartData={bestSubjectsChartData}
                type="averageGrades"
            />

            <HorizontalBarChart
                title="Рейтинг худших предметов"
                subtitle="Средние баллы по худшим предметам"
                chartData={worstSubjectsChartData}
                type="averageGrades"
            />

            <PresenceCalendar monthsData={monthsData} />

            <VerticalMultipleBarChart
                title="Сравнение с классом"
                subtitle="Сравнение среднего балла по лучшим предметам с классом"
                chartData={comparisonWithClassChartData}
            />

            <HorizontalMultipleBarChart
                title="Сравнение текущей и прошлой четвертей"
                subtitle="По каким предметам успеваемость выросла или упала (наибольшие положительные и отрицательные разрывы)"
                chartData={comparisonWithPastChartData}
            />

            <HorizontalBarChart
                title="Нагрузка по предметам (количество оценок)"
                subtitle="По каким предметам больше всего оценок"
                chartData={workloadChartData}
                type={null}
            />
        </div>
    );
}
