import { CurrentQuater } from "@/widgets/quaters-page/CurrentQuater";

export function QuatersPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="font-bold text-2xl sm:text-3xl">Четверти</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Итоговые оценки по четвертям</p>
            </div>
            
            <CurrentQuater />
        </section>
    );
}
