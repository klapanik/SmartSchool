import { DatePicker } from "@/features/DatePicker/DatePicker";

export function SchedulePage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Расписание</h2>
                <p className="page-subtitle">Управление расписанием уроков</p>
            </div>
            <DatePicker></DatePicker>
        </section>
    );
}
