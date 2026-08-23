import type { Grade } from "@/entities/grades/model/types";
import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import { TrendingUp } from "lucide-react";

export function LatestGrades({ latestGrades }: { latestGrades?: Grade[] }) {
    return (
        <div className="primary-block flex flex-col items-center">
            <div className="mb-6 self-start">
                <h3 className="font-semibold text-lg">Последние оценки</h3>
                <p className="text-muted-foreground text-sm">Оценки за последнюю неделю</p>
            </div>
            {latestGrades && latestGrades.length ? (
                <div className="w-full flex flex-col gap-3">
                    {latestGrades.map((grade) => {
                        const date = new Date(grade.created_at);

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
            ) : (
                <div className="flex w-full flex-col items-center text-muted-foreground my-auto">
                    <div className="mb-4 mx-auto">
                        <TrendingUp size={48} />
                    </div>
                    <p>Пока нет оценок за последнюю неделю</p>
                </div>
            )}
        </div>
    );
}
