import type { AverageGrade } from "@/entities/grades/model/types";
import { SubjectGrade } from "@/shared/ui/SubjectGrade";

export function SubjectAverageGrade({ averageGrades }: { averageGrades: AverageGrade[] }) {
    return (
        <div className="primary-block flex flex-col gap-5 ">
            <h2 className="text-2xl text-black font-semibold">Средний балл по предметам</h2>
            <div className="grid grid-cols-1 gap-2 @min-[720px]:grid-cols-2 @min-[800px]:grid-cols-3">
                {averageGrades.map((g, i) => {
                    return (
                        <SubjectGrade
                            key={i}
                            subject={g.subject}
                            grade={g.average}
                            gNum={g.grades_count}
                        />
                    );
                })}
            </div>
        </div>
    );
}
