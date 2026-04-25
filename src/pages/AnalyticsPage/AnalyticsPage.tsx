import { AnalyticsCharts } from "@/widgets/analytics-page/ui/AnalyticsCharts";

export function AnalyticsPage() {
    return (
        <section className="@container">
            <div className="mb-7">
                <h2 className="page-title">Аналитика</h2>
                <p className="page-subtitle">Подробная аналитика вашей успеваемости</p>
            </div>

            <AnalyticsCharts />
        </section>
    );
}
