import { ScheduleLesson } from "@/shared/ui/ScheduleLesson";
import type { Schedule, Subject } from "../model/types";

import { Calendar } from "lucide-react";

type Props = {
    schedule: Schedule;
    subjects: Subject[];
};
export function ScheduleBlock({ schedule, subjects }: Props) {
    const { dayNumber, data } = schedule;
    return (
        <div>
            <div>
                {dayNumber === 0 ? (
                    <div>
                        <Calendar />
                        <h2>Расписание на сегодня</h2>
                        <span>{data}</span>
                    </div>
                ) : dayNumber === 1 ? (
                    <h2>"Понедельник"</h2>
                ) : dayNumber === 2 ? (
                    <h2>"Вторник"</h2>
                ) : dayNumber === 3 ? (
                    <h2>"Среда"</h2>
                ) : dayNumber === 4 ? (
                    <h2>"Четверг"</h2>
                ) : (
                    <h2>"Пятница"</h2>
                )}
                {dayNumber === 0 ? null : <span>{subjects.length} уроков</span>}
            </div>
            <div>
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
        </div>
    );
}
