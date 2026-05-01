import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyTodaysSchedule({ type }: { type: "main" | "secondary" }) {
    return (
        <div className="primary-block">
            <Empty className="md:p-0 p-0">
                <EmptyHeader className="self-start text-start items-start gap-0">
                    <EmptyTitle>Расписание на сегодня</EmptyTitle>
                    <EmptyDescription>суббота, 21 февраля</EmptyDescription>
                </EmptyHeader>

                <EmptyContent className="gap-0 text-muted-foreground">
                    <div className="mb-4 mx-auto">
                        <Calendar size={48} />
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
