type Props = {
    grade: number | string;
};

const getBadgeStyles = (grade: string | number) => {
    if (!grade || grade === "-") {
        return "bg-white border-gray-200 text-gray-400";
    }

    const gradeStr = String(grade);
    const isEstimated = gradeStr.startsWith("~");
    const numericGrade = parseInt(gradeStr.replace("~", ""), 10);

    if (!isEstimated) {
        return "bg-primary text-white";
    }

    if (numericGrade >= 9) return "bg-green-50 text-green-700 border-green-200";
    if (numericGrade >= 7) return "bg-blue-50 text-blue-700 border-blue-200";
    if (numericGrade >= 5) return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-red-50 text-red-700 border-red-200";
};

export function GradeBadge({ grade }: Props) {
    const backStyles = getBadgeStyles(grade);
    return (
        <div
            className={`min-w-7 rounded-full border flex justify-center items-center px-2 ${backStyles}`}
        >
            <span className="text-sm font-semibold">{grade}</span>
        </div>
    );
}
