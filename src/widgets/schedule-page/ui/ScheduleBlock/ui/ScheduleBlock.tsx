import { ScheduleLesson } from "@/shared/ui/ScheduleLesson";
import type { Subject } from "../model/types";

import { Calendar } from "lucide-react";
import { EmptyTodaysSchedule } from "@/shared/ui/EmptyTodaysSchedule";

type Props = {
    dayNumber: number;
    data?: string;
    subjects: Subject[];
};
export function ScheduleBlock({ dayNumber, data, subjects }: Props) {
    return (
        <div className="primary-block flex flex-col gap-5">
            <div className="flex flex-row gap-2 justify-between items-start">
                {dayNumber === 0 ? (
                    <div className="flex flex-row gap-2 items-start">
                        <Calendar size={20} />
                        <div className="flex flex-col items-start">
                            <h2 className="text-xl text-black font-bold mb-2 leading-5">
                                Расписание на сегодня
                            </h2>
                            <span className="text-gray-600">{data}</span>
                        </div>
                    </div>
                ) : dayNumber === 1 ? (
                    <h2 className="text-xl text-black font-bold">Понедельник</h2>
                ) : dayNumber === 2 ? (
                    <h2 className="text-xl text-black font-bold">Вторник</h2>
                ) : dayNumber === 3 ? (
                    <h2 className="text-xl text-black font-bold">Среда</h2>
                ) : dayNumber === 4 ? (
                    <h2 className="text-xl text-black font-bold">Четверг</h2>
                ) : (
                    <h2 className="text-xl text-black font-bold">Пятница</h2>
                )}
                {dayNumber === 0 ? null : (
                    <span className="text-gray-600">{subjects.length} уроков</span>
                )}
            </div>

            {dayNumber !== 0 ? (
                <div className="flex flex-col gap-3">
                    {subjects.map((s, i) => (
                        <ScheduleLesson
                            key={i}
                            number={s.number}
                            subject={s.name}
                            time={s.time}
                            grade={s.grade}
                        />
                    ))}
                </div>
            ) : subjects.length !== 0 ? (
                <div className="flex flex-col gap-3">
                    {subjects.map((s, i) => (
                        <ScheduleLesson
                            key={i}
                            number={s.number}
                            subject={s.name}
                            time={s.time}
                            grade={s.grade}
                        />
                    ))}
                </div>
            ) : (
                <EmptyTodaysSchedule type="secondary" />
            )}
        </div>
    );
}
