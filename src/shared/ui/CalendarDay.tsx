import type { CalendarDayStatusType } from "@/widgets/analytics-page/models";

type Props = {
    dayNumber?: number;
    status?: CalendarDayStatusType;
};

export function CalendarDay({ dayNumber, status = "" }: Props) {
    return (
        <div
            className={`size-5 @min-[560px]:size-5.5 text-center flex justify-center rounded-full ${
                status === "none"
                    ? "invisible opacity-0"
                    : status === "weekend"
                      ? "bg-smoky-white text-muted-foreground"
                      : status === "absent"
                        ? "bg-destructive text-white"
                        : status === "late"
                          ? "bg-chart-3 text-white"
                          : status === "absentValid"
                            ? "bg-smoky-destructive text-white"
                            : "bg-primary text-white"
            }`}
        >
            <p className="my-auto text-xs">{dayNumber}</p>
        </div>
    );
}
