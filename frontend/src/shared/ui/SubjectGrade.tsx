import { GradeBadge } from "./GradeBadge/ui/GradeBadge";

type Props = {
    subject: string;
    grade: number | string;
    isApproximately?: boolean;
    date?: string;
    gradesNumber?: number;
};

export function SubjectGrade({ subject, grade, isApproximately, date, gradesNumber }: Props) {
    return (
        <div className="flex items-center justify-between px-3 py-4 w-full max-h-15 border border-gray-200 rounded-xl">
            <div className="flex flex-col">
                <span className="font-semibold md:text-m">{subject}</span>
                <span className="text-sm text-gray-400">
                    {!grade && grade === 0
                        ? "Нет оценок"
                        : isApproximately
                          ? `Примерная: ${grade}`
                          : date
                            ? date
                            : gradesNumber || gradesNumber === 0
                              ? `${gradesNumber} оценок`
                              : ""}
                </span>
            </div>
            <GradeBadge
                grade={!grade && grade === 0 ? "-" : grade}
                isApproximately={!!isApproximately}
            />
        </div>
    );
}
