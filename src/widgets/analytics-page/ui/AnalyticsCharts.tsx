import { ChartPieLabel } from "@/shared/ui/Charts/PieChart";
import { avarageGradeDynamicsChartData, pieChartData } from "../models/mock";
import { ChartLineLabel } from "@/shared/ui/Charts/LineChart";

export function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-2 gap-5">
            <ChartLineLabel chartData={avarageGradeDynamicsChartData} />
            <ChartPieLabel chartData={pieChartData} />
        </div>
    );
}
