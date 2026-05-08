import { StatsCard } from "@/shared/ui/StatsCard";
import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import { CalendarDays, TrendingUp } from "lucide-react";

export default function GradesStatsGroup() {
    return (
        <div className="my-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mb-5">
                <StatsCard
                    title="Общий средний балл"
                    icon={TrendingUp}
                    number={9.23}
                    subtext="Из 10 оценок"
                    iconClassName="text-gray-500"
                />
                <StatsCard
                    title="Всего оценок"
                    icon={TrendingUp}
                    number={10}
                    subtext="всего оценок"
                    iconClassName="text-gray-500"
                />
                <StatsCard
                    title="Предметов"
                    icon={CalendarDays}
                    number={16}
                    subtext="Активных предметов"
                    iconClassName="text-gray-500"
                />
            </div>

            <div className="flex flex-col primary-block gap-5">
                <h3 className="font-bold">История оценок</h3>
                <SubjectGrade
                    subject="Русский язык"
                    grade={10}
                    isApproximately={false}
                    date={"тут дата"}
                />
                <SubjectGrade
                    subject="Математика"
                    grade={8}
                    isApproximately={false}
                    date={"тут дата"}
                />

                <SubjectGrade
                    subject="Белорусский язык"
                    grade={7}
                    isApproximately={false}
                    date={"тут дата"}
                />
            </div>
        </div>
    );
}
