import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

type Props = {
    chartData: {
        subject: string;
        users_grade: number;
        class_grade?: number;
        last_grade?: number;
    }[];
    title: string;
    subtitle: string;
};

export function VerticalMultipleBarChart({ title, subtitle, chartData }: Props) {
    return (
        <Card>
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
                            dataKey="users_grade"
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
                            dataKey="users_grade"
                            fill="var(--chart-1)"
                            radius={[10, 10, 0, 0]}
                        >
                            <LabelList
                                dataKey="users_grade"
                                position="insideTop"
                                offset={8}
                                className="min-[1100px]:fill-muted fill-smoky-black"
                                fontSize={10}
                            />
                        </Bar>
                        <Bar
                            isAnimationActive={false}
                            dataKey="class_grade"
                            fill="var(--chart-4)"
                            radius={[10, 10, 0, 0]}
                        >
                            <LabelList
                                dataKey="class_grade"
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
