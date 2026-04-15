import { GradeBadge } from "./GradeBadge/ui/GradeBadge";

type SubjectProps = {
    subject: string;
    grade: number | string;
    isApproximately?: boolean;
};

export const SubjectGrade = ({ subject, grade, isApproximately }: SubjectProps) => {
    return (
        <div className="flex items-center justify-between px-3 py-4 w-full max-h-15 bg-white border border-gray-200 rounded-xl">
            <div className="flex flex-col">
                <span className="font-semibold md:text-m">{subject}</span>
                {!grade && grade !== 0 ? (
                    <span className="text-sm text-gray-400">Нет оценок</span>
                ) : (
                    isApproximately && (
                        <span className="text-sm text-gray-400">Примерная: {grade}</span>
                    )
                )}
            </div>
            <GradeBadge
                grade={!grade && grade !== 0 ? "-" : isApproximately ? `~${grade}` : grade}
            />
        </div>
    );
};
