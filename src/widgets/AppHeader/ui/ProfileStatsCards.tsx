import { ProfileStatsCard } from "@/shared/ui/ProfileStatsCard";
import { BookOpen, TrendingUp, Trophy } from "lucide-react";

export const ProfileStatsCards = () => {
  return (
    <div className="flex justify-between gap-[10px] h-15">
      <ProfileStatsCard icon={TrendingUp} number={9.47} title="средний" />
      <ProfileStatsCard icon={Trophy} number={76} title="оценок" />
      <ProfileStatsCard icon={BookOpen} number={13} title="предметов" />
    </div>
  );
};
