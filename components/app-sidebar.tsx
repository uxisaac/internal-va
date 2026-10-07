"use client"

import * as React from "react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BookOpenIcon,
  FileTextIcon,
  LibraryIcon,
  PaletteIcon,
  SparklesIcon,
  WorkflowIcon,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Process",
      url: "#",
      icon: <WorkflowIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/overview",
        },
        {
          title: "Legacy process",
          url: "/legacy-process",
        },
        {
          title: "Grant process",
          url: "#",
        },
      ],
    },
    {
      title: "New Sahsha",
      url: "#",
      icon: <SparklesIcon />,
      items: [],
    },
    {
      title: "Catalogs",
      url: "#",
      icon: <LibraryIcon />,
      items: [],
    },
    {
      title: "Sahsha Knowledge",
      url: "#",
      icon: <BookOpenIcon />,
      items: [],
    },
    {
      title: "Record",
      url: "#",
      icon: <FileTextIcon />,
      items: [],
    },
    {
      title: "Design Concepts",
      url: "#",
      icon: <PaletteIcon />,
      items: [],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="p-2 group-data-[collapsible=icon]:hidden">
          <Image
            src="/header-logo.png"
            alt="Logo"
            width={512}
            height={114}
            priority
            sizes="16rem"
            className="h-auto w-full"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
