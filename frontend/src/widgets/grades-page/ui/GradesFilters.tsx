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

const filterTriggerClassName = cn("text-smoky-black md:text-smoky-black");

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
        <div className="flex flex-col gap-5">   
            <div className="grid grid-cols-1 gap-4 @min-[720px]:grid-cols-3 md:gap-x-6 md:gap-y-4">
                <FilterField
                    id="grades-filter-quarter"
                    label="Фильтр по четверти"
                    defaultValue="current"
                >
                    <SelectGroup>
                        <SelectItem value="current">Текущие оценки</SelectItem>
                        <SelectItem value="q1">1 четверть (2025-2026)</SelectItem>
                        <SelectItem value="q2">2 четверть (2025-2026)</SelectItem>
                        <SelectItem value="q3">3 четверть (2025-2026)</SelectItem>
                        <SelectItem value="q4">4 четверть (2025-2026)</SelectItem>
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
                    </SelectGroup>
                </FilterField>

                <FilterField id="grades-filter-sort" label="Сортировка" defaultValue="date">
                    <SelectGroup>
                        <SelectItem value="date">По дате</SelectItem>
                        <SelectItem value="subject">По предмету</SelectItem>
                        <SelectItem value="grade">По оценке</SelectItem>
                    </SelectGroup>
                </FilterField>
            </div>
        </div>
    );
}
