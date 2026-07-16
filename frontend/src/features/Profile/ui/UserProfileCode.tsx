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
        <div className="bg-[#EFF6FF] rounded-[10px] flex p-3 justify-between items-center border border-[#BFDBFE]">
            <div className="flex flex-col gap-1 text-xs font-medium">
                <p className="text-muted-foreground">КОД ПОЛЬЗОВАТЕЛЯ</p>

                <p onChange={(e) => setInput(e.target.textContent)} className="text-black">
                    {input}
                </p>
            </div>
            <button onClick={copyToClipboard}>
                <Copy color="black" size={18} cursor="pointer" />
            </button>
        </div>
    );
}
