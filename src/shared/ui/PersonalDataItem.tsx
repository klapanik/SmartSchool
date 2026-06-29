import { PersonalDataForm } from "@/features/Profile/ui/PersonalDataForm/PersonalDataForm";
import { Pencil, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Props = {
    Icon: LucideIcon;
    title: string;
    value: string;
    isChangeable?: boolean;
};

export const PersonalDataItem = ({ Icon, title, value, isChangeable }: Props) => {
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
            <div className={`flex gap-1 ${isEditing ? "text-smoky-black" : "text-gray-500"}`}>
                <Icon className="size-3.5 m-auto" />
                <span className="text-sm">{title}</span>
            </div>

            {isEditing === false && (
                <div className="flex items-center">
                    <span className="text-sm text-smoky-black mr-1">{value}</span>
                    {isChangeable && (
                        <button onClick={handleStarEditing}>
                            <Pencil className="size-3 text-primary cursor-pointer" />
                        </button>
                    )}
                </div>
            )}

            {isEditing === true && <PersonalDataForm value={value} onClick={handleEndEditing} />}
        </div>
    );
};
