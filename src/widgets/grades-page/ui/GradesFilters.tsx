import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

const filterTriggerClassName = cn(
    "h-11 w-full rounded-xl border-input bg-white px-4 text-smoky-black shadow-sm",
    "md:h-9 md:rounded-md md:text-smoky-black md:shadow-xs",
);

const filterLabelClassName = "mb-2 text-base font-medium text-smoky-black";

function FilterField({
    id,
    label,
    defaultValue,
    children,
}: {
    id: string;
    label: string;
    defaultValue: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-w-0">
            <Label htmlFor={id} className={filterLabelClassName}>
                {label}
            </Label>
            <Select defaultValue={defaultValue}>
                <SelectTrigger id={id} className={filterTriggerClassName}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">{children}</SelectContent>
            </Select>
        </div>
    );
}

export function GradesFilters() {
    return (
        <div className="primary-block flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <Filter className="size-5 shrink-0" aria-hidden />
                <h2 className="text-xl font-bold">Фильтры и сортировка</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
                <FilterField
                    id="grades-filter-quarter"
                    label="Фильтр по четверти"
                    defaultValue="current"
                >
                    <SelectGroup>
                        <SelectItem value="current">Текущие оценки</SelectItem>
                        <SelectItem value="q4">4 четверть (2025-2026)</SelectItem>
                        <SelectItem value="q3">3 четверть (2025-2026)</SelectItem>
                        <SelectItem value="q2">2 четверть (2025-2026)</SelectItem>
                        <SelectItem value="q1">1 четверть (2025-2026)</SelectItem>
                    </SelectGroup>
                </FilterField>

                <FilterField
                    id="grades-filter-subject"
                    label="Фильтр по предмету"
                    defaultValue="all"
                >
                    <SelectGroup>
                        <SelectItem value="all">Все предметы</SelectItem>
                        <SelectItem value="bel-lang">Белорусский язык</SelectItem>
                        <SelectItem value="bel-lit">Белорусская литература</SelectItem>
                        <SelectItem value="rus-lang">Русский язык</SelectItem>
                        <SelectItem value="rus-lit">Русская литература</SelectItem>
                    </SelectGroup>
                </FilterField>

                <FilterField id="grades-filter-sort" label="Сортировка" defaultValue="date">
                    <SelectGroup>
                        <SelectItem value="date">По дате</SelectItem>
                        <SelectItem value="subject">По предмету</SelectItem>
                        <SelectItem value="grade">По оценке</SelectItem>
                    </SelectGroup>
                </FilterField>

                <FilterField id="grades-filter-direction" label="Направление" defaultValue="desc">
                    <SelectGroup>
                        <SelectItem value="desc">По убыванию</SelectItem>
                        <SelectItem value="asc">По возрастанию</SelectItem>
                    </SelectGroup>
                </FilterField>
            </div>
        </div>
    );
}
