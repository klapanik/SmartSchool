import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    chartData: { month: string; value?: number }[];
};

const chartConfig = {
    value: {
        label: "Балл:",
    },
} satisfies ChartConfig;

export function ChartLineLabel({ chartData }: Props) {
    return (
        <Card className="border-0">
            <CardHeader>
                <CardTitle>Динамика среднего балла</CardTitle>
                <CardDescription>Как менялась успеваемость по месяцам</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 25,
                            right: 12,
                            left: -20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickMargin={5}
                            tickFormatter={(value: string) => value.slice(0, 3)}
                        />
                        <YAxis
                            domain={[0, 10]}
                            dataKey="value"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent indicator="line" nameKey="value" />}
                        />
                        <Line
                            isAnimationActive={false}
                            dataKey="value"
                            stroke="var(--color-chart-1)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-chart-1)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList position="top" offset={12} fontSize={12} />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
