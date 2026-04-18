import { Equal, Triangle, type LucideIcon } from "lucide-react";

type Props = {
    title: string;
    titleSubtext?: string;
    icon: LucideIcon;
    number: number;
    prevNumber?: number;
    description?: string;
};

export function AnalyticStatsCard(props: Props) {
    const { title, titleSubtext, number, prevNumber, description } = props;

    const statNumber = prevNumber !== undefined ? prevNumber - number : null;

    return (
        <div className="primary-block">
            <div className="flex justify-between mb-2">
                <div>
                    <div className="flex gap-1 mb-1">
                        <props.icon size={16} />
                        <h3 className="text-sm font-semibold">{title}</h3>
                    </div>
                    {titleSubtext && (
                        <p className="text-xs text-gray-500">{titleSubtext}</p>
                    )}
                </div>
                <p className="text-2xl font-bold">{number}</p>
            </div>

            {prevNumber !== undefined && (
                <div>
                    <div className="flex gap-1">
                        <p>В прошлой четверти: </p>
                        <p>{prevNumber}</p>
                    </div>

                    {statNumber !== null && (
                        <div className="flex items-center gap-1">
                            {statNumber > 0 ? (
                                <div className="flex items-center gap-1">
                                    <Triangle color="green" />
                                    <p className="text-green-600">
                                        {statNumber}
                                    </p>
                                </div>
                            ) : statNumber < 0 ? (
                                <div className="flex items-center gap-1">
                                    <Triangle
                                        className="rotate-180"
                                        color="red"
                                    />
                                    <p className="text-red-600">{statNumber}</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <Equal
                                        size={16}
                                        className="text-gray-500"
                                    />
                                    <p className="text-gray-500">0</p>
                                </div>
                            )}
                            {description && (
                                <p className="text-gray-500">{description}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
