import type { Schedule, Subject } from "./types";

export const subjects: Subject[] = [
    {
        number: 1,
        name: "Белорусский язык",
        time: "9:00 - 9:45",
        grade: "8/10",
    },
    {
        number: 2,
        name: "Белорусская литература",
        time: "10:00 - 10:45",
        grade: 9,
    },
    {
        number: 3,
        name: "Математика",
        time: "11:00 - 11:45",
        grade: 10,
    },
    {
        number: 4,
        name: "Русский язык",
        time: "12:00 - 12:45",
    },
    {
        number: 5,
        name: "География",
        time: "13:00 - 13:45",
    },
    {
        number: 6,
        name: "Физкультура",
        time: "13:55 - 14:40",
    },
];

export const scheduleData: Schedule[] = [
    {
        dayNumber: 0,
        data: "вторник, 24 февраля",
    },
    {
        dayNumber: 1,
    },
    {
        dayNumber: 2,
    },
    {
        dayNumber: 3,
    },
    {
        dayNumber: 4,
    },
    {
        dayNumber: 5,
    },
];

export const [d0, d1, d2, d3, d4, d5] = scheduleData;
