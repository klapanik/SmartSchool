import { getBadgeStyles } from "../models/getBadgeStyles";

type Props = {
    grade: string | number;
    isApproximately: boolean;
};

export function GradeBadge({ grade, isApproximately }: Props) {
    const backStyles = getBadgeStyles(grade, isApproximately);
    return (
        <div
            className={`min-w-7 rounded-full border flex justify-center items-center px-2 ${backStyles}`}
        >
            <span className="text-sm font-semibold">
                {isApproximately && grade !== "-" ? `~${grade}` : grade}
            </span>
        </div>
    );
}
