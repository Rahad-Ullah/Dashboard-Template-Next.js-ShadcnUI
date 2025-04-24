"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/dashboard/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavSettings } from "./nav-settings";
import { sidebarMenu } from "@/constants/dashboard-sidebar-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuthContext();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href={"/dashboard/tests"} className="flex justify-center mt-2">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={120}
            height={68}
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenu.navMain} />
        <NavSettings settings={sidebarMenu.settings} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => logout()}>
              <LogOut />
              Log Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
