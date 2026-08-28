import type { AverageGrade } from "@/entities/grades/model/types";
import { SubjectGrade } from "@/shared/ui/SubjectGrade";

export function SubjectAverageGrade({ averageGrades }: { averageGrades: AverageGrade[] }) {
    return (
        <div className="primary-block flex flex-col gap-5 ">
            <h2 className="text-2xl text-black font-semibold">Средний балл по предметам</h2>
            <div className="grid grid-cols-1 gap-2 @min-[720px]:grid-cols-2 @min-[800px]:grid-cols-3">
                {averageGrades.map((g, i) => {
                    const gradesNumber = averageGrades.filter(
                        (grade) => grade.subject === g.subject,
                    ).length;

                    return (
                        <SubjectGrade
                            key={i}
                            subject={g.subject}
                            grade={g.average}
                            gradesNumber={gradesNumber}
                        />
                    );
                })}
            </div>
        </div>
    );
}
