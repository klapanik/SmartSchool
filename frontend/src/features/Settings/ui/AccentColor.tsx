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
        <div>
            <Palette />
            <span>Акцентный цвет</span>
            <Select defaultValue="purple">
                <SelectTrigger>
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
