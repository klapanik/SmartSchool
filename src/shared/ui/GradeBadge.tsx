type Props = {
    grade: number | string;
};
export function GradeBadge({ grade }: Props) {
    return (
        <div className="w-7 bg-primary rounded-full flex justify-center items-center">
            <span className="text-white text-sm font-semibold">{grade}</span>
        </div>
    );
}
