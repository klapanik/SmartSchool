export type Subject = {
    name: string;
    grade: number | string;
    isApproximately: boolean;
};

export type Quarter = {
    quarterNumber?: number;
    averageGrade: number | string;
    isApproximately: boolean;
    period?: string;
};
