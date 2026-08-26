import { Link } from "react-router-dom";

import type { Grade } from "@/entities/grades/model/types";
import type { Schedule } from "@/entities/schedule/model/type";

import { ScheduleLesson } from "./ScheduleLesson";
import { EmptySchedule } from "./EmptySchedule";

import { Button } from "@/components/ui/button";

type Props = {
    data: Schedule;
    isLinkNeeded?: boolean;
    grades: Grade[];
};

export function ScheduleBlock({ data, isLinkNeeded = false, grades }: Props) {
    const { russianName, isToday, schedule } = data;

    if (schedule.length === 0) return <EmptySchedule weekday={russianName} />;

    const date = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
    }).format(new Date());

    const currentTime = new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });

    function timeToMinutes(timeStr: string) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
    }

    return (
        <div className="primary-block flex flex-col gap-5">
            <div className="w-full px-3 flex justify-between items-center">
                <h2 className="text-xl text-black font-semibold leading-5">{russianName}</h2>

                <div className="flex gap-5">
                    {isToday && (
                        <div className="bg-primary rounded px-2.5 py-1 text-white text-sm">
                            <span>Сегодня, {date}</span>
                        </div>
                    )}

                    <span className="text-gray-600">{schedule.length} уроков</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {schedule.map((lesson, i) => {
                    const isCurrentLesson =
                        timeToMinutes(String(currentTime)) >= timeToMinutes(lesson.starts_at) &&
                        timeToMinutes(String(currentTime)) <= timeToMinutes(lesson.ends_at) &&
                        isToday;

                    const lessonsGrade = grades.filter((grade) => {
                        const day = new Date(grade.date).getDay();
                        const weekdayGradeNumber = day === 0 ? 7 : day;

                        return (
                            grade.subject === lesson.subject &&
                            weekdayGradeNumber === lesson.weekday
                        );
                    })[0];

                    return (
                        <ScheduleLesson
                            key={i}
                            number={lesson.lesson_number}
                            subject={lesson.subject}
                            startsAt={lesson.starts_at}
                            endsAt={lesson.ends_at}
                            grade={lessonsGrade?.grade}
                            classroom={lesson.classroom}
                            isCurrentLesson={isCurrentLesson}
                        />
                    );
                })}
            </div>

            {isLinkNeeded ? (
                <Button type="button" className="mx-auto px-4 py-2 duration-300">
                    <Link to="/schedule" className="text-white font-normal">
                        Перейти в расписание
                    </Link>
                </Button>
            ) : null}
        </div>
    );
}
