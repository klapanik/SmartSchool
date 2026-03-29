type Props = {
    mark: number;
};
export function GradeBadge({ mark }: Props) {
    return (
        <div className="w-7 bg-primary rounded-full flex justify-center">
            <span className="text-white text-sm font-semibold">{mark}</span>
        </div>
    );
}
