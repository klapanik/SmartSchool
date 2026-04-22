import { ChartLineLabel } from "@/shared/ui/Charts/LineChart";
import { avarageGradeDynamicsChartData } from "../model/mock";

export function AnalyticsPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Аналитика</h2>
                <p className="page-subtitle">Подробная аналитика вашей успеваемости</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <ChartLineLabel chartData={avarageGradeDynamicsChartData} />
            </div>
        </section>
    );
}
