import { Separator } from "@/components/ui/separator"
import type { Category, Course } from "@/lib/guides"
import { courseHref, lessonsOf, minutesOf } from "@/lib/guides"

// A course on its category page: title, description and icon, then a link
// below a rule. The link stretches over the whole card (see its ::after), so
// the card is one click target with a single accessible link.
export function CourseCard({
  category,
  course,
}: {
  category: Category
  course: Course
}) {
  const Icon = course.icon
  const lessons = lessonsOf(course).length

  return (
    <div className="relative flex flex-col rounded-xl border bg-card p-6 text-card-foreground transition-colors hover:bg-muted/50 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring">
      {/* flex-1 keeps the rule and link level across a row of cards. */}
      <div className="flex flex-1 items-start gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="leading-relaxed text-muted-foreground">
            {course.description}
          </p>
        </div>
        <Icon
          aria-hidden
          strokeWidth={1.5}
          className="size-14 shrink-0 fill-primary/10 text-primary"
        />
      </div>
      <Separator className="mt-6 mb-4" />
      <div className="flex items-center justify-between gap-4">
        <a
          href={courseHref(category, course)}
          className="font-medium text-primary outline-none after:absolute after:inset-0 after:rounded-xl hover:underline"
        >
          {course.cta ?? "Start course"}
        </a>
        {lessons > 0 && (
          <span className="text-sm text-muted-foreground">
            {lessons} lessons · {minutesOf(course)} min
          </span>
        )}
      </div>
    </div>
  )
}
