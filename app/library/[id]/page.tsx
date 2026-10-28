import { InboxIcon } from "lucide-react"
import { notFound } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { DocumentsView } from "@/components/documents-view"
import { ModeToggle } from "@/components/mode-toggle"
import { RolesView } from "@/components/roles-view"
import { UserMenu } from "@/components/user-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { library } from "@/lib/catalogs"
import { grantSections } from "@/lib/grant-process"
import { legacyProcessFlow } from "@/lib/legacy-process-flow"
import { m26Roles, personas } from "@/lib/personas"

export function generateStaticParams() {
  return library.map((entry) => ({ id: entry.id }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entry = library.find((candidate) => candidate.id === id)
  if (!entry) notFound()

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
                <BreadcrumbItem>Library</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{entry.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-1 px-4">
            <ModeToggle />
            <UserMenu />
          </div>
        </header>
        {entry.id === "forms" ? (
          // VA Forms Library shows the process documents view.
          <div className="flex flex-1 flex-col">
            <section className="flex flex-col gap-1 bg-base-secondary px-4 pt-4 pb-4 text-base-secondary-foreground">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {entry.title}
                </h1>
                <Badge variant="outline" className="bg-card">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-primary"
                  />
                  v21.0
                </Badge>
              </div>
              <p className="max-w-3xl text-muted-foreground">
                {entry.description}
              </p>
            </section>
            <DocumentsView
              phases={legacyProcessFlow}
              grantSections={grantSections}
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <section className="bg-base-secondary px-4 pt-4 pb-6 text-base-secondary-foreground">
              <h1 className="text-3xl font-semibold tracking-tight">
                {entry.title}
              </h1>
            </section>
            <Separator />
            {entry.id === "roles" ? (
              <RolesView personas={personas} m26Roles={m26Roles} />
            ) : (
              // Entries without content yet show only a placeholder.
              <div className="flex flex-1 p-4 pt-8 pb-12">
                <Empty className="flex-1 border border-dashed">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <InboxIcon />
                    </EmptyMedia>
                    <EmptyTitle>No data yet</EmptyTitle>
                    <EmptyDescription>
                      There&apos;s no data for {entry.title} yet. It will appear
                      here once it&apos;s added.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            )}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
