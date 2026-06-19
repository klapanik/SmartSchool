import { Clock4 } from "lucide-react";
import { GradeBadge } from "./GradeBadge/ui/GradeBadge";
import { cn } from "@/lib/utils";

type Props = {
    subject: string;
    number: number;
    time: string;
    grade?: string | number;
    isCurrentLesson: boolean;
};

export function ScheduleLesson({ subject, number, time, grade, isCurrentLesson }: Props) {
    return (
        <div
            className={cn(
                "border rounded-xl border-gray-300 w-full flex px-6 py-4 justify-between items-center",
                { "bg-[#E6E1F5] border border-primary": isCurrentLesson },
            )}
        >
            <div className="flex gap-3.5">
                <div className="flex flex-col justify-center items-center leading-5">
                    <span className="font-semibold">{number}</span>
                    <span className="text-gray-500 text-sm">урок</span>
                </div>
                <div className="flex flex-col text-left leading-5">
                    <span className="font-semibold">{subject}</span>
                    <div className="flex items-center flex-wrap gap-y-1">
                        <Clock4 size={13} className="text-gray-500 mr-1" />
                        <span className="text-gray-500 text-sm mr-2">{time}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-5">
                {grade != null && <div className="w-min my-auto"><GradeBadge grade={grade} isApproximately={false} /></div>}
                {isCurrentLesson && (
                    <div className="bg-primary rounded px-2.5 py-1 text-white text-sm">
                        <span>Сейчас</span>
                    </div>
                )}
            </div>
        </div>
    );
}
