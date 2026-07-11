import type { CalendarDayStatusType } from "@/widgets/analytics-page/models";

type Props = {
    dayNumber?: number;
    status?: CalendarDayStatusType;
};

const statusStyles: Record<CalendarDayStatusType, string> = {
    none: "invisible opacity-0",
    weekend: "bg-smoky-white text-muted-foreground",
    absent: "bg-destructive text-white",
    late: "bg-chart-3 text-white",
    absentValid: "bg-smoky-destructive text-white",
    present: "bg-primary text-white",
};

export function CalendarDay({ dayNumber, status = "" }: Props) {
    return (
        <div
            className={`size-5 @min-[560px]:size-5.5 text-center flex justify-center rounded-full ${
                status ? statusStyles[status] : "bg-primary text-white"
            }`}
        >
            <p className="my-auto text-xs">{dayNumber}</p>
        </div>
    );
}
