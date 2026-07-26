import { AccentColor } from "./AccentColor";
import { TimeFormat } from "./TimeFormat";
import { WeekBegin } from "./WeekBegin";

export function Settings() {
    return (
        <div className="flex flex-col gap-3.5">
            <p className="text-sm text-smoky-black">Настройки</p>
            <AccentColor />
            <TimeFormat />
            <WeekBegin />
        </div>
    );
}
