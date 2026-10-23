import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ClockIcon,
  PlayIcon,
} from "lucide-react"
import { notFound } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserMenu } from "@/components/user-menu"
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
import { catalogs, findItem, itemHref, itemSlug } from "@/lib/catalogs"

export function generateStaticParams() {
  return catalogs.flatMap((guide) =>
    guide.chapters.flatMap((chapter) =>
      chapter.items.map((item) => ({
        id: guide.id,
        item: itemSlug(item.title),
      }))
    )
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; item: string }>
}) {
  const { id, item: slug } = await params
  const guide = catalogs.find((catalog) => catalog.id === id)
  const found = guide && findItem(guide, slug)
  if (!guide || !found) notFound()
  const { chapter, chapterIndex, item } = found

  // Previous and next items across the whole guide.
  const items = guide.chapters.flatMap((entry) => entry.items)
  const position = items.indexOf(item)
  const previous = items[position - 1]
  const next = items[position + 1]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-5 flex h-12 shrink-0 items-center gap-2 border-b bg-card transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10">
          <div className="flex min-w-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="flex-nowrap">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/catalogs">Guides</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/catalogs/${guide.id}`}>
                    {guide.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="truncate">
                    {item.title}
                  </BreadcrumbPage>
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
          <section className="flex flex-col gap-3 bg-base-secondary px-4 pt-4 pb-8 text-base-secondary-foreground">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Chapter {String(chapterIndex + 1).padStart(2, "0")} ·{" "}
              {chapter.title}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-2 [&_[data-slot=badge]]:h-7 [&_[data-slot=badge]]:px-3 [&_[data-slot=badge]]:text-sm">
              <Badge variant="secondary" className="bg-card">
                <ClockIcon data-icon="inline-start" />
                {item.minutes} min
              </Badge>
              <Badge variant="secondary" className="bg-card">
                <BookOpenIcon data-icon="inline-start" />
                {guide.title}
              </Badge>
              <Badge className="bg-primary/10 text-primary">
                {guide.topic}
              </Badge>
            </div>
          </section>
          <Separator />
          <div className="flex max-w-5xl flex-col gap-10 p-4 pt-8 pb-12">
            {/* Placeholder until videos are uploaded. */}
            <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border bg-muted text-muted-foreground">
              <span className="flex size-16 items-center justify-center rounded-full bg-card shadow-sm">
                <PlayIcon aria-hidden className="ml-1 size-7 text-primary" />
              </span>
              <span className="text-sm">Video coming soon</span>
            </div>

            <section
              aria-labelledby="about-heading"
              className="flex flex-col gap-3"
            >
              <h2
                id="about-heading"
                className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
              >
                About
              </h2>
              <p className="leading-relaxed">
                {item.title} is part of {chapter.title.toLowerCase()} in the{" "}
                {guide.title} guide. This placeholder will describe what the
                video covers, who it&apos;s for, and what to do before moving on
                to the next item.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Add the real summary, key points and links to related forms or
                SAHSHA screens here once the content is ready.
              </p>
            </section>

            <nav
              aria-label="Guide items"
              className="flex items-center justify-between gap-4 border-t pt-6"
            >
              {previous ? (
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<a href={itemHref(guide, previous)} />}
                >
                  <ArrowLeftIcon data-icon="inline-start" />
                  {previous.title}
                </Button>
              ) : (
                <span />
              )}
              {next && (
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<a href={itemHref(guide, next)} />}
                >
                  {next.title}
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              )}
            </nav>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
