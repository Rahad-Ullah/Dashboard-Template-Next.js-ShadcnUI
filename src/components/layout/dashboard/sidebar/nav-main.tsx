"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType<{ fill: string }>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="gap-4">
      <SidebarGroupLabel className="flex items-center gap-2 text-zinc-400">
        <span>Menu</span> <span className="flex-1 bg-gray-200 h-0.5"></span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.url === pathname;

          return (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`${
                    isActive
                      ? "bg-primary text-white hover:bg-primary hover:text-white active:bg-primary-foreground active:text-white"
                      : ""
                  }`}
                >
                  {item.icon && (
                    <span className="icon">
                      {/* Pass 'fill' based on active state */}
                      {item.icon && (
                        <item.icon fill={isActive ? "#ffffff" : "#929292"} />
                      )}
                    </span>
                  )}

                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
