export interface QuarterGrade {
    id: string | number,
    subject: string,
    grade: string,
}

export interface QuarterData {
    quarter_id: string | number,
    average_grade: string | number,
    quarter_grades: QuarterGrade[]
}