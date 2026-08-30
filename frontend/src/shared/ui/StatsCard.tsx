import type { LucideIcon } from "lucide-react";

type Props = {
    title: string;
    icon: LucideIcon;
    number: string | number;
    subtext: string;
    iconClassName?: string;
};

export function StatsCard(props: Props) {
    const { title, number, subtext, iconClassName } = props;
    return (
        <div className="primary-block">
            <div className="flex justify-between">
                <h3 className="text-sm font-semibold">{title}</h3>
                <props.icon size={16} className={iconClassName} />
            </div>
            <p className="text-2xl font-bold">{number}</p>
            <p className="text-xs text-gray-500">{subtext}</p>
        </div>
    );
}
