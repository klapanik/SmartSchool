import { AppSidebar } from "@/widgets/index";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

export function RootLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div>
          <AppSidebar />

          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
