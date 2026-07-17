import { CurrentQuarter } from "@/widgets/quarters-page/ui/CurrentQuarter";
import { EmptyCurrentQuarter } from "@/widgets/quarters-page/ui/EmptyCurrentQuarter";
import { QuartersBlock } from "@/widgets/quarters-page/ui/QuartersBlock";
import {
    q1,
    q2,
    q3,
    q4,
    subjects,
    year,
} from "@/widgets/quarters-page/ui/QuartersBlock/model/mock";
import { QuartersStatsGroup } from "@/widgets/quarters-page/ui/QuartersStatsGroup";

export function QuartersPage() {
    const currentQuarter: { isOver: boolean } = { isOver: true };

    return (
        <section className="@container">
            <div className="mb-7">
                <h2 className="page-title">Четверти</h2>
                <p className="page-subtitle">Итоговые оценки по четвертям</p>
            </div>

            <div className="primary-block">
                {currentQuarter.isOver ? <EmptyCurrentQuarter /> : <CurrentQuarter />}
            </div>
            <QuartersStatsGroup />

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
