import { SubjectGrade } from "@/shared/ui/SubjectGrade";

export const GradesList = () => {
    return (
        <div className="flex flex-col primary-block gap-5">
            <h3 className="font-bold">История оценок</h3>
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
};
