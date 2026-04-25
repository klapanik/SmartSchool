import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

type Props = {
    chartData: { subject: string; usersGrade: number; secondGrade: number }[];
    title: string;
    subtitle: string;
};

export function HorizontalMultipleBarChart({ title, subtitle, chartData }: Props) {
    return (
        <Card className="border-0">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={{}}>
                    <BarChart accessibilityLayer data={chartData} layout="vertical">
                        <CartesianGrid horizontal={false} />

                        <XAxis
                            type="number"
                            dataKey="usersGrade"
                            domain={[0, 10]}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="subject"
                            tickFormatter={(value) => value.slice(0, 4)}
                            tickLine={false}
                            tickMargin={10}
                        />

                        <Bar
                            isAnimationActive={false}
                            dataKey="usersGrade"
                            fill="var(--chart-1)"
                            radius={[0, 10, 10, 0]}
                        >
                            <LabelList
                                dataKey="usersGrade"
                                position="insideRight"
                                className="fill-muted"
                                fontSize={10}
                            />
                        </Bar>

                        <Bar
                            isAnimationActive={false}
                            dataKey="secondGrade"
                            fill="var(--chart-4)"
                            radius={[0, 10, 10, 0]}
                        >
                            <LabelList
                                dataKey="secondGrade"
                                position="insideRight"
                                className="fill-muted"
                                fontSize={10}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
