import { CurrentQuater } from "@/widgets/quaters-page/ui/CurrentQuater";
import { QuartersWidget } from "@/widgets/quaters-page/ui/QuartersWidget";
import { quartersData } from "@/widgets/quaters-page/ui/QuartersWidget/model/quartersData";
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
            <div className="grid grid-cols-1 gap-6">
                {quartersData.map((quarter) => (
                    <QuartersWidget key={quarter.id} quarter={quarter} />
                ))}
            </div>
        </section>
    );
}
