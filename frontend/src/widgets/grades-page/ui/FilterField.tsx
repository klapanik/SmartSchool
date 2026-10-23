import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function FilterField({
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
            <Label htmlFor={id} className="mb-2 text-base font-medium text-smoky-black">
                {label}
            </Label>
            <Select defaultValue={defaultValue}>
                <SelectTrigger id={id} className="text-smoky-black md:text-smoky-black">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">{children}</SelectContent>
            </Select>
        </div>
    );
}
