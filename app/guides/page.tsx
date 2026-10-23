import { AppSidebar } from "@/components/app-sidebar"
import { CatalogGrid } from "@/components/catalog-grid"
import { ModeToggle } from "@/components/mode-toggle"
import { UserMenu } from "@/components/user-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { catalogs } from "@/lib/catalogs"

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
                <BreadcrumbItem>
                  <BreadcrumbPage>Guides</BreadcrumbPage>
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
          <section className="flex flex-col gap-1 bg-base-secondary px-4 pt-4 pb-8 text-base-secondary-foreground">
            <h1 className="text-2xl font-semibold tracking-tight">Guides</h1>
            <p className="max-w-3xl text-sm text-muted-foreground">
              How-to guides for the SAHSHA grant process.
            </p>
          </section>
          <Separator />
          <div className="flex flex-1 p-4 pt-8">
            <CatalogGrid catalogs={catalogs} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
