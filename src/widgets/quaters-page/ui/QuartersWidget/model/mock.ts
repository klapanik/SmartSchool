import type { Subject } from "./types";
import type { Quarter } from "./types";

export const subjects: Subject[] = [
    {
        name: "Белорусский язык",
        grade: 9,
        isApproximately: false,
    },
    {
        name: "Математика",
        grade: 8,
        isApproximately: true,
    },
    {
        name: "История Беларуси",
        grade: "",
        isApproximately: false,
    },
    {
        name: "Физика",
        grade: 3,
        isApproximately: true,
    },
    {
        name: "Обществознание",
        grade: 6,
        isApproximately: true,
    },
];

const quartersData: Quarter[] = [
    {
        quarterNumber: 1,
        averageGrade: 9.13,
        isApproximately: false,
    },
    {
        quarterNumber: 2,
        averageGrade: 9.56,
        isApproximately: false,
    },
    {
        quarterNumber: 3,
        averageGrade: 0,
        isApproximately: false,
    },
    {
        quarterNumber: 4,
        averageGrade: 0,
        isApproximately: false,
    },
    {
        averageGrade: "9.3",
        isApproximately: true,
    },
];

export const [q1, q2, q3, q4, year] = quartersData;
