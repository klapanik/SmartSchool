import { CalendarDays } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function WeekBegin() {
    return (
        <div className="flex justify-between">
            <div className="text-gray-500 flex gap-1 items-center">
                <CalendarDays className="size-3.5 m-auto" />
                <span className="text-sm">Начало недели</span>
            </div>
            <Select defaultValue="monday">
                <SelectTrigger className="border-none !shadow-none p-0 w-auto">
                    <SelectValue placeholder="Выберите день" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                        <SelectItem value="monday">Понедельник</SelectItem>
                        <SelectItem value="tuesday">Вторник</SelectItem>
                        <SelectItem value="wednesday">Среда</SelectItem>
                        <SelectItem value="thursday">Четверг</SelectItem>
                        <SelectItem value="friday">Пятница</SelectItem>
                        <SelectItem value="saturday">Суббота</SelectItem>
                        <SelectItem value="sunday">Воскресенье</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
