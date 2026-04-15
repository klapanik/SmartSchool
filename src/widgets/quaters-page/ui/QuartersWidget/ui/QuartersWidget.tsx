import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import { q1, q2, q3, q4, year } from "../model/quartersData";
import { subjects } from "../model/mock";
export const QuartersWidget = () => {
    function renderSubjects() {
        return subjects.map((s, index) => {
            return (
                <SubjectGrade
                    key={index}
                    subject={s.name}
                    grade={s.grade}
                    isApproximately={s.isApproximately}
                />
            );
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col primary-block gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800">
                            {q1.quarterNumber
                                ? `${q1.quarterNumber} Четверть 2025-2026`
                                : "Годовая оценка"}
                        </h2>
                        <span className="text-sm text-gray-500 mt-1">
                            1 сентября - 1 ноября 2025
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="text-lg font-bold ">{q1.averageGrade}</p>
                        <span className="text-gray-500">Средний балл</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {renderSubjects()}
                </div>
            </div>

            <div className="flex flex-col primary-block gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800">
                            {q2.quarterNumber
                                ? `${q2.quarterNumber} Четверть 2025-2026`
                                : "Годовая оценка"}
                        </h2>
                        <span className="text-sm text-gray-500 mt-1">
                            9 ноября - 25 декабря 2025
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="text-lg font-bold ">{q2.averageGrade}</p>
                        <span className="text-gray-500">Средний балл</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {renderSubjects()}
                </div>
            </div>

            <div className="flex flex-col primary-block gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800">
                            {q3.quarterNumber
                                ? `${q3.quarterNumber} Четверть 2025-2026`
                                : "Годовая оценка"}
                        </h2>
                        <span className="text-sm text-gray-500 mt-1">7 января - 22 марта 2026</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="text-lg font-bold ">{q3.averageGrade}</p>
                        <span className="text-gray-500">Средний балл</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {renderSubjects()}
                </div>
            </div>

            <div className="flex flex-col primary-block gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800">
                            {q4.quarterNumber
                                ? `${q4.quarterNumber} Четверть 2025-2026`
                                : "Годовая оценка"}
                        </h2>
                        <span className="text-sm text-gray-500 mt-1">29 марта - 11 июня 2026</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="text-lg font-bold ">{q4.averageGrade}</p>
                        <span className="text-gray-500">Средний балл</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {renderSubjects()}
                </div>
            </div>

            <div className="flex flex-col primary-block gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800">
                            {year.quarterNumber
                                ? `${year.quarterNumber} Четверть 2025-2026`
                                : "Годовая оценка"}
                        </h2>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="text-lg font-bold ">{year.averageGrade}</p>
                        <span className="text-gray-500">Средний балл</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {renderSubjects()}
                </div>
            </div>
        </div>
    );
};
