import { CalendarDays } from "lucide-react";

export function CurrentQuarter() {
    return (
        <>
            <div className="flex gap-2 mb-4 sm:mb-5">
                <CalendarDays className="my-auto size-4.5 sm:size-5" />
                <h2 className="font-bold text-lg md:text-xl">Текущая четверть</h2>
            </div>

            <div className="flex justify-between">
                <div>
                    <p className="text-sm sm:text-base md:text-lg font-semibold">3 четверть 2025-2026</p>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">7 января - 22 марта 2026</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-base sm:text-lg md:text-xl">0</p>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Средний балл</p>
                </div>
            </div>
        </>
    );
}
