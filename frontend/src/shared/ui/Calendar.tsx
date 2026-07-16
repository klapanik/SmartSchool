import type { CalendarDaysType } from "@/widgets/analytics-page/models";
import { CalendarDay } from "./CalendarDay";

type Props = {
    days: CalendarDaysType;
    month: string;
    className?: string;
};

export function Calendar({ days, month, className }: Props) {
    return (
        <div className={`text-center ${className}`}>
            <h3 className="text-muted-foreground mb-3">
                {month[0].toLocaleUpperCase() + month.slice(1).toLowerCase()}
            </h3>
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                    <CalendarDay
                        key={day.id}
                        status={day.status ?? ""}
                        dayNumber={day.dayNumber ?? 0}
                    />
                ))}
            </div>
        </div>
    );
}
