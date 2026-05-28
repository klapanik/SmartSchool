import { GradesList } from "@/widgets/grades-page/ui/GradesList";
import GradesStatsGroup from "@/widgets/grades-page/ui/GradesStatsGroup";
import { ScrollTopArrow } from "@/widgets/grades-page/ui/ScrollTopArrow";
import { SubjectAverageGrade } from "@/widgets/grades-page/ui/SubjectAverageGrade";

export function GradesPage() {
    return (
        <section className="@container">
            <div className="mb-7">
                <h2 className="page-title">Оценки</h2>
                <p className="page-subtitle">Управление вашими оценками</p>
            </div>

            <GradesStatsGroup />
            <SubjectAverageGrade />
            <GradesList />
            <ScrollTopArrow />
        </section>
    );
}
