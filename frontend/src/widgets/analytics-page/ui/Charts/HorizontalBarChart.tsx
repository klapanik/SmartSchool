import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    chartData: { subject: string; averageGrade: number }[];
    title: string;
    subtitle: string;
    type: null | "averageGrades";
};

export function HorizontalBarChart({ title, subtitle, chartData, type }: Props) {
    const chartConfig = {
        averageGrade: {
            label: type === "averageGrades" ? "Средний балл" : "Количество оценок",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <XAxis
                            type="number"
                            dataKey="averageGrade"
                            axisLine={false}
                            tickLine={false}
                            domain={type === "averageGrades" ? [0, 10] : [0, 0]}
                        />
                        <YAxis
                            dataKey="subject"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className={` ${type === "averageGrades" ? "min-w-35" : "min-w-40"}`}
                                />
                            }
                        />
                        <Bar
                            isAnimationActive={false}
                            dataKey="averageGrade"
                            fill="var(--chart-1)"
                            radius={[0, 10, 10, 0]}
                        >
                            <LabelList
                                dataKey="averageGrade"
                                position="insideRight"
                                offset={8}
                                className="fill-muted"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
