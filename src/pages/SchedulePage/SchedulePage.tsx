import { DatePicker } from "@/features/DatePicker/DatePicker";
import {
    d0,
    d1,
    d2,
    d3,
    d4,
    d5,
    subjects,
} from "@/widgets/schedule-page/ui/ScheduleBlock/model/scheduleMock";
import { ScheduleBlock } from "@/widgets/schedule-page/ui/ScheduleBlock";

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
            <div className="flex flex-col gap-4">
                <ScheduleBlock schedule={d0} subjects={subjects} />
                <ScheduleBlock schedule={d1} subjects={subjects} />
                <ScheduleBlock schedule={d2} subjects={subjects} />
                <ScheduleBlock schedule={d3} subjects={subjects} />
                <ScheduleBlock schedule={d4} subjects={subjects} />
                <ScheduleBlock schedule={d5} subjects={subjects} />
            </div>
        </section>
    );
}
