export interface QuarterGrade {
    id: string | number;
    subject: string;
    grade: string;
    isApproximately?: boolean;
}

export interface QuarterData {
    quarter_id: string | number;
    average_grade: string | number;
    quarter_grades: QuarterGrade[];
}

export interface Grade {
    id: string | number;
    grade: string;
    comment: string;
    date: string;
    subject: string;
    teacher: string;
}

export interface AverageGrade {
    subject: string;
    average: string | number;
}
