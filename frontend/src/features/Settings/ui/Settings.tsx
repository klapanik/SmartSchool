import { AccentColor } from "./AccentColor";
import { DeleteAccount } from "./DeleteAccount";
import { TimeFormat } from "./TimeFormat";
import { WeekBegin } from "./WeekBegin";
type Props = {
    handleLogout: () => Promise<void>;
};

export function Settings({ handleLogout }: Props) {
    return (
        <div className="flex flex-col gap-3.5">
            <p className="text-sm text-smoky-black">Настройки</p>
            <div className="flex flex-col gap-4">
                <AccentColor />
                <TimeFormat />
                <WeekBegin />
            </div>
            <DeleteAccount handleLogout={handleLogout} />
        </div>
    );
}
