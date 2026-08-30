import { ProfileStatsCard } from "@/shared/ui/ProfileStatsCard";
import { BookOpen, TrendingUp, Trophy } from "lucide-react";

type Props = {
    subjectsCount: string | number;
    averageGrade: number;
};

export function ProfileStatsCards({ subjectsCount, averageGrade }: Props) {
    return (
        <div className="grid grid-cols-3 gap-2.5 ">
            <ProfileStatsCard icon={TrendingUp} number={averageGrade} title="средний" />
            <ProfileStatsCard icon={Trophy} number={1} title="место" />
            <ProfileStatsCard icon={BookOpen} number={subjectsCount} title="предметов" />
        </div>
    );
}
