import { Clock4, Dot } from "lucide-react";
import { GradeBadge } from "@/shared/ui/GradeBadge/ui/GradeBadge";
import { cn } from "@/lib/utils";

type Props = {
    number: string | number;
    subject: string;
    startsAt: string;
    endsAt: string;
    grade?: string | number | null;
    classroom: string;
    isCurrentLesson: boolean;
};

export function ScheduleLesson({
    number,
    subject,
    startsAt,
    endsAt,
    grade,
    classroom,
    isCurrentLesson,
}: Props) {
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
                        <span className="text-gray-500 text-sm mr-2">
                            {startsAt.substring(0, 5)} - {endsAt.substring(0, 5)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-5">
                {grade != null && (
                    <div className="w-min my-auto">
                        <GradeBadge grade={grade} isApproximately={false} />
                    </div>
                )}
                {isCurrentLesson && (
                    <div className="flex bg-primary rounded-full pl-2.5 pr-0.5 pt-1 text-white text-sm">
                        <span>Идёт сейчас</span>
                        <Dot className="animate-pulse" />
                    </div>
                )}
                <div className="text-black bg-muted px-4 py-1 rounded-full text-sm my-auto border border-gray-300">
                    Кабинет: <span className="font-semibold">{classroom}</span>
                </div>
            </div>
        </div>
    );
}
