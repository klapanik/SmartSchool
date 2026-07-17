import { Clock4 } from "lucide-react";
import { GradeBadge } from "./GradeBadge/ui/GradeBadge";

type Props = {
    subject: string;
    number: number;
    time: string;
    grade?: string | number;
};

export function ScheduleLesson({ subject, number, time, grade }: Props) {
    return (
        <div className="border rounded-xl border-gray-300 w-full flex px-6 py-4 justify-between items-center">
            <div className="flex gap-3.5">
                <div className="flex flex-col justify-center items-center leading-5">
                    <span className="font-semibold">{number}</span>
                    <span className="text-gray-500 text-sm">урок</span>
                </div>
                <div className="flex flex-col text-left leading-5">
                    <span className="font-semibold">{subject}</span>
                    <div className="flex items-center">
                        <Clock4 size={13} className="text-gray-500 mr-1" />
                        <span className="text-gray-500 text-sm">{time}</span>
                    </div>
                </div>
            </div>

            {grade != null && <GradeBadge grade={grade} isApproximately={false} />}
        </div>
    );
}
