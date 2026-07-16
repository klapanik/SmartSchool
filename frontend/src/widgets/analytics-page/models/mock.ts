export const averageGradeDynamicsChartData = [
    { month: "" },
    { month: "Сентябрь", value: 8.2 },
    { month: "Октябрь", value: 8.5 },
    { month: "Ноябрь", value: 8.9 },
    { month: "Декабрь", value: 9.1 },
    { month: "Январь", value: 9.3 },
    { month: "Февраль", value: 9.9 },
    { month: "Март", value: 10.0 },
    { month: "Апрель", value: 9.8 },
    { month: "Май", value: 8.7 },
];

export const pieChartData = [
    { grade: 10, procent: 25, fill: "var(--chart-1)" },
    { grade: 9, procent: 21, fill: "var(--chart-2)" },
    { grade: 8, procent: 15, fill: "var(--chart-3)" },
    { grade: 7, procent: 12, fill: "var(--chart-4)" },
    { grade: 6, procent: 8, fill: "var(--chart-5)" },
    { grade: 5, procent: 5, fill: "var(--chart-6)" },
    { grade: 4, procent: 4, fill: "var(--chart-7)" },
    { grade: 3, procent: 7, fill: "var(--chart-8)" },
    { grade: 2, procent: 2, fill: "var(--chart-9)" },
    { grade: 1, procent: 1, fill: "var(--chart-10)" },
];

export const bestSubjectsChartData = [
    { subject: "География", averageGrade: 10.0 },
    { subject: "Английский язык", averageGrade: 9.9 },
    { subject: "Математика", averageGrade: 9.8 },
    { subject: "Биология", averageGrade: 9.1 },
    { subject: "Русский язык", averageGrade: 8.3 },
    { subject: "Физика", averageGrade: 8.2 },
    { subject: "Белорусский язык", averageGrade: 7.8 },
];

export const worstSubjectsChartData = [
    { subject: "Белорусская литература", averageGrade: 5.4 },
    { subject: "История Беларуси", averageGrade: 6.3 },
    { subject: "Всемирная история", averageGrade: 6.4 },
    { subject: "Информатика", averageGrade: 7.1 },
    { subject: "Астрономия", averageGrade: 7.3 },
    { subject: "Трудовое обучение", averageGrade: 7.4 },
    { subject: "Физическая культура", averageGrade: 7.7 },
];

export const workloadChartData = [
    { subject: "Английский язык", averageGrade: 32 },
    { subject: "Математика", averageGrade: 25 },
    { subject: "Русский язык", averageGrade: 21 },
    { subject: "Физика", averageGrade: 13 },
    { subject: "Информатика", averageGrade: 10 },
    { subject: "Белорусский язык", averageGrade: 6 },
    { subject: "Биология", averageGrade: 3 },
];

export const comparisonWithClassChartData = [
    { subject: "География", usersGrade: 10.0, secondGrade: 8.3 },
    { subject: "Английский язык", usersGrade: 9.9, secondGrade: 7.8 },
    { subject: "Математика", usersGrade: 9.8, secondGrade: 7.3 },
    { subject: "Биология", usersGrade: 9.1, secondGrade: 8.4 },
    { subject: "Русский язык", usersGrade: 8.3, secondGrade: 7.2 },
    { subject: "Физика", usersGrade: 8.2, secondGrade: 5.9 },
    { subject: "Белорусский язык", usersGrade: 7.8, secondGrade: 6.1 },
];

export const comparisonWithPastChartData = [
    { subject: "География", usersGrade: 10.0, secondGrade: 8.3 },
    { subject: "Химия", usersGrade: 7.2, secondGrade: 8.1 },
    { subject: "Русский язык", usersGrade: 5.7, secondGrade: 8.7 },
    { subject: "Математика", usersGrade: 6.8, secondGrade: 7.8 },
    { subject: "Физика", usersGrade: 6.0, secondGrade: 5.6 },
];

export const monthsData = [
    {
        id: 1,
        month: "декабрь",
        monthNumber: 1,
        days: [
            { id: 1, status: "none" },
            { id: 2, status: "none" },
            { id: 3, dayNumber: 1 },
            { id: 4, dayNumber: 2, status: "late" },
            { id: 5, dayNumber: 3, status: "absentValid" },
            { id: 6, dayNumber: 4, status: "weekend" },
            { id: 7, dayNumber: 5, status: "weekend" },
            { id: 8, dayNumber: 6 },
            { id: 9, dayNumber: 7 },

            { id: 10, dayNumber: 8 },
            { id: 11, dayNumber: 9, status: "late" },
            { id: 12, dayNumber: 10, status: "late" },
            { id: 13, dayNumber: 11, status: "weekend" },
            { id: 14, dayNumber: 12, status: "weekend" },
            { id: 15, dayNumber: 13, status: "absent" },
            { id: 16, dayNumber: 14, status: "absent" },

            { id: 17, dayNumber: 15 },
            { id: 18, dayNumber: 16 },
            { id: 19, dayNumber: 17, status: "absentValid" },
            { id: 20, dayNumber: 18, status: "weekend" },
            { id: 21, dayNumber: 19, status: "weekend" },
            { id: 22, dayNumber: 20, status: "late" },
            { id: 23, dayNumber: 21, status: "late" },

            { id: 24, dayNumber: 22 },
            { id: 25, dayNumber: 23, status: "late" },
            { id: 26, dayNumber: 24, status: "late" },
            { id: 27, dayNumber: 25, status: "weekend" },
            { id: 28, dayNumber: 26, status: "weekend" },
            { id: 29, dayNumber: 27 },
            { id: 30, dayNumber: 28, status: "absentValid" },

            { id: 31, dayNumber: 29, status: "absentValid" },
            { id: 32, dayNumber: 30, status: "absentValid" },
        ],
    },
    {
        id: 2,
        month: "январь",
        monthNumber: 2,
        days: [
            { id: 1, status: "none" },
            { id: 2, status: "none" },
            { id: 3, status: "none" },

            { id: 4, dayNumber: 1 },
            { id: 5, dayNumber: 2 },
            { id: 6, dayNumber: 3, status: "weekend" },
            { id: 7, dayNumber: 4, status: "weekend" },
            { id: 8, dayNumber: 5, status: "late" },
            { id: 9, dayNumber: 6 },
            { id: 10, dayNumber: 7 },

            { id: 11, dayNumber: 8 },
            { id: 12, dayNumber: 9 },
            { id: 13, dayNumber: 10, status: "weekend" },
            { id: 14, dayNumber: 11, status: "weekend" },
            { id: 15, dayNumber: 12, status: "absentValid" },
            { id: 16, dayNumber: 13 },
            { id: 17, dayNumber: 14, status: "late" },

            { id: 18, dayNumber: 15 },
            { id: 19, dayNumber: 16 },
            { id: 20, dayNumber: 17, status: "weekend" },
            { id: 21, dayNumber: 18, status: "weekend" },
            { id: 22, dayNumber: 19 },
            { id: 23, dayNumber: 20, status: "absent" },
            { id: 24, dayNumber: 21 },

            { id: 25, dayNumber: 22 },
            { id: 26, dayNumber: 23 },
            { id: 27, dayNumber: 24, status: "weekend" },
            { id: 28, dayNumber: 25, status: "weekend" },
            { id: 29, dayNumber: 26, status: "late" },
            { id: 30, dayNumber: 27 },
            { id: 31, dayNumber: 28 },

            { id: 32, dayNumber: 29 },
            { id: 33, dayNumber: 30 },
            { id: 34, dayNumber: 31, status: "weekend" },
        ],
    },
    {
        id: 3,
        month: "февраль",
        monthNumber: 3,
        days: [
            { id: 1, status: "none" },

            { id: 2, dayNumber: 1 },
            { id: 3, dayNumber: 2 },
            { id: 4, dayNumber: 3 },
            { id: 5, dayNumber: 4 },
            { id: 6, dayNumber: 5, status: "weekend" },
            { id: 7, dayNumber: 6, status: "weekend" },
            { id: 8, dayNumber: 7 },

            { id: 9, dayNumber: 8 },
            { id: 10, dayNumber: 9 },
            { id: 11, dayNumber: 10 },
            { id: 12, dayNumber: 11 },
            { id: 13, dayNumber: 12, status: "weekend" },
            { id: 14, dayNumber: 13, status: "weekend" },
            { id: 15, dayNumber: 14 },

            { id: 16, dayNumber: 15 },
            { id: 17, dayNumber: 16 },
            { id: 18, dayNumber: 17 },
            { id: 19, dayNumber: 18, status: "weekend" },
            { id: 20, dayNumber: 19, status: "weekend" },
            { id: 21, dayNumber: 20, status: "weekend" },
            { id: 22, dayNumber: 21, status: "weekend" },

            { id: 23, dayNumber: 22, status: "weekend" },
            { id: 24, dayNumber: 23, status: "weekend" },
            { id: 25, dayNumber: 24, status: "weekend" },
            { id: 26, dayNumber: 25, status: "weekend" },
            { id: 27, dayNumber: 26, status: "weekend" },
            { id: 28, dayNumber: 27, status: "weekend" },
            { id: 29, dayNumber: 28, status: "weekend" },
        ],
    },
];
