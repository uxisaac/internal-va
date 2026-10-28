"use client"

import { ExternalLinkIcon, FileTextIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import type { VaForm } from "@/lib/va-forms"

// A "VA Form …" link that opens a drawer with the form's details and a
// placeholder PDF preview. Swap the preview for an embedded PDF once the
// files are added.
export function FormPreviewDrawer({
  form,
  stepLabel,
}: {
  form: VaForm
  stepLabel: string
}) {
  const details: [string, string][] = [
    ["Kind", form.kind],
    ["Direction", form.direction],
    ["Used at", form.usedAt.join(", ") || "Not mapped to a step"],
    ["Requires", form.requires],
    ["Provides", form.provides],
    ["SAHSHA category / type", form.sahshaCategory],
    ["Public copy", form.publicCopy],
  ]

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="link"
            size="xs"
            className="h-auto px-0 text-primary"
          />
        }
      >
        <FileTextIcon data-icon="inline-start" />
        VA Form {form.number}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="overflow-y-auto data-[side=right]:sm:max-w-xl"
      >
        <SheetHeader className="p-6 pr-14 pb-0">
          <div className="flex flex-wrap items-center gap-2">
            <SheetTitle className="text-xl font-semibold">
              VA Form {form.number}
            </SheetTitle>
            <Badge variant="secondary">{form.kind}</Badge>
          </div>
          <SheetDescription>{form.title}</SheetDescription>
          <p className="text-xs text-muted-foreground">
            Opened from {stepLabel}
          </p>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-6">
          {/* Placeholder PDF page until the form files are added. */}
          <div className="flex justify-center rounded-lg border bg-muted p-6">
            <div
              role="img"
              aria-label={`Preview of VA Form ${form.number} (placeholder)`}
              className="flex aspect-8.5/11 w-full max-w-sm flex-col gap-3 rounded-sm bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <span className="text-xs font-semibold text-muted-foreground">
                  VA FORM {form.number.toUpperCase()}
                </span>
              </div>
              <Skeleton className="mt-2 h-5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="mt-4 flex flex-col gap-2">
                {Array.from({ length: 10 }, (_, line) => (
                  <Skeleton
                    key={line}
                    className={line % 4 === 3 ? "h-3 w-2/3" : "h-3 w-full"}
                  />
                ))}
              </div>
              <div className="mt-auto flex flex-col items-center gap-1 text-center text-muted-foreground">
                <FileTextIcon aria-hidden className="size-6" />
                <span className="text-sm">PDF preview coming soon</span>
                {form.file && <span className="text-xs">{form.file}</span>}
              </div>
            </div>
          </div>

          <dl className="flex flex-col gap-3 text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="text-xs font-semibold text-muted-foreground">
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <SheetFooter className="sticky bottom-0 flex-row justify-end border-t bg-popover p-4 px-6">
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
          {form.file && (
            // Opens the whole PDF in a new tab.
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href={`/${form.file}`} target="_blank" rel="noreferrer" />
              }
            >
              <ExternalLinkIcon data-icon="inline-start" />
              View PDF
            </Button>
          )}
          <Button disabled>Download PDF</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
