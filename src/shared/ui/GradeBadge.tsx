type Props = {
    grade: number | string;
};
export function GradeBadge({ grade }: Props) {
    return (
        <div className="min-w-7 bg-primary rounded-full flex justify-center items-center px-2">
            <span className="text-white text-sm font-semibold">{grade}</span>
        </div>
    );
}
