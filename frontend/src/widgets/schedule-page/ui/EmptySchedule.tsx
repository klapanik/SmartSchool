import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { PencilRuler, TriangleAlert } from "lucide-react";

export function EmptySchedule({ weekday }: { weekday: string }) {
    return (
        <Empty className="primary-block">
            <EmptyHeader className="flex flex-row self-start text-start items-start gap-1">
                <EmptyMedia className="my-auto">
                    <TriangleAlert size={20} className="text-amber-600 dark:text-amber-400" />
                </EmptyMedia>
                <EmptyTitle className="text-xl">{weekday}</EmptyTitle>
            </EmptyHeader>

            <EmptyContent>
                <PencilRuler size={48} className="mb-4 mx-auto" />
                <h4 className="text-base mb-0.5">Расписание в процессе составления</h4>
            </EmptyContent>
        </Empty>
    );
}
