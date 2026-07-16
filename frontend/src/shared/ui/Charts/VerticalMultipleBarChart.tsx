import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

type Props = {
    chartData: { subject: string; usersGrade: number; secondGrade: number }[];
    title: string;
    subtitle: string;
};

export function VerticalMultipleBarChart({ title, subtitle, chartData }: Props) {
    return (
        <Card className="border-0">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: -20,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <YAxis
                            dataKey="usersGrade"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            domain={[0, 10]}
                        />
                        <XAxis
                            dataKey="subject"
                            tickLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <Bar
                            isAnimationActive={false}
                            dataKey="usersGrade"
                            fill="var(--chart-1)"
                            radius={[10, 10, 0, 0]}
                        >
                            <LabelList
                                dataKey="usersGrade"
                                position="insideTop"
                                offset={8}
                                className="min-[1100px]:fill-muted fill-smoky-black"
                                fontSize={10}
                            />
                        </Bar>
                        <Bar
                            isAnimationActive={false}
                            dataKey="secondGrade"
                            fill="var(--chart-4)"
                            radius={[10, 10, 0, 0]}
                        >
                            <LabelList
                                dataKey="secondGrade"
                                position="insideTop"
                                offset={8}
                                className="min-[1100px]:fill-muted fill-smoky-black"
                                fontSize={10}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
