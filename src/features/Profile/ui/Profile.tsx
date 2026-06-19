import { ProfileStatsCards } from "@/widgets/AppHeader/ui/ProfileStatsCards";
import { ProfileHeader } from "./ProfileHeader";

export function Profile() {
  return (
    <section className="rounded-md">
      <ProfileHeader />
      <div className="px-5">
        <ProfileStatsCards />
      </div>
    </section>
  );
}
