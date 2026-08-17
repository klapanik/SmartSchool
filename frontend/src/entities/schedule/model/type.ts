export interface Lesson {
    lesson_number: string | number;
    subject: string;
    starts_at: string;
    ends_at: string;
    classroom: string;
    grade: string | number | null;
}

export interface Schedule {
    russianName: string;
    isToday: boolean;
    schedule: Lesson[];
}

export interface ScheduleDay {
    monday: Schedule;
    tuesday: Schedule;
    wednesday: Schedule;
    thursday: Schedule;
    friday: Schedule;
    saturday: Schedule;
    sunday: Schedule;
}
