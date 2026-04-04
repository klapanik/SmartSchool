import type { NavLinksType } from "./types";

import { BookOpen, CalendarDays, House } from "lucide-react";

export const links: NavLinksType[] = [
    { icon: House, title: "Главная", url: "/home" },
    { icon: BookOpen, title: "Расписание", url: "/schedule" },
    { icon: CalendarDays, title: "Четверти", url: "/quarters" },
];
