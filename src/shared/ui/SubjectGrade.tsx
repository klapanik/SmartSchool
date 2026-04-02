import { GradeBadge } from "./GradeBadge";

type SubjectProps = {
    subject: string;
    mark: number;
};

export const SubjectGrade = ({ subject, mark }: SubjectProps) => {
    return (
        <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl">
            <span className="font-semibold">{subject}</span>
            <GradeBadge mark={mark} />
        </div>
    );
};
