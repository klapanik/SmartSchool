import { GradeBadge } from "./GradeBadge/ui/GradeBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    subject: string;
    grade: number | string;
    isApproximately?: boolean;
    date?: string;
    gradesNumber?: number;
    comment?: string;
};

export function SubjectGrade({
    subject,
    grade,
    isApproximately,
    date,
    gradesNumber,
    comment,
}: Props) {
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

            <div className="flex gap-2">
                <div className="my-auto">
                    <GradeBadge
                        grade={!grade && grade === 0 ? "-" : grade}
                        isApproximately={!!isApproximately}
                    />
                </div>

                {comment ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="text-primary cursor-pointer duration-200 hover:text-primary/70">Комментарий учителя</div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{comment}</p>
                        </TooltipContent>
                    </Tooltip>
                ) : null}
            </div>
        </div>
    );
}
