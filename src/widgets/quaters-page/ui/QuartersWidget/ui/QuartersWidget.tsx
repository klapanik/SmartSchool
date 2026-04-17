import type { ReactNode } from "react";

type QuartersProps = {
    quarterNumber?: number;
    averageGrade: number | string;
    isApproximately: boolean;
    period?: string;
    subjectsList: ReactNode;
};
export const QuartersWidget = ({
    quarterNumber,
    averageGrade,
    isApproximately,
    period,
    subjectsList,
}: QuartersProps) => {
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {subjectsList}
            </div>
        </div>
    );
};
