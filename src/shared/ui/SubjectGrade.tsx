import { GradeBadge } from "./GradeBadge/ui/GradeBadge";

type SubjectProps = {
    subject: string;
    grade: number | string;
};

export const SubjectGrade = ({ subject, grade }: SubjectProps) => {
    return (
        <div className="flex items-center justify-between px-3 py-4 w-full max-h-15 bg-white border border-gray-200 rounded-xl">
            <span className="font-semibold md:text-m">{subject}</span>
            <GradeBadge grade={grade} />
        </div>
    );
};
