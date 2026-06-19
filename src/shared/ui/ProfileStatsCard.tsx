import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  number: number;
  title: string;
};

export const ProfileStatsCard = (props: Props) => {
  const { number, title } = props;
  return (
    <div className="flex items-center justify-center">
      <props.icon size={11} />
      <p className="text-xl font-bold">{number}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  );
};
