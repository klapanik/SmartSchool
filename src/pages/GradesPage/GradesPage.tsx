import GradesStatsGroup from "@/widgets/grades-page/ui/GradesStatsGroup";
import { ScrollTopArrow } from "@/widgets/grade-page/ui/ScrollTopArrow";

export function GradesPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Оценки</h2>
                <p className="page-subtitle">Управление вашими оценками</p>
            </div>

            <GradesStatsGroup />
            <ScrollTopArrow />
        </section>
    );
}
