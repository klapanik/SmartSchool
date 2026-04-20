import { DatePicker } from "@/features/DatePicker/DatePicker";

export function SchedulePage() {
    return (
        <section>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="page-title">Расписание</h2>
                <p className="page-subtitle">Управление расписанием уроков</p>
                <DatePicker />
            </div>
        </section>
    );
}
