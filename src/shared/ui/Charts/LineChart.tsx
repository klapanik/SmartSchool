import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function ChartLineLabel() {
    const chartData = [
        { month: "" },
        { month: "Сентябрь", value: 8.2 },
        { month: "Октябрь", value: 8.5 },
        { month: "Ноябрь", value: 8.9 },
        { month: "Декабрь", value: 9.1 },
        { month: "Январь", value: 9.3 },
        { month: "Февраль", value: 9.9 },
        { month: "Март", value: 10.0 },
        { month: "Апрель", value: 9.8 },
        { month: "Май", value: 8.7 },
    ];

    return (
        <Card className="border-0">
            <CardHeader>
                <CardTitle>Динамика среднего балла</CardTitle>
                <CardDescription>Как менялась успеваемость по месяцам</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickMargin={5}
                            tickFormatter={(value: string) => value.slice(0, 3)}
                        />
                        <YAxis dataKey="value" tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    className="bg-white"
                                    // formatter={(month, value) => (
                                    //     <span className="text-primary">
                                    // ?       В месяце {month} средний балл составил {value}
                                    //     </span>
                                    // )}
                                />
                            }
                        />
                        <Line
                            isAnimationActive={false}
                            dataKey="value"
                            // ? type="natural"
                            stroke="var(--color-primary)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-primary)",
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
