type Subject = {
    name: string;
    grade: number | string;
};

export type Quarter = {
    id: string;
    title: string;
    period?: string;
    subjects: Subject[];
    averageGrade: number | string;
    isApproximately: boolean;
};
