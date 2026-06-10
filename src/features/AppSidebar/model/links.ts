import type { NavLinksType } from "./types";

import { BookOpen, CalendarDays, ChartNoAxesCombined, GraduationCap, House } from "lucide-react";

export const links: NavLinksType[] = [
    { icon: House, title: "Главная", url: "/home" },
    { icon: BookOpen, title: "Расписание", url: "/schedule" },
    { icon: GraduationCap, title: "Оценки", url: "/grades" },
    { icon: CalendarDays, title: "Четверти", url: "/quarters" },
    { icon: ChartNoAxesCombined, title: "Аналитика", url: "/analytics" },
];
