export const getBadgeStyles = (grade: string | number) => {
    if ((!grade && grade !== 0) || grade === "-") {
        return "bg-white border-gray-200 text-gray-400";
    }

    const gradeStr = String(grade);
    const isEstimated = gradeStr.startsWith("~");
    const numericGrade = parseInt(gradeStr.replace("~", ""), 10);

    if (!isEstimated) {
        return "bg-primary text-white";
    }

    if (numericGrade >= 9) return "bg-[#DFF0EC] border-[#BCEADC]";
    if (numericGrade >= 7) return "bg-[#DEE5F4] border-[#B8CBF2]";
    if (numericGrade >= 5) return "bg-[#EFF0DF] border-[#F2FABD]";
    return "bg-[#F4DEDE] border-[#EABEBC]";
};
