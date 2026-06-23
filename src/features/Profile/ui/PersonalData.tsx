import { PersonalDataItem } from "@/shared/ui/PersonalDataItem";
import { GraduationCap, Phone, User, Users } from "lucide-react";

export function PersonalData() {
    return (
        <div className="flex flex-col gap-3.5">
            <p className="text-sm text-smoky-black">Личные данные</p>
            <PersonalDataItem Icon={GraduationCap} title="Кл. руководитель" value="Не указан" />
            <PersonalDataItem Icon={Users} title="Родитель" value="Не указан" />
            <PersonalDataItem Icon={Phone} title="Телефон" value="Не указан" isMutable />
            <PersonalDataItem
                Icon={User}
                title="Email"
                value="lapanikkonstantin@gmail.com"
                isMutable
            />
        </div>
    );
}
