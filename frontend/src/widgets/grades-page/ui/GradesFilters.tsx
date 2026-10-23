import { SelectGroup, SelectItem } from "@/components/ui/select";
import { FilterField } from "./FilterField";

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
