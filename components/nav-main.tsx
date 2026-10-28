"use client"

import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"

// True on the page itself or any page below it.
const isWithin = (pathname: string, url: string) =>
  pathname === url || pathname.startsWith(`${url}/`)

export function NavMain({
  label = "Platform",
  items,
}: {
  label?: string
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="font-serif">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          // A linked group: the label opens its page, the chevron toggles the
          // sub-links.
          item.items?.length && item.url !== "#" ? (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive || isWithin(pathname, item.url)}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                tooltip={item.title}
                render={<a href={item.url} />}
                isActive={pathname === item.url}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
              <CollapsibleTrigger
                aria-label={`Show ${item.title} links`}
                // right-2 lines the chevron up with the other groups' chevrons.
                render={<SidebarMenuAction className="right-2" />}
              >
                <ChevronRightIcon className="transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        render={<a href={subItem.url} />}
                        isActive={isWithin(pathname, subItem.url)}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : // A linked item without sub-items is a plain link, not a group.
          !item.items?.length && item.url !== "#" ? (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                render={<a href={item.url} />}
                isActive={isWithin(pathname, item.url)}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <Collapsible
              key={item.title}
              defaultOpen={
                item.isActive ||
                item.items?.some((subItem) => isWithin(pathname, subItem.url))
              }
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={<SidebarMenuButton tooltip={item.title} />}
              >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        render={<a href={subItem.url} />}
                        isActive={isWithin(pathname, subItem.url)}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
