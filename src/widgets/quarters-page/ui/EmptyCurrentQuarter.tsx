import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyHeader,
    EmptyTitle,
    EmptyMedia,
    EmptyDescription,
} from "@/components/ui/empty";
import { CalendarDays } from "lucide-react";

export function EmptyCurrentQuarter() {
    return (
        <Empty className="md:p-0 p-0 gap-3">
            <EmptyHeader className="max-w-none w-full flex-row justify-between">
                <div className="flex gap-1">
                    <EmptyMedia className="my-auto">
                        <CalendarDays className="size-5" />
                    </EmptyMedia>

                    <EmptyTitle>Сейчас каникулы!</EmptyTitle>
                </div>

                <EmptyDescription className="text-muted-foreground hidden sm:inline">
                    Четверть не активна
                </EmptyDescription>
            </EmptyHeader>

            <EmptyContent className="max-w-none pl-5 text-muted-foreground text-start text-wrap items-start gap-0 md:text-base">
                <p>
                    В настоящее время учебный процесс приостановлен. Информация о новой четверти
                    появится после начала занятий. В свободное время рекомендуем ознакомиться с
                    заданной на лето литературой:
                </p>
                <Button variant="link" className="px-0 underline cursor-pointer">
                    Литература на лето
                </Button>
            </EmptyContent>
        </Empty>
    );
}
