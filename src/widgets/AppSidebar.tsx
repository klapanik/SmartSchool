import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { GraduationCap } from "lucide-react";

export function AppSidebar() {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <div>
          <h2>Дневник</h2>
          <p>оценок</p>
        </div>

        <TooltipContent>
          <span>Боковая панель</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>B</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>

      <Sidebar>
        <div>
          <SidebarHeader>
            <GraduationCap />
            <div>
              <h2>Дневник</h2>
              <p>оценок</p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <div>
              <p>Навигация</p>
            </div>
          </SidebarContent>
        </div>
      </Sidebar>
    </div>
  );
}
