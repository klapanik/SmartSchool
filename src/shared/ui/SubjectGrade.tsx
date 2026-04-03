import { GradeBadge } from "./GradeBadge";

type SubjectProps = {
    subject: string;
    grade: number | string;
};

export const SubjectGrade = ({ subject, grade }: SubjectProps) => {
    return (
        <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl">
            <span className="font-semibold">{subject}</span>
            <GradeBadge grade={grade} />
        </div>
    );
};
