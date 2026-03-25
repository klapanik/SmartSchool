import { CurrentQuater } from "@/widgets/quaters-page/CurrentQuater";

export function QuatersPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Четверти</h2>
                <p className="page-subtitle">Итоговые оценки по четвертям</p>
            </div>

            <CurrentQuater />
        </section>
    );
}
