import { Clock4 } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function TimeFormat() {
    return (
        <div className="flex justify-between items-center">
            <div className="text-gray-500 flex gap-1 ">
                <Clock4 className="size-3.5 m-auto" />
                <span className="text-sm">Формат времени</span>
            </div>
            <Select defaultValue="24h">
                <SelectTrigger className="border-none !shadow-none p-0 w-auto !h-fit">
                    <SelectValue placeholder="Выберите формат" />
                </SelectTrigger>
                <SelectContent position="popper" className="shadow-gray-300 border-none">
                    <SelectGroup>
                        <SelectItem value="24h">24 часа</SelectItem>
                        <SelectItem value="12h">12 часов</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
