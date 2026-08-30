export interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    avatar: string | null;

    form: string;
    letter: string;

    parent_first_name: string | null;
    parent_last_name: string | null;

    class_teacher_first_name: string | null;
    class_teacher_last_name: string | null;
}

interface BestAndWorstGrade {
    grade: number;
    subject: string;
}

interface BestAndWorstSubject {
    subject: string;
    average_grade: number;
    last_average_grade?: number;
}

export interface Analytics {
    absence_count: number;

    best_grade: BestAndWorstGrade;
    worst_grade: BestAndWorstGrade;

    monthly_average: {
        month: string;
        average_grade: number;
    }[];

    grade_distribution: {
        grade: number;
        count: number;
        percent: number;
    }[];

    best_subjects: BestAndWorstSubject[];
    worst_subjects: BestAndWorstSubject[];

    subject_workload: {
        subject: string;
        grades_count: number;
    }[];

    comparison: {
        subject: string;
        users_grade: number;
        class_grade: number;
        last_grade?: number;
    }[];
}
