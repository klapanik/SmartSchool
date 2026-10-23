import { GradeBadge } from "@/shared/ui/GradeBadge";
import { GradeComment } from "./GradeComment";

type Props = {
    subject: string;
    grade: number | string;
    isApproximately?: boolean;
    date?: string;
    gNum?: string | number;
    comment?: string;
};

export function SubjectGrade({ subject, grade, isApproximately, date, gNum, comment }: Props) {
    const grade_word = gNum === 1 ? "оценка" : gNum === 2 || gNum === 3 || gNum === 4 ? 'оценки' : 'оценок';

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
                            : gNum || gNum === 0
                              ? `${gNum} ${grade_word}`
                              : ""}
                </span>
            </div>

            <div className="flex gap-2">
                <div className="my-auto">
                    <GradeBadge
                        grade={!grade && grade === 0 ? "-" : grade}
                        isApproximately={!!isApproximately}
                    />
                </div>

                {comment ? <GradeComment comment={comment} /> : null}
            </div>
        </div>
    );
}
