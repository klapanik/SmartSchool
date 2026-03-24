type Props = {
  title: string;
  icon: string;
  number: number;
  subtext: string;
};

export function StatsCard(props: Props) {
  const { title, icon, number, subtext } = props;
  return (
    <div className="primary-block">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p>{icon}</p>
      </div>
      <p className="text-2xl font-bold">{number}</p>
      <p className="text-xs text-gray-500">{subtext}</p>
    </div>
  );
}
