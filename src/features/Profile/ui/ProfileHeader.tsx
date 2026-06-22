import { GraduationCap, PlusIcon, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import { UserProfileCode } from "./UserProfileCode";

export function ProfileHeader() {
    return (
        <div className="flex-col bg-primary rounded-t-md p-5 text-white ">
            <div className="flex gap-3 mb-2.5">
                <Avatar className="border-3 border-[#B897F1]" size="lg">
                    <AvatarImage src="" alt="SS" />
                    <AvatarFallback className="bg-accent text-white">
                        <UserRound />
                    </AvatarFallback>
                    <AvatarBadge className="bg-white text-primary duration-150 hover:scale-110 hover:rotate-90">
                        <PlusIcon />
                    </AvatarBadge>
                </Avatar>

                <div className="my-auto">
                    <h3 className="mb-1.5 font-semibold">Константин Лапаник</h3>
                    <div className="w-min font-semibold rounded-xl flex gap-1 text-xs bg-accent px-2.5 py-1 cursor-pointer">
                        <GraduationCap size={15} className="my-auto mr-0.5" />
                        <span>9А</span>
                        <span>класс</span>
                    </div>
                </div>
            </div>

            <UserProfileCode />
        </div>
    );
}
//2
