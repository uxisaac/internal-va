import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserMenu } from "@/components/user-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ProcessMap } from "@/components/process-map"
import { legacyProcessFlow } from "@/lib/legacy-process-flow"

// Placeholder until content updates are tracked.
const LAST_UPDATED = {
  iso: "2026-10-07T12:30",
  label: "Oct 7, 2026 at 12:30 PM",
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-5 flex h-12 shrink-0 items-center gap-2 border-b bg-card transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Process</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Legacy process</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-1 px-4">
            <ModeToggle />
            <UserMenu />
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <Tabs defaultValue="flow-diagram" className="flex-1">
            <TabsContent value="flow-diagram">
              <ProcessMap
                phases={legacyProcessFlow}
                header={
                  <div key="page-header" className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Legacy Process
                    </h1>
                    <p className="max-w-3xl text-sm text-muted-foreground">
                      Welcome to the Phoenix SAHSHA collaborator. This is a tool
                      to codevelop our understanding of the grant itself and the
                      current legacy system, and the New SAHSHA MVP.{" "}
                      <span className="font-medium text-foreground">
                        Last updated{" "}
                        <time dateTime={LAST_UPDATED.iso}>
                          {LAST_UPDATED.label}
                        </time>
                      </span>
                    </p>
                  </div>
                }
              />
            </TabsContent>
            <TabsContent value="steps" className="flex">
              <div className="min-h-96 flex-1 rounded-xl bg-muted/50" />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
