import { SubjectGrade } from "@/shared/ui/SubjectGrade";
import { CurrentQuater } from "@/widgets/quaters-page/ui/CurrentQuater";
import { QuartersBlock } from "@/widgets/quaters-page/ui/QuartersBlock";
import { q1, q2, q3, q4, subjects, year } from "@/widgets/quaters-page/ui/QuartersBlock/model/mock";
import { QuatersStatsGroup } from "@/widgets/quaters-page/ui/QuatersStatsGroup";

export function QuatersPage() {
    return (
        <section>
            <div className="mb-7">
                <h2 className="page-title">Четверти</h2>
                <p className="page-subtitle">Итоговые оценки по четвертям</p>
            </div>

            <CurrentQuater />
            <QuatersStatsGroup />

            <div className="flex flex-col gap-4">
                <QuartersBlock
                    quarterNumber={q1.quarterNumber}
                    averageGrade={q1.averageGrade}
                    isApproximately={q1.isApproximately}
                    period={q1.period}
                    subjectsList={subjects.map((s, i) => (
                        <SubjectGrade
                            key={i}
                            subject={s.name}
                            grade={s.grade}
                            isApproximately={s.isApproximately}
                        />
                    ))}
                />
                <QuartersBlock
                    quarterNumber={q2.quarterNumber}
                    averageGrade={q2.averageGrade}
                    isApproximately={q2.isApproximately}
                    period={q2.period}
                    subjectsList={subjects.map((s, i) => (
                        <SubjectGrade
                            key={i}
                            subject={s.name}
                            grade={s.grade}
                            isApproximately={s.isApproximately}
                        />
                    ))}
                />
                <QuartersBlock
                    quarterNumber={q3.quarterNumber}
                    averageGrade={q3.averageGrade}
                    isApproximately={q3.isApproximately}
                    period={q3.period}
                    subjectsList={subjects.map((s, i) => (
                        <SubjectGrade
                            key={i}
                            subject={s.name}
                            grade={s.grade}
                            isApproximately={s.isApproximately}
                        />
                    ))}
                />
                <QuartersBlock
                    quarterNumber={q4.quarterNumber}
                    averageGrade={q4.averageGrade}
                    isApproximately={q4.isApproximately}
                    period={q4.period}
                    subjectsList={subjects.map((s, i) => (
                        <SubjectGrade
                            key={i}
                            subject={s.name}
                            grade={s.grade}
                            isApproximately={s.isApproximately}
                        />
                    ))}
                />
                <QuartersBlock
                    averageGrade={year.averageGrade}
                    isApproximately={year.isApproximately}
                    subjectsList={subjects.map((s, i) => (
                        <SubjectGrade
                            key={i}
                            subject={s.name}
                            grade={s.grade}
                            isApproximately={s.isApproximately}
                        />
                    ))}
                />
            </div>
        </section>
    );
}
