import type { LucideIcon } from "lucide-react";

type Props = {
    Icon: LucideIcon;
    title: string;
    value: string;
};

export const PersonalDataItem = ({ Icon, title, value }: Props) => {
    return (
        <div className="flex justify-between items-center gap-4">
            <div className="flex gap-1">
                <Icon className="text-gray-500 size-3.5 m-auto" />
                <span className="text-gray-500 text-sm">{title}</span>
            </div>
            <span className="text-sm text-smoky-black">{value}</span>
        </div>
    );
};
