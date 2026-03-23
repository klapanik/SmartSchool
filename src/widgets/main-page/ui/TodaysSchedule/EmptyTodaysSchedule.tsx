import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyTodaysSchedule() {
    return (
        <div className="primary-block">
            <Empty>
                <EmptyHeader className="self-start text-start items-start">
                    <EmptyTitle>Расписание на сегодня</EmptyTitle>
                    <EmptyDescription>суббота, 21 февраля</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="mb-4 mx-auto">
                        <EmptyMedia variant="icon">
                            <Calendar />
                        </EmptyMedia>
                    </div>
                    <h4 className="text-base mb-0.5 text-muted-foreground">Сегодня уроков нет</h4>
                    <p className="text-sm text-muted-foreground">Отличный день для отдыха!</p>
                </EmptyContent>
                <EmptyDescription>
                    <Link
                        style={{ textDecoration: "none" }}
                        to="/schedule"
                        className="bg-primary px-4 py-2 rounded-lg text-white transition-colors duration-300 hover:bg-white hover:text-primary"
                    >
                        Перейти в расписание
                    </Link>
                </EmptyDescription>
            </Empty>
        </div>
    );
}
