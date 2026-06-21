import { Copy } from "lucide-react";

export function UserProfileCode() {
    return (
        <div className="bg-white rounded-xl flex p-3 justify-between items-center">
            <div className="">
                <p className="text-[#6B7280] font-medium">КОД ПОЛЬЗОВАТЕЛЯ</p>

                <p className="text-black font-medium">6338С53...DB7D</p>
            </div>
            <Copy color="black" size={18} cursor="pointer" />
        </div>
    );
}
//1
