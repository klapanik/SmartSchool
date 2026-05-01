export type CalendarDayStatusType = "none" | "weekend" | "absent" | "late" | "absentValid" | string;

export type CalendarDaysType = {
    id: number;
    dayNumber?: number;
    status?: CalendarDayStatusType;
}[];

export type MonthDataType = {
    id: number,
    month: string;
    days: CalendarDaysType;
};
