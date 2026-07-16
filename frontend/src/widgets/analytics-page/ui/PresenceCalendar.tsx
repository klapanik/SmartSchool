import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/shared/ui/Calendar";
import { CalendarDay } from "@/shared/ui/CalendarDay";

import type { MonthDataType } from "../models";

export function PresenceCalendar({ monthsData }: { monthsData: MonthDataType[] }) {
    return (
        <Card className="border-0 @container">
            <CardHeader>
                <CardTitle>Календарь посещаемости</CardTitle>
                <CardDescription>Визуальное отображение посещаемости</CardDescription>
            </CardHeader>
            <div className="my-auto">
                <CardContent className="grid px-10 mb-6 gap-5 @min-[320px]:px-19 @min-[380px]:grid-cols-2 @min-[380px]:px-10 @min-[558px]:grid-cols-3">
                    {monthsData.map((month) => (
                        <Calendar
                            key={month.id}
                            days={month.days}
                            month={month.month}
                            className={`${month.monthNumber === 1 ? "hidden @min-[558px]:block" : month.monthNumber === 2 ? "hidden @min-[380px]:block" : ""}`}
                        />
                    ))}
                </CardContent>
                <CardFooter className="flex gap-1.5 justify-between flex-wrap">
                    <div className="flex gap-1 items-center">
                        <CalendarDay />
                        <span>-</span>
                        <h4 className="text-sm min-[1050px]:text-base">Был</h4>
                    </div>

                    <div className="flex gap-1 items-center">
                        <CalendarDay status="late" />
                        <span>-</span>
                        <h4 className="text-sm min-[1050px]:text-base">Опоздал</h4>
                    </div>

                    <div className="flex gap-1 items-center">
                        <CalendarDay status="absentValid" />
                        <span>-</span>
                        <h4 className="text-sm min-[1050px]:text-base">
                            Не был по уважительной причине
                        </h4>
                    </div>

                    <div className="flex gap-1 items-center">
                        <CalendarDay status="absent" />
                        <span>-</span>
                        <h4 className="text-sm min-[1050px]:text-base">
                            Не был по неуважительной причине
                        </h4>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}
