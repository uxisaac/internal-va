"use client"

import { useRef } from "react"

import { StepDetailPanel } from "@/components/step-detail-panel"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { dummyStepDetail } from "@/lib/step-details"
import { formsForStep } from "@/lib/va-forms"

// The step detail that slides in from the right when a step is opened.
export function StepDrawer({
  stepId,
  open,
  onOpenChange,
}: {
  /** The opened step, used to list its form PDFs. */
  stepId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        initialFocus={panelRef}
        className="overflow-y-auto data-[side=right]:sm:max-w-xl"
      >
        {/* Placeholder: every step shows the same dummy step detail, apart
            from its form PDFs. */}
        <StepDetailPanel
          ref={panelRef}
          detail={dummyStepDetail}
          showVideo
          showOpenQuestions={false}
          forms={stepId ? formsForStep(stepId) : []}
        />
      </SheetContent>
    </Sheet>
  )
}
