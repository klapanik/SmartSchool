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
        label: "% от всего",
    },
} satisfies ChartConfig;

export function ChartPieLabel({ chartData }: Props) {
    return (
        <Card className="border-0">
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
                                    className="bg-white **:text-black"
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
