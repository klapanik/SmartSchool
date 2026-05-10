import { SubjectGrade } from "@/shared/ui/SubjectGrade";

export function GradesList() {
    return (
        <div className="flex flex-col primary-block gap-4">
            <h3 className="font-semibold text-xl">История оценок</h3>
            <SubjectGrade
                subject="Русский язык"
                grade={10}
                isApproximately={false}
                date={"тут дата"}
            />
            <SubjectGrade
                subject="Математика"
                grade={8}
                isApproximately={false}
                date={"тут дата"}
            />

            <SubjectGrade
                subject="Белорусский язык"
                grade={7}
                isApproximately={false}
                date={"тут дата"}
            />
        </div>
    );
}
