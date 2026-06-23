import { PersonalData } from "./PersonalData";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatsCards } from "./ProfileStatsCards";

export function Profile() {
    return (
        <section className="rounded-md">
            <ProfileHeader />
            <div className="p-5 flex flex-col gap-4">
                <ProfileStatsCards />
                <div className="bg-smoky-white w-full h-[1px]"></div>
                <PersonalData />
            </div>
        </section>
    );
}
