import { GraduationCap, PlusIcon, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";

type Props = {
    userFullName: string | React.ReactElement;
    userClass: string | React.ReactElement;
    avatar: string | null | undefined;
};

export function ProfileHeader({ userFullName, userClass, avatar }: Props) {
    return (
        <div className="flex bg-linear-to-r from-[#8141ED] to-[#9257ED] rounded-t-md p-5 text-white gap-3 mb-2.5">
            <Avatar className="border-3 border-[#B897F1]" size="lg">
                <AvatarImage src={avatar || ""} alt="SS" />
                <AvatarFallback>
                    <UserRound />
                </AvatarFallback>
                <AvatarBadge className="duration-150 hover:scale-110 hover:rotate-90">
                    <PlusIcon />
                </AvatarBadge>
            </Avatar>

            <div className="my-auto">
                <h3 className="mb-1.5 font-semibold">{userFullName}</h3>
                <div className="w-min font-semibold rounded-xl flex gap-1 text-xs bg-accent px-2.5 py-1 cursor-pointer">
                    <GraduationCap size={15} className="my-auto mr-0.5" />
                    <span>{userClass}</span>
                    <span>класс</span>
                </div>
            </div>
        </div>
    );
}
