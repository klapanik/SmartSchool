import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    chartData: { subject: string; avarageGrade: number }[];
    title: string;
    subtitle: string;
    type: null | "avarageGrades";
};

export function HorizontalBarChart({ title, subtitle, chartData, type }: Props) {
    const chartConfig = {
        avarageGrade: {
            label: type === "avarageGrades" ? "Средний балл" : "Количество оценок",
        },
    } satisfies ChartConfig;

    return (
        <Card className="border-0">
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
                            dataKey="avarageGrade"
                            axisLine={false}
                            tickLine={false}
                            domain={type === "avarageGrades" ? [0, 10] : [0, 0]}
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
                                    className={`bg-white **:text-black ${type === "avarageGrades" ? 'min-w-35' : 'min-w-40'}`}
                                />
                            }
                        />
                        <Bar dataKey="avarageGrade" fill="var(--chart-1)" radius={[0, 10, 10, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
