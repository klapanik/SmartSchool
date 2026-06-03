import { GradesFilters } from "@/widgets/grades-page/ui/GradesFilters";
import { GradesList } from "@/widgets/grades-page/ui/GradesList";
import GradesStatsGroup from "@/widgets/grades-page/ui/GradesStatsGroup";
import { ScrollTopArrow } from "@/widgets/grades-page/ui/ScrollTopArrow";

export function GradesPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Оценки</h2>
                <p className="page-subtitle">Управление вашими оценками</p>
            </div>

            <GradesStatsGroup />
            <GradesFilters />
            <GradesList />
            <ScrollTopArrow />
        </section>
    );
}
