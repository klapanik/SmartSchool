interface ScheduleDay {
    lesson_number: string | number;
    subject: string;
    starts_at: string;
    ends_at: string;
    classroom: string;
    grade: string | number;
}

export interface Schedule {
    monday: ScheduleDay[];
    tuesday: ScheduleDay[];
    wednesday: ScheduleDay[];
    thursday: ScheduleDay[];
    friday: ScheduleDay[];
    saturday: ScheduleDay[];
    sunday: ScheduleDay[];
}
