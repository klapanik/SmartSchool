import { getBadgeStyles } from "../models/getBadgeStyles";

type Props = {
    grade: string | number;
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
