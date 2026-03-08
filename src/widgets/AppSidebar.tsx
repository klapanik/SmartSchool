import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GraduationCap } from "lucide-react";

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <div className="fixed inset-0 flex overflow-hidden w-screen h-screen bg-white">
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} 
          w-70  bg-white`}
      >
        <Sidebar className="w-full">
          <div className="flex p-5 flex-col gap-12.5 h-full relative">
            <SidebarHeader className="flex flex-row gap-3.25">
              <GraduationCap className="w-7.5 h-7.5 my-auto cursor-pointer" />
              <div>
                <h2 className="font-semibold text-2xl">Дневник</h2>
                <p className="text-sm font-medium">Оценок</p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <div className="flex gap-5">
                <p className="text-[#DDDDDD] font-bold text-sm">Навигация</p>
              </div>
            </SidebarContent>
          </div>
        </Sidebar>
      </div>

      <div
        className="flex flex-col h-full transition-all duration-300 ease-in-out"
        style={{
          marginLeft: open ? "280px" : "0px",
          width: open ? "calc(100vw - 280px)" : "100vw",
        }}
      >
        <div className="w-full border-b border-gray-300 flex flex-row gap-3 items-center p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="cursor-pointer hover:bg-smoky-white" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="flex items-center gap-2 p-2 shadow-[0px_2px_10px_0px_var(--primary)]"
            >
              <span className="text-sm text-primary">Боковая панель</span>
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
          <h2 className="font-semibold text-2xl text-black">Дневник оценок</h2>
        </div>
      </div>
    </div>
  );
}
