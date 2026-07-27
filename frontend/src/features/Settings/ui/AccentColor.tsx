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
                        <SelectItem value="purple">
                            <div className="flex gap-1 items-center">
                                <div className="size-2.5 bg-primary rounded-[2px]"></div>
                                <span>Фиолетовый</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="blue">
                            <div className="flex gap-1 items-center">
                                <div className="size-2.5 bg-[#2B70FA] rounded-[2px]"></div>
                                <span>Синий</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="green">
                            <div className="flex gap-1 items-center">
                                <div className="size-2.5 bg-[#00DD1A] rounded-[2px]"></div>
                                <span>Зелёный</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="pink">
                            <div className="flex gap-1 items-center">
                                <div className="size-2.5 bg-[#F94AE7] rounded-[2px]"></div>
                                <span>Розовый</span>
                            </div>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
