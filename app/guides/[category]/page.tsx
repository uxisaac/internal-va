import { notFound } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { CourseCard } from "@/components/course-card"
import { ModeToggle } from "@/components/mode-toggle"
import { UserMenu } from "@/components/user-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
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
import { categories, findCategory } from "@/lib/guides"

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const category = findCategory((await params).category)
  if (!category) notFound()

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
                <BreadcrumbItem>Guides</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.title}</BreadcrumbPage>
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
            <h1 className="text-3xl font-semibold tracking-tight">
              {category.title}
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              {category.description}
            </p>
          </section>
          <Separator />
          <section
            aria-labelledby="courses-heading"
            className="flex max-w-6xl flex-col gap-6 p-4 pt-8 pb-12"
          >
            <h2 id="courses-heading" className="text-lg font-semibold">
              Courses
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {category.courses.map((course) => (
                <CourseCard
                  key={course.id}
                  category={category}
                  course={course}
                />
              ))}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
