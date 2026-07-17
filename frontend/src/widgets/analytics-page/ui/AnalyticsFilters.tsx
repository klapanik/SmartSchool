import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const filterWrapperClassName = "w-full min-w-0 md:flex-1 lg:flex-none lg:max-w-52";

const filterTriggerClassName = cn("text-base md:text-sm");

export function AnalyticsFilters() {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className={filterWrapperClassName}>
                <Select defaultValue="all">
                    <SelectTrigger className={filterTriggerClassName}>
                        <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectGroup>
                            <SelectItem value="all">Все предметы</SelectItem>
                            <SelectItem value="bel-lang">Белорусский язык</SelectItem>
                            <SelectItem value="bel-lit">Белорусская литература</SelectItem>
                            <SelectItem value="rus-lang">Русский язык</SelectItem>
                            <SelectItem value="rus-lit">Русская литература</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className={filterWrapperClassName}>
                <Select defaultValue="current">
                    <SelectTrigger className={filterTriggerClassName}>
                        <SelectValue placeholder="Выберите четверть" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectGroup>
                            <SelectItem value="current">Текущие оценки</SelectItem>
                            <SelectItem value="q1">1 четверть (2025-2026)</SelectItem>
                            <SelectItem value="q2">2 четверть (2025-2026)</SelectItem>
                            <SelectItem value="q3">3 четверть (2025-2026)</SelectItem>
                            <SelectItem value="q4">4 четверть (2025-2026)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
