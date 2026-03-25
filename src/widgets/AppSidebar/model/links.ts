import type { NavLinksType } from "./types";

import { CalendarDays, House } from "lucide-react";

export const links: NavLinksType[] = [
    { icon: House, title: "Главная", url: "/home" },
    { icon: CalendarDays, title: "Четверти", url: "/quarters" },
];
