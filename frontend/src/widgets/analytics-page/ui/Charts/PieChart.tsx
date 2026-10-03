import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    chartData: { grade: number; percent: number }[];
};

const chartConfig = {
    percent: {
        label: "Процент от общего количества оценок",
    },
} satisfies ChartConfig;

export function ChartPieLabel({ chartData }: Props) {
    const updatedChartData = chartData.map((grade) => ({
        grade: grade.grade,
        percent: grade.percent,
        fill: `var(--chart-${11 - grade.grade})`,
    }));

    console.log(updatedChartData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Распределение оценок</CardTitle>
                <CardDescription>Процентное соотношение оценок</CardDescription>
            </CardHeader>
            <CardContent className="selection:text-white">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto [&_.recharts-pie-label-text]:fill-muted-foreground"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="min-w-70"
                                    nameKey="percent"
                                    hideLabel
                                />
                            }
                        />
                        <Pie
                            isAnimationActive={false}
                            data={updatedChartData}
                            dataKey="percent"
                            nameKey="grade"
                            label={({ value, name }) => `${name} (${value}%)`}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
