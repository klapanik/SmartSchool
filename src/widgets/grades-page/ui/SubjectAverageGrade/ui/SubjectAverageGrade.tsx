import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import { subjects } from "../model/averageMock";

export function SubjectAverageGrade() {
    return (
        <div className="primary-block flex flex-col gap-5 ">
            <h2 className="text-2xl text-black font-semibold">Средний балл по предметам</h2>
            <div className="grid grid-cols-1 gap-2  @min-[720px]:grid-cols-2 @min-[800px]:grid-cols-3">
                {subjects.map((s, i) => (
                    <SubjectGrade
                        key={i}
                        subject={s.name}
                        grade={s.average}
                        date={s.date}
                        gradesNumber={s.gradesNumber}
                    />
                ))}
            </div>
        </div>
    );
}
