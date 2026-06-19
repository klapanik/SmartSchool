import { ProfileStatsCard } from "@/shared/ui/ProfileStatsCard";
import { BookOpen, TrendingUp, Trophy } from "lucide-react";

export function ProfileStatsCards() {
    return (
        <div className="grid grid-cols-3 gap-[10px] h-18 mt-5">
            <ProfileStatsCard icon={TrendingUp} number={9.47} title="средний" />
            <ProfileStatsCard icon={Trophy} number={76} title="оценок" />
            <ProfileStatsCard icon={BookOpen} number={13} title="предметов" />
        </div>
    );
}
