import { PersonalData } from "./PersonalData";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatsCards } from "./ProfileStatsCards";

export function Profile() {
    return (
        <section className="rounded-md p-5">
            <ProfileHeader />
            <div className="flex flex-col gap-4">
                <ProfileStatsCards />
                <div className="bg-smoky-white w-full h-[1px]"></div>
                <PersonalData />
            </div>
        </section>
    );
}
