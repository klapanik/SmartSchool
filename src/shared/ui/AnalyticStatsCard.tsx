import { Equal, Triangle, type LucideIcon } from "lucide-react";

type Props = {
    title: string;
    titleSubtext?: string;
    icon: LucideIcon;
    number: number;
    prevNumber?: number;
    description?: string;
    subject?: string;
};

export function AnalyticStatsCard(props: Props) {
    const { title, titleSubtext, number, prevNumber, description, subject } = props;

    const statNumber =
        prevNumber !== undefined && number !== undefined && description === undefined
            ? Math.round((number - prevNumber) * 100) / 100
            : null;

    return (
        <div
            className={`${subject ? "block lg:flex justify-between flex-wrap " : ""} primary-block`}
        >
            <div>
                <div className="flex justify-between mb-2">
                    <div>
                        <div className="flex gap-1 items-center">
                            <props.icon size={20} />
                            <h3 className="font-semibold">{title}</h3>
                        </div>
                        {titleSubtext && <p className="text-gray-500">{titleSubtext}</p>}
                    </div>
                    {number && subject === undefined && (
                        <p className="text-xl lg:text-2xl font-bold">{number}</p>
                    )}
                </div>

                {subject && (
                    <div className="mb-1">
                        <p className="text-xl font-bold mb-1">{subject}</p>
                        <p className="text-gray-500">средний балл: {number}</p>
                    </div>
                )}
            </div>

            <div>
                {prevNumber !== undefined && (
                    <div>
                        <p>В прошлой четверти: {prevNumber}</p>

                        {statNumber !== null && (
                            <>
                                {statNumber > 0 ? (
                                    <div className="flex items-center gap-1 text-green-500">
                                        <Triangle size={12} className="fill-current" />
                                        <p>+{statNumber}</p>
                                    </div>
                                ) : statNumber < 0 ? (
                                    <div className="flex items-center gap-1 text-red-500">
                                        <Triangle
                                            size={12}
                                            className="rotate-180 fill-current "
                                            color="red"
                                        />
                                        <p>{statNumber}</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <Equal size={12} className="text-gray-500" />
                                        <p className="text-gray-500">0</p>
                                    </div>
                                )}
                            </>
                        )}
                        {description && <p className="text-xs text-gray-500">{description}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
