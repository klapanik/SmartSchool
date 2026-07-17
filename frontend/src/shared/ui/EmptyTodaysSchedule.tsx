import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Calendar, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyTodaysSchedule({ type }: { type: "main" | "secondary" }) {
    return (
        <div className="primary-block">
            <Empty>
                <EmptyHeader className="self-start text-start items-start gap-0">
                    <div className="flex gap-1">
                        <EmptyMedia className="my-auto">
                            <Calendar size={20} />
                        </EmptyMedia>
                        <EmptyTitle className="text-xl">Расписание на сегодня</EmptyTitle>
                    </div>
                    <EmptyDescription>суббота, 21 февраля</EmptyDescription>
                </EmptyHeader>

                <EmptyContent>
                    <div className="mb-4 mx-auto">
                        <CalendarDays size={48} />
                    </div>
                    <h4 className="text-base mb-0.5">Сегодня уроков нет</h4>
                    <p className="text-sm">Отличный день для отдыха!</p>
                </EmptyContent>

                {type === "main" ? (
                    <Link
                        to="/schedule"
                        className="bg-primary px-4 py-2 rounded-lg text-white transition-colors duration-300 hover:bg-white hover:text-primary"
                    >
                        Перейти в расписание
                    </Link>
                ) : null}
            </Empty>
        </div>
    );
}
