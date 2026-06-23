import { Pencil, Save, X, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Props = {
    Icon: LucideIcon;
    title: string;
    value: string;
    isMutable?: boolean;
};

export const PersonalDataItem = ({ Icon, title, value, isMutable }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleStarEditing = () => {
        setIsEditing(true);
    };
    const handleEndEditing = () => {
        setIsEditing(false);
    };

    return (
        <div
            className={`flex  ${isEditing ? "flex-col items-start gap-1.5" : "flex-row justify-between items-center gap-4"}`}
        >
            <div className="flex gap-1">
                <Icon
                    className={`size-3.5 m-auto ${isEditing ? "text-smoky-black" : "text-gray-500"}`}
                />
                <span className={`text-sm ${isEditing ? "text-smoky-black" : "text-gray-500"}`}>
                    {title}
                </span>
            </div>

            {isEditing === false && (
                <div className="flex items-center">
                    <span className="text-sm text-smoky-black mr-1">{value}</span>
                    {isMutable && (
                        <button onClick={handleStarEditing}>
                            <Pencil className="size-3 text-primary" />
                        </button>
                    )}
                </div>
            )}

            {isEditing === true && (
                <div className="relative w-full">
                    <input
                        type="text"
                        className="bg-smoky-white border border-gray-300 rounded-lg px-2.5 py-2 w-full text-sm"
                        placeholder={value}
                    />
                    <div className="absolute  flex right-[10px] top-1/2 -translate-y-1/2">
                        <button className=" mr-1" onClick={handleEndEditing}>
                            <X className="size-3" />
                        </button>
                        <button className=" text-white p-1 rounded-md bg-primary">
                            <Save className="size-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
