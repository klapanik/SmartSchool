import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const filterWrapperClassName =
    "w-full min-w-0 md:flex-1 lg:flex-none lg:max-w-52";

const filterTriggerClassName = cn(
    "h-11 w-full rounded-xl border-input bg-white px-4 text-base shadow-sm",
    "md:h-9 md:rounded-md md:text-sm md:shadow-xs",
);

export function AnalyticsFilters() {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className={filterWrapperClassName}>
                <Select defaultValue="all subjects">
                    <SelectTrigger className={filterTriggerClassName}>
                        <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectGroup>
                            <SelectItem value="all subjects">Все предметы</SelectItem>
                            <SelectItem value="bel-lang">Белорусский язык</SelectItem>
                            <SelectItem value="bel-lit">Белорусская литература</SelectItem>
                            <SelectItem value="rus-lang">Русский язык</SelectItem>
                            <SelectItem value="rus-lit">Русская литература</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className={filterWrapperClassName}>
                <Select defaultValue="current estimates">
                    <SelectTrigger className={filterTriggerClassName}>
                        <SelectValue placeholder="Выберите четверть" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectGroup>
                            <SelectItem value="current estimates">Текущие оценки</SelectItem>
                            <SelectItem value="fourth term">4 четверть (2025-2026)</SelectItem>
                            <SelectItem value="third term">3 четверть (2025-2026)</SelectItem>
                            <SelectItem value="second term">2 четверть (2025-2026)</SelectItem>
                            <SelectItem value="first term">1 четверть (2025-2026)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
