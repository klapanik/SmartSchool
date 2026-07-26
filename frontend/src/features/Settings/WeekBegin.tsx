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
        <div>
            <CalendarDays />
            <span>Начало недели</span>
            <Select defaultValue="monday">
                <SelectTrigger>
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
