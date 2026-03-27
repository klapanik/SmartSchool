import { TrendingUp } from "lucide-react";

export function LatestGrades() {
    return (
        <div className="primary-block">
            <div className="flex flex-col items-center p-6 md:p-12">
                <div className="mb-6 self-start">
                    <h3 className="font-semibold text-lg mb-2">Последние оценки</h3>
                    <p className="text-[#6B7280]">Ваша успеваемость</p>
                </div>
                <div className="flex w-full max-w-sm min-w-0 flex-col items-center text-sm text-balance gap-0 text-muted-foreground">
                    <div className="mb-4 mx-auto">
                        <TrendingUp size={48} />
                    </div>
                    <p className="mb-0.5">Пока нет оценок</p>
                    <p>Начните добавлять свои оценки</p>
                </div>
            </div>
        </div>
    );
}
