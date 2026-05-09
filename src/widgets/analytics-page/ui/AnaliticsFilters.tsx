import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AnaliticsFilters() {
    return (
        <div>
            <Select defaultValue="all subjects">
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all subjects">Все предметы</SelectItem>
                        <SelectItem value="bel-lang">Белорусский язык</SelectItem>
                        <SelectItem value="bel-lit">Белорусская литература</SelectItem>
                        <SelectItem value="rus-lang">Русский язык</SelectItem>
                        <SelectItem value="rus-lit">Русская литература</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select defaultValue="current estimates">
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
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
    );
}
