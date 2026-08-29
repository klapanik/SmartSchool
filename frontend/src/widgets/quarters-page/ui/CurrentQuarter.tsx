import { CalendarDays } from "lucide-react";

type Props = {
    number: number | string;
    starts_at: string;
    ends_at: string;
    average: number | string;
};

export function CurrentQuarter({ number, starts_at, ends_at, average }: Props) {
    const [sYear, sMonth, sDay] = starts_at.split("-");
    const [eYear, eMonth, eDay] = ends_at.split("-");

    const startDate = new Date(
        Number(sYear),
        Number(sMonth) - 1,
        Number(sDay),
    ).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const endDate = new Date(
        Number(eYear),
        Number(eMonth) - 1,
        Number(eDay),
    ).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <>
            <div className="flex gap-2 mb-4 sm:mb-5">
                <CalendarDays className="my-auto size-4.5 sm:size-5" />
                <h2 className="font-bold text-lg md:text-xl">Текущая четверть</h2>
            </div>

            <div className="flex justify-between">
                <div>
                    <p className="text-sm sm:text-base md:text-lg font-semibold">
                        {number} четверть{" "}
                        {sYear === eYear ? sYear : sYear + "-" + eYear}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        {startDate} - {endDate}
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-base sm:text-lg md:text-xl">{average}</p>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        Средний балл
                    </p>
                </div>
            </div>
        </>
    );
}
