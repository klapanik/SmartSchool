import "./Hero.css";
import { useCurrentUserQuery } from "@/entities/user/api/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Dot } from "lucide-react";

import type { Lesson } from "@/entities/schedule/model/type";

export function Hero({ todaysSchedule }: { todaysSchedule?: Lesson[] }) {
    const { data: userData, isLoading } = useCurrentUserQuery();

    const date = new Intl.DateTimeFormat("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(new Date());

    function getLessonsCondition() {
        if (!todaysSchedule) return "Сегодня нет уроков";

        const lastLesson = todaysSchedule[todaysSchedule.length - 1];

        if (!lastLesson) return "Сегодня нет уроков";

        const [endHours, endMinutes] = lastLesson.ends_at.split(":").map(Number);
        const lessonEndInMinutes = endHours * 60 + endMinutes;

        const todayInMinutes = new Date().getHours() * 60 + new Date().getMinutes();
        const isLessonsRunning = lessonEndInMinutes > todayInMinutes;

        if (isLessonsRunning) {
            return (
                <>
                    <p>Сейчас идут уроки</p>
                    <Dot className="animate-pulse absolute -top-0.5 -right-5" />
                </>
            );
        } else {
            return "Уроки закончились";
        }
    }

    return (
        <section
            className="rounded-lg p-6 w-full flex justify-between transition-all duration-500 cursor-pointer
                shadow-[0_4px_20px_-2px_#7c3aed3f] hover:shadow-[0_4px_20px_-2px_#7c3aed88] flex-col @lg:flex-row"
        >
            <div>
                <div className="font-bold text-lg xs:text-xl md:text-2xl flex">
                    <span className="mr-1">Добро пожаловать,</span>
                    <span className="cursor-pointer flowtext my-auto">
                        {isLoading || !userData ? (
                            <Skeleton className="h-5 w-48 my-auto bg-primary" />
                        ) : (
                            userData.first_name
                        )}
                    </span>
                    <span>!</span>
                </div>
                <div className="text-gray-500 text-sm md:text-base flex">
                    {isLoading || !userData ? (
                        <Skeleton className="h-4 w-6 rounded-full my-auto bg-primary" />
                    ) : (
                        userData.form + userData.letter
                    )}
                    <span className="ml-1">класс</span>
                </div>
            </div>

            <div className="text-sm md:text-base self-end">
                <p className="text-gray-500">{date}</p>
                <div className="relative flex">{getLessonsCondition()}</div>
            </div>
        </section>
    );
}
