import type { Quarter } from "../model/types";
import { SubjectGrade } from "@/shared/ui/SubjectGrade";

export const QuartersWidget = (quarter: Quarter) => {
    return (
        <div className="flex flex-col gap-6 bg-smoky-white p-4 rounded-lg">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800">{quarter.title}</h2>
                    {quarter.period && (
                        <span className="text-sm text-gray-500 mt-1">{quarter.period}</span>
                    )}
                </div>
                <div className="flex flex-col">
                    <p className="text-lg font-bold text-right">{quarter.averageGrade}</p>
                    <span className="text-gray-500">Средний балл</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {quarter.subjects.map((sub, index) => (
                    <SubjectGrade key={index} subject={sub.name} grade={sub.grade} />
                ))}
            </div>
        </div>
    );
};
