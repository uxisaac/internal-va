"use client"

import { useState } from "react"

import { GrantProcessView } from "@/components/grant-process-view"
import { StepDrawer } from "@/components/step-drawer"
import { Separator } from "@/components/ui/separator"
import type { GrantSection } from "@/lib/grant-process"
import type { FlowPhase } from "@/lib/legacy-process-flow"

// The grant process, with the documents behind each part. Opening a step
// slides in its detail.
export function DocumentsView({
  phases,
  grantSections,
}: {
  phases: FlowPhase[]
  grantSections: GrantSection[]
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openStepId, setOpenStepId] = useState<string | null>(null)
  const openStep = (stepId: string) => {
    setOpenStepId(stepId)
    setDrawerOpen(true)
  }

  const stepTitles = Object.fromEntries(
    phases.flatMap((phase) => phase.steps).map((step) => [step.id, step.title])
  )

  return (
    <>
      <Separator />
      <div className="p-4 pt-8 pb-12">
        <GrantProcessView
          sections={grantSections}
          stepTitles={stepTitles}
          onOpenStep={openStep}
        />
      </div>
      <StepDrawer
        stepId={openStepId}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}
