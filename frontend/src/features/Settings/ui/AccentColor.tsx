import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

export function AccentColor() {
    return (
        <div className="flex justify-between items-center">
            <div className="text-gray-500 flex gap-1 ">
                <Palette className="size-3.5 m-auto" />
                <span className="text-sm">Акцентный цвет</span>
            </div>
            <Select defaultValue="purple">
                <SelectTrigger className="border-none !shadow-none p-0 w-auto !h-fit">
                    <SelectValue placeholder="Выберите цвет" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                        <SelectItem value="purple">Фиолетовый</SelectItem>
                        <SelectItem value="blue">Синий</SelectItem>
                        <SelectItem value="green">Зеленый</SelectItem>
                        <SelectItem value="pink">Розовый</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
