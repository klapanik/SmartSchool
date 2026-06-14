import { Empty, EmptyContent, EmptyHeader, EmptyTitle, EmptyMedia } from "@/components/ui/empty";
import { CalendarDays } from "lucide-react";

export function EmptyCurrentQuarter() {
    return (
        <Empty className="md:p-0 p-0">
            <EmptyHeader className="gap-1 flex-row">
                <EmptyMedia className="my-auto">
                    <CalendarDays className="size-7 sm:size-6" />
                </EmptyMedia>

                <EmptyTitle className="text-2xl">Каникулы!</EmptyTitle>
            </EmptyHeader>

            <EmptyContent className="flex-row max-w-lg">
                <div>
                    <h4 className="text-base mb-0.5">
                        Учебных дней пока что нет, отдыхайте!
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Но на каникулах помните про правила безопасности!
                    </p>
                </div>
            </EmptyContent>
        </Empty>
    );
}
