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
        <div>
            <Clock4 />
            <span>Формат времени</span>
            <Select defaultValue="24h">
                <SelectTrigger>
                    <SelectValue placeholder="Выберите формат" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                        <SelectItem value="24h">24 часа</SelectItem>
                        <SelectItem value="12h">12 часов</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
