import { ProfileStatsCard } from "@/shared/ui/ProfileStatsCard";
import { BookOpen, TrendingUp, Trophy } from "lucide-react";

type Props = {
    subjectsCount: string | number;
};

export function ProfileStatsCards({ subjectsCount }: Props) {
    return (
        <div className="grid grid-cols-3 gap-2.5 ">
            <ProfileStatsCard icon={TrendingUp} number={9.47} title="средний" />
            <ProfileStatsCard icon={Trophy} number={76} title="оценок" />
            <ProfileStatsCard icon={BookOpen} number={subjectsCount} title="предметов" />
        </div>
    );
}
