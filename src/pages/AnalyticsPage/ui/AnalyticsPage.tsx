import { ChartLineLabel } from "@/shared/ui/Charts/LineChart";
import { ChartPieLabel } from "@/shared/ui/Charts/PieChart";
import { avarageGradeDynamicsChartData, pieChartData } from "../model/mock";

export function AnalyticsPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Аналитика</h2>
                <p className="page-subtitle">Подробная аналитика вашей успеваемости</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <ChartLineLabel chartData={avarageGradeDynamicsChartData} />
                <ChartPieLabel chartData={pieChartData} />
            </div>
        </section>
    );
}
