export const getBadgeStyles = (grade: string | number, isApproximately: boolean) => {
    if ((!grade && grade !== 0) || grade === "-") {
        return "bg-white border-gray-200 text-gray-400";
    }

    if (!isApproximately) {
        return "bg-primary text-white";
    }

    if (Number(grade) >= 9) return "bg-[#DFF0EC] border-[#BCEADC]";
    if (Number(grade) >= 7) return "bg-[#DEE5F4] border-[#B8CBF2]";
    if (Number(grade) >= 5) return "bg-[#EFF0DF] border-[#F2FABD]";
    return "bg-[#F4DEDE] border-[#EABEBC]";
};
