export type Schedule = {
    dayNumber: number;
    data?: string;
};

export type Subject = {
    name: string;
    grade?: number | string;
    time: string;
    number: number;
};
