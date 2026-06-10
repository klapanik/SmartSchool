import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import type { Quarter, Subject } from "../model/types";

type Props = {
    quarter: Quarter;
    subjects: Subject[];
};
export const QuartersBlock = ({ quarter, subjects }: Props) => {
    const { quarterNumber, averageGrade, isApproximately, period } = quarter;

    return (
        <div className="flex flex-col primary-block gap-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800">
                        {quarterNumber ? `${quarterNumber} Четверть 2025-2026` : "Годовая оценка"}
                    </h2>
                    <span className="text-sm text-gray-500 mt-1">{period ? period : null}</span>
                </div>
                <div className="flex flex-col text-right">
                    <p className="text-lg font-bold ">
                        {isApproximately ? `~${averageGrade}` : averageGrade}
                    </p>
                    <span className="text-gray-500">Средний балл</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 @min-[720px]:grid-cols-2 @min-[800px]:grid-cols-3">
                {subjects.map((s, i) => (
                    <SubjectGrade
                        key={i}
                        subject={s.name}
                        grade={s.grade}
                        isApproximately={s.isApproximately}
                    />
                ))}
            </div>
        </div>
    );
};
