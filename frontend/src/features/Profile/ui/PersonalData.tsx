import { PersonalDataItem } from "@/shared/ui/PersonalDataItem";
import { GraduationCap, Phone, User, Users } from "lucide-react";

type Props = {
    classTeacher: string | undefined | null;
    parent: string | undefined | null;
    email: string | undefined;
    phone_number: string | undefined | null;
};

export function PersonalData({ classTeacher, parent, email, phone_number }: Props) {
    return (
        <div className="flex flex-col gap-3.5">
            <p className="text-sm text-smoky-black">Личные данные</p>
            <PersonalDataItem
                Icon={GraduationCap}
                title="Кл. руководитель"
                value={classTeacher || "Не указан"}
            />
            <PersonalDataItem Icon={Users} title="Родитель" value={parent || "Не указан"} />
            <PersonalDataItem
                Icon={Phone}
                title="Телефон"
                value={phone_number || "Не указан"}
                isChangeable={true}
            />
            <PersonalDataItem
                Icon={User}
                title="Email"
                value={email || "Не указан"}
                isChangeable={true}
            />
        </div>
    );
}
