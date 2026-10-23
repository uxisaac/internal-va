import {
  CircleCheckIcon,
  FileTextIcon,
  ClockIcon,
  LayersIcon,
  UsersIcon,
} from "lucide-react"
import { notFound } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserMenu } from "@/components/user-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { catalogs, itemHref } from "@/lib/catalogs"

export function generateStaticParams() {
  return catalogs.map((catalog) => ({ id: catalog.id }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const guide = catalogs.find((catalog) => catalog.id === id)
  if (!guide) notFound()

  const items = guide.chapters.flatMap((chapter) => chapter.items)
  const firstItem = items[0]
  const itemCount = items.length
  const totalMinutes = items.reduce((sum, item) => sum + item.minutes, 0)

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
                  <BreadcrumbLink href="/guides">Guides</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{guide.title}</BreadcrumbPage>
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
          <section className="flex items-start justify-between gap-8 bg-base-secondary px-4 pt-4 pb-8 text-base-secondary-foreground">
            <div className="flex max-w-3xl flex-col gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">
                {guide.title}
              </h1>
              <p className="text-muted-foreground">{guide.description}</p>
              <div className="flex flex-wrap gap-2 [&_[data-slot=badge]]:h-7 [&_[data-slot=badge]]:px-3 [&_[data-slot=badge]]:text-sm">
                <Badge variant="secondary" className="bg-card">
                  <LayersIcon data-icon="inline-start" />
                  {guide.items} items
                </Badge>
                <Badge variant="secondary" className="bg-card">
                  <ClockIcon data-icon="inline-start" />
                  {guide.updated}
                </Badge>
                <Badge variant="secondary" className="bg-card">
                  <UsersIcon data-icon="inline-start" />
                  {guide.owner}
                </Badge>
                <Badge className="bg-primary/10 text-primary">
                  {guide.topic}
                </Badge>
              </div>
            </div>
            {/* Opens the guide's first item. */}
            <Button
              size="lg"
              className="shrink-0"
              nativeButton={false}
              render={<a href={firstItem ? itemHref(guide, firstItem) : "#"} />}
            >
              Start guide
            </Button>
          </section>
          <Separator />
          <section
            aria-labelledby="outcomes-heading"
            className="flex flex-col gap-6 p-4 pt-8"
          >
            <h2
              id="outcomes-heading"
              className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
            >
              What you&apos;ll learn
            </h2>
            <ul className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {guide.outcomes.map((outcome) => (
                <li key={outcome.title} className="flex gap-3">
                  <CircleCheckIcon
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-primary"
                  />
                  <p className="leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {outcome.title}
                    </span>{" "}
                    — {outcome.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section
            aria-labelledby="contents-heading"
            className="flex flex-col gap-6 p-4 pt-8 pb-12"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="contents-heading"
                className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
              >
                Guide contents
              </h2>
              <span className="text-sm text-muted-foreground">
                {guide.chapters.length} chapters · {itemCount} items ·{" "}
                {totalMinutes} min
              </span>
            </div>
            <Accordion
              multiple
              defaultValue={[guide.chapters[0]?.title]}
              className="rounded-xl border bg-card"
            >
              {guide.chapters.map((chapter, index) => (
                <AccordionItem key={chapter.title} value={chapter.title}>
                  <AccordionTrigger className="items-center px-4 py-4 hover:no-underline">
                    <span className="flex flex-1 items-baseline gap-3">
                      <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium">
                        {chapter.title}
                      </span>
                    </span>
                    <span className="mr-2 text-sm font-normal text-muted-foreground">
                      {chapter.items.length} items ·{" "}
                      {chapter.items.reduce(
                        (sum, item) => sum + item.minutes,
                        0
                      )}{" "}
                      min
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col pb-2">
                      {chapter.items.map((item) => (
                        <li key={item.title}>
                          <a
                            href={itemHref(guide, item)}
                            className="flex items-center gap-3 px-4 py-2.5 pl-11 transition-colors outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                          >
                            <FileTextIcon
                              aria-hidden
                              className="size-4 shrink-0 text-muted-foreground"
                            />
                            <span className="flex-1 text-foreground">
                              {item.title}
                            </span>
                            <span className="text-muted-foreground tabular-nums">
                              {item.minutes} min
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
