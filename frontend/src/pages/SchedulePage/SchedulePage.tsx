import { DatePicker } from "@/features/DatePicker/DatePicker";
import { ScheduleBlock } from "@/widgets/schedule-page/ui/ScheduleBlock";
import { subjects } from "@/widgets/schedule-page/ui/ScheduleBlock/model/scheduleMock";

export function SchedulePage() {
    return (
        <section>
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <h2 className="page-title">Расписание</h2>
                    <p className="page-subtitle">Управление расписанием уроков</p>
                </div>
                <DatePicker />
            </div>
            <div className="flex flex-col gap-4">
                <ScheduleBlock dayNumber={0} data="вторник, 24 февраля" subjects={subjects} />
                <ScheduleBlock dayNumber={1} subjects={subjects} />
                <ScheduleBlock dayNumber={2} subjects={subjects} />
                <ScheduleBlock dayNumber={3} subjects={subjects} />
                <ScheduleBlock dayNumber={4} subjects={subjects} />
                <ScheduleBlock dayNumber={5} subjects={subjects} />
            </div>
        </section>
    );
}
