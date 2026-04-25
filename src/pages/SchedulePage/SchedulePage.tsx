import { DatePicker } from "@/features/DatePicker/DatePicker";

export function SchedulePage() {
    return (
        <section>
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h2 className="page-title">Расписание</h2>
                    <p className="page-subtitle">Управление расписанием уроков</p>
                </div>
                <DatePicker />
            </div>
        </section>
    );
}
