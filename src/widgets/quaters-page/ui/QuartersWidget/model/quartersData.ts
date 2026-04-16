import type { Quarter } from "./types";

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
