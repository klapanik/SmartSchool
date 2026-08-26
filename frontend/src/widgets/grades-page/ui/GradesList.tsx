import type { Grade } from "@/entities/grades/model/types";
import { SubjectGrade } from "@/shared/ui/SubjectGrade";

export function GradesList({ grades }: { grades: Grade[] }) {
    return (
        <div className="flex flex-col primary-block gap-3">
            <h3 className="font-semibold text-xl">История оценок</h3>

            {grades.map((grade) => {
                const date = new Date(grade.date);

                const formattedDate = new Intl.DateTimeFormat("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }).format(date);

                return (
                    <SubjectGrade
                        key={grade.id}
                        subject={grade.subject}
                        grade={grade.grade}
                        isApproximately={false}
                        date={formattedDate}
                        comment={grade.comment}
                    />
                );
            })}
        </div>
    );
}
