import { StatsCard } from "@/shared/ui/StatsCard";

export const StatsGroup = () => {
  return (
    <div className="">
      <StatsCard
        title="Сегодня уроков"
        icon="1"
        number={0}
        subtext="Выходной день"
      />
    </div>
  );
};
