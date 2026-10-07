import { AppSidebar } from "@/components/app-sidebar"
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
import { FlowDiagram } from "@/components/flow-diagram"
import { legacyProcessFlow } from "@/lib/legacy-process-flow"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Phoenix SAHSHA Collaborator
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Welcome to the Phoenix SAHSHA collaborator. This is a tool to
              codevelop our understanding of the grant itself and the current
              legacy system, and the New SAHSHA MVP.
            </p>
          </div>
          <Tabs defaultValue="flow-diagram" className="flex-1">
            <TabsContent value="flow-diagram">
              <FlowDiagram phases={legacyProcessFlow} />
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
