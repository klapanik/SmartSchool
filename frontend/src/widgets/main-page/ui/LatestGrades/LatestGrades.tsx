import { TrendingUp } from "lucide-react";

export function LatestGrades() {
    return (
        <div className="flex flex-col items-center primary-block">
            <div className="mb-6 self-start">
                <h3 className="font-semibold text-lg">Последние оценки</h3>
                <p className="text-muted-foreground text-sm">Ваша успеваемость</p>
            </div>
            <div className="flex w-full flex-col items-center text-muted-foreground my-auto">
                <div className="mb-4 mx-auto">
                    <TrendingUp size={48} />
                </div>
                <p>Пока нет оценок</p>
                <p>Начните добавлять свои оценки</p>
            </div>
        </div>
    );
}
