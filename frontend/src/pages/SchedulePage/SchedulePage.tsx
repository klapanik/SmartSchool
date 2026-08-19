import { Skeleton } from "@/components/ui/skeleton";
import { useScheduleQuery } from "@/entities/schedule/api/query";
import { DatePicker } from "@/features/DatePicker/DatePicker";
import { EmptyTodaysSchedule } from "@/shared/ui/EmptyTodaysSchedule";
import { ScheduleBlock } from "@/widgets/schedule-page/ui/ScheduleBlock";

export function SchedulePage() {
    const { data, isLoading, isError, error } = useScheduleQuery();

    const dayNumber = new Date().getDay();

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
                {dayNumber === 6 || dayNumber === 7 ? <EmptyTodaysSchedule type="secondary" /> : null}
                
                {isError ? (
                    <div className="primary-block flex gap-1 text-lg">
                        <span>Ошибка в расписании!</span>
                        <span>
                            <i>{String(error)}</i>
                        </span>
                    </div>
                ) : !data || isLoading ? (
                    <>
                        <Skeleton className="w-full h-60 bg-primary" />
                        <Skeleton className="w-full h-60 bg-primary" />
                        <Skeleton className="w-full h-60 bg-primary" />
                        <Skeleton className="w-full h-60 bg-primary" />
                        <Skeleton className="w-full h-60 bg-primary" />
                    </>
                ) : (
                    <>
                        <ScheduleBlock data={data.monday} />
                        <ScheduleBlock data={data.tuesday} />
                        <ScheduleBlock data={data.wednesday} />
                        <ScheduleBlock data={data.thursday} />
                        <ScheduleBlock data={data.friday} />
                    </>
                )}
            </div>
        </section>
    );
}
