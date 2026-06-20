import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatsCards } from "./ProfileStatsCards";

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
