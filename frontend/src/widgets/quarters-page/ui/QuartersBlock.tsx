import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import type { QuarterGrade } from "@/entities/grades/model/types";

type Props = {
    number: string | number;
    average: string | number;
    starts_at: string;
    ends_at: string;
    quarterGrades: QuarterGrade[];
};

export const QuartersBlock = ({ number, average, starts_at, ends_at, quarterGrades }: Props) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [sYear, sMonth, sDay] = starts_at.split("-");
    const startDate = new Date(Number(sYear), Number(sMonth) - 1, Number(sDay));

    const [eYear, eMonth, eDay] = ends_at.split("-");
    const endDate = new Date(Number(eYear), Number(eMonth) - 1, Number(eDay));

    const isQuarterRunning = today >= startDate && today <= endDate;

    const formattedStartDate = startDate.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedEndDate = endDate.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex flex-col primary-block gap-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800">{number} четверть</h2>
                    <span className="text-sm text-gray-500 mt-1">
                        {formattedStartDate} - {formattedEndDate}
                    </span>
                </div>
                <div className="flex flex-col text-right">
                    <p className="text-lg font-bold ">
                        {isQuarterRunning ? `~${average}` : average}
                    </p>
                    <span className="text-gray-500">Средний балл</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 @min-[720px]:grid-cols-2 @min-[800px]:grid-cols-3">
                {quarterGrades.map((grade: QuarterGrade) => (
                    <SubjectGrade
                        key={grade.id}
                        subject={grade.subject}
                        grade={grade.grade}
                        isApproximately={grade.isApproximately ?? false}
                    />
                ))}
            </div>
        </div>
    );
};
