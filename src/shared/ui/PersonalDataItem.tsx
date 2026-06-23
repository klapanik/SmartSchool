import { Pencil, type LucideIcon } from "lucide-react";

type Props = {
    Icon: LucideIcon;
    title: string;
    value: string;
    isMutable?: boolean;
};

export const PersonalDataItem = ({ Icon, title, value, isMutable }: Props) => {
    return (
        <div className="flex justify-between items-center gap-4">
            <div className="flex gap-1">
                <Icon className="text-gray-500 size-3.5 m-auto" />
                <span className="text-gray-500 text-sm">{title}</span>
            </div>
            <div className="flex items-center">
                <span className="text-sm text-smoky-black mr-1">{value}</span>
                {isMutable && (
                    <button>
                        <Pencil className="size-3 text-primary" />
                    </button>
                )}
            </div>
        </div>
    );
};
