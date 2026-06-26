import { Copy } from "lucide-react";
import { useState } from "react";

export function UserProfileCode() {
    const [input, setInput] = useState("6338С53...DB7D");

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(input);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="bg-white rounded-xl flex p-3 justify-between items-center border border-[#BFDBFE]">
            <div className="flex flex-col gap-1">
                <p className="text-[#6B7280] text-[10px] font-medium">КОД ПОЛЬЗОВАТЕЛЯ</p>

                <p
                    onChange={(e) => setInput(e.target.textContent)}
                    className="text-black text-[10px] font-medium bg-transparent outline-none w-full"
                >
                    {input}
                </p>
            </div>
            <button onClick={copyToClipboard}>
                <Copy color="black" size={18} cursor="pointer" />
            </button>
        </div>
    );
}
