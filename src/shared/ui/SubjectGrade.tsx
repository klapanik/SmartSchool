import { GradeBadge } from "./GradeBadge/ui/GradeBadge";

type SubjectProps = {
    subject: string;
    grade: number | string;
    isApproximately?: boolean;
};

export const SubjectGrade = ({ subject, grade, isApproximately }: SubjectProps) => {
    return (
        <div className="flex items-center justify-between px-3 py-4 w-full max-h-15 bg-white border border-gray-200 rounded-xl">
            <span className="font-semibold md:text-m">{subject}</span>
            <GradeBadge
                grade={!grade && grade !== 0 ? "-" : isApproximately ? `~${grade}` : grade}
            />
        </div>
    );
};
