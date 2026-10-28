"use client"

import * as React from "react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { library } from "@/lib/catalogs"
import { categories } from "@/lib/guides"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BookMarkedIcon,
  BookOpenIcon,
  FileTextIcon,
  LibraryIcon,
  PaletteIcon,
  SparklesIcon,
  WorkflowIcon,
} from "lucide-react"

// This is sample data.
const data = {
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
  ],
  // Listed under "Training Material".
  navTraining: [
    {
      title: "Guides",
      url: "#",
      icon: <LibraryIcon />,
      // Process Breakdown first, then one link per category, so new
      // categories appear here automatically.
      items: [
        { title: "Process Breakdown", url: "/guides/process-breakdown" },
        ...categories.map((category) => ({
          title: category.title,
          url: `/guides/${category.id}`,
        })),
      ],
    },
    {
      title: "Library",
      url: "#",
      icon: <BookMarkedIcon />,
      items: library.map((entry) => ({
        title: entry.title,
        url: `/library/${entry.id}`,
      })),
    },
  ],
  // Listed under "More".
  navMore: [
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
            className="h-auto w-[85%]"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain label="Training Material" items={data.navTraining} />
        <NavMain label="More" items={data.navMore} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
