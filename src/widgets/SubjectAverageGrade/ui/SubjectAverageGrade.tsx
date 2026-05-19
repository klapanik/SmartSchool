import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import { subjects } from "../model/averageMock";

export function SubjectAverageGrade() {
    return (
        <div className="primary-block flex flex-col gap-5">
            <h2 className="text-2xl text-black font-semibold">Средний балл по предметам</h2>
            <div>
                {subjects.map((s, i) => (
                    <SubjectGrade
                        key={i}
                        subject={s.name}
                        grade={s.average}
                        data={s.data}
                        gradesNumber={s.gradesNumber}
                    />
                ))}
            </div>
        </div>
    );
}
