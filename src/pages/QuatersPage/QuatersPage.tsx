import { CurrentQuater } from "@/widgets/quaters-page/ui/CurrentQuater";
import { QuartersBlock } from "@/widgets/quaters-page/ui/QuartersBlock";
import { q1, q2, q3, q4, subjects, year } from "@/widgets/quaters-page/ui/QuartersBlock/model/mock";
import { QuatersStatsGroup } from "@/widgets/quaters-page/ui/QuatersStatsGroup";

export function QuatersPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Четверти</h2>
                <p className="page-subtitle">Итоговые оценки по четвертям</p>
            </div>

            <CurrentQuater />
            <QuatersStatsGroup />

            <div className="flex flex-col gap-4">
                <QuartersBlock quarter={q1} subjects={subjects} />
                <QuartersBlock quarter={q2} subjects={subjects} />
                <QuartersBlock quarter={q3} subjects={subjects} />
                <QuartersBlock quarter={q4} subjects={subjects} />
                <QuartersBlock quarter={year} subjects={subjects} />
            </div>
        </section>
    );
}
