import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

import { GraduationCap } from "lucide-react";
import { NavLink } from "react-router-dom";

import { links } from "../model/links";

export function AppSidebar() {
    return (
        <div className="relative h-full">
            <Sidebar>
                <div className="px-4 py-5 h-full">
                    <SidebarHeader className="flex flex-row mb-5">
                        <GraduationCap className="my-auto cursor-pointer mr-2" />

                        <div>
                            <h2 className="font-semibold text-2xl">Дневник</h2>
                            <p className="text-sm">Оценок</p>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel className="text-sm">Навигация</SidebarGroupLabel>

                            <SidebarGroupContent className="pl-1 mt-1.5">
                                <SidebarMenu>
                                    {links.map((link) => (
                                        <SidebarMenuItem key={link.title}>
                                            <SidebarMenuButton asChild>
                                                <NavLink to={link.url}>
                                                    <link.icon className="!size-5" />
                                                    <span className="lg:text-lg">{link.title}</span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </div>
            </Sidebar>

            <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarTrigger
                        className="transition-colors duration-300 hover:bg-smoky-white
                            absolute -right-9 top-4 cursor-pointer"
                    />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="flex items-center gap-2 p-2">
                    <span className="text-sm text-primary">Боковая панель</span>
                    <KbdGroup>
                        <Kbd>Ctrl</Kbd>
                        <span>+</span>
                        <Kbd>B</Kbd>
                    </KbdGroup>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
