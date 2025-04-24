import DashboardBreadcrumb from "@/components/layout/dashboard/navbar/dashboard-breadcrumb";
import NavUserWrapper from "@/components/layout/dashboard/navbar/nav-user-wrapper";
import { AppSidebar } from "@/components/layout/dashboard/sidebar/app-sidebar";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Bell } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Mammoth",
  description: "CRM for Health Care",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="">
      {/* dashboard sidebar */}
      <AppSidebar className="p-4 pr-0" />
      <SidebarInset className="bg-transparent p-4 gap-4">
        {/* dashboard header */}
        <header className="flex h-20 py-2 bg-white rounded-xl border shadow-sm shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20 sticky top-4 z-50">
          <div className="flex flex-nowrap items-center gap-2 px-4">
            <SidebarTrigger className="xl:hidden -ml-1" />
            <DashboardBreadcrumb />
          </div>
          {/* searchbar */}
          <div className="flex justify-center items-center gap-4 md:gap-6">
            <SearchBar />
            {/* notification */}
            <Button size={"icon"} className="rounded-full">
              <Bell />
            </Button>
            {/* user dropdown */}
            <NavUserWrapper />
          </div>
        </header>
        {/* dashboard content */}
        <div className="rounded-xl flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
