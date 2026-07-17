import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    chartData: { grade: number; procent: number; fill: string }[];
};

const chartConfig = {
    procent: {
        label: "Процент от общего количества оценок",
    },
} satisfies ChartConfig;

export function ChartPieLabel({ chartData }: Props) {
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
                                    className="bg-white **:text-black min-w-70"
                                    nameKey="procent"
                                    hideLabel
                                />
                            }
                        />
                        <Pie
                            isAnimationActive={false}
                            data={chartData}
                            dataKey="procent"
                            nameKey="grade"
                            label={({ value, name }) => `${name} (${value}%)`}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
