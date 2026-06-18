import { GraduationCap } from "lucide-react";

export function ProfileHeader() {
    return (
        <div className="bg-primary rounded-t-md p-5 text-white">
            <div></div>
            <div>
                <h3 className="mb-2 font-semibold">Константин Лапаник</h3>
                <div className="w-min font-semibold rounded-xl flex gap-1 text-xs bg-accent px-2.5 py-1">
                    <GraduationCap size={15} className="my-auto mr-0.5" />
                    <span>9А</span>
                    <span>класс</span>
                </div>
            </div>
        </div>
    );
}
