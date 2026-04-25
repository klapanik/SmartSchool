import { ChartPieLabel } from "@/shared/ui/Charts/PieChart";
import {
    avarageGradeDynamicsChartData,
    bestSubjectsChartData,
    pieChartData,
    workloadChartData,
    worstSubjectsChartData,
} from "../models/mock";
import { ChartLineLabel } from "@/shared/ui/Charts/LineChart";
import { HorizontalBarChart } from "@/shared/ui/Charts/HorizontalBarChart";

export function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-2 gap-5">
            <ChartLineLabel chartData={avarageGradeDynamicsChartData} />
            <ChartPieLabel chartData={pieChartData} />
            <HorizontalBarChart
                title="Рейтинг лучших предметов"
                subtitle="Средние баллы по лучшим предметам"
                chartData={bestSubjectsChartData}
                type='avarageGrades'
            />
            <HorizontalBarChart
                title="Рейтинг худших предметов"
                subtitle="Средние баллы по худшим предметам"
                chartData={worstSubjectsChartData}
                type='avarageGrades'
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
