import { AnalyticStatsGroup } from "@/widgets/analytics-page/ui/AnalyticsStatsGroup";
import { AnalyticsCharts } from "@/widgets/analytics-page/ui/AnalyticsCharts";

export function AnalyticsPage() {
    return (
        <section className="@container flex flex-col gap-7">
            <div>
                <h2 className="page-title">Аналитика</h2>
                <p className="page-subtitle">Подробная аналитика вашей успеваемости</p>
            </div>

            <AnalyticStatsGroup />
            <AnalyticsCharts />
        </section>
    );
}
