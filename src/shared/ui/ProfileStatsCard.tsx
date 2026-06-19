import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  number: number;
  title: string;
};

export const ProfileStatsCard = (props: Props) => {
  const { number, title } = props;
  return (
    <div className="flex flex-col items-center justify-center bg-[#f7f8fa] rounded-[10px] gap-[2px]">
      <props.icon size={16} className="text-primary" />
      <p className="text-md font-bold">{number}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  );
};
