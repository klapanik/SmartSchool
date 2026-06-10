import { Empty, EmptyContent, EmptyHeader, EmptyTitle, EmptyMedia } from "@/components/ui/empty";
import { CalendarDays, Cloud, Flame } from "lucide-react";

export function EmptyCurrentQuarter() {
    return (
        <Empty className="md:p-0 p-0">
            <EmptyHeader className="flex flex-row gap-1">
                <EmptyMedia className="my-auto">
                    <CalendarDays className="size-6 sm:size-7" />
                </EmptyMedia>

                <EmptyTitle className="text-2xl">Каникулы!</EmptyTitle>
            </EmptyHeader>

            <EmptyContent className="flex-row max-w-lg">
                <EmptyMedia className="cursor-pointer text-chart-10">
                    <Flame size={48} />
                </EmptyMedia>
                <div>
                    <h4 className="text-base mb-0.5">
                        Учебных дней пока что нет, отдыхайте!
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Но на каникулах помните про правила безопасности!
                    </p>
                </div>
                <EmptyMedia className="cursor-pointer text-chart-7">
                    <Cloud size={48} />
                </EmptyMedia>
            </EmptyContent>
        </Empty>
    );
}
