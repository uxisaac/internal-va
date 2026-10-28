"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

import { FlowToolbar } from "@/components/flow-toolbar"
import { FormPreviewDrawer } from "@/components/form-preview-drawer"
import type { VaForm } from "@/lib/va-forms"
import { formsForStep } from "@/lib/va-forms"
import { StepCard } from "@/components/step-card"
import { StepDrawer } from "@/components/step-drawer"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
  defaultFlowFilters,
  hasActiveFilters,
  stepMatchesFilters,
} from "@/lib/flow-filters"
import type { FlowPhase } from "@/lib/legacy-process-flow"
import { cn } from "@/lib/utils"

// The process as a list of steps grouped by phase. Opening a step slides in
// its detail.
export function StepsView({ phases }: { phases: FlowPhase[] }) {
  const [filters, setFilters] = useState(defaultFlowFilters)
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(phases.map((phase) => [phase.id, false]))
  )
  const setAll = (value: boolean) =>
    setOpen(Object.fromEntries(phases.map((phase) => [phase.id, value])))

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openStepId, setOpenStepId] = useState<string | null>(null)
  const openStep = (stepId: string) => {
    setOpenStepId(stepId)
    setDrawerOpen(true)
  }

  const steps = phases.flatMap((phase) => phase.steps)
  const count = (values: string[]) => new Set(values).size
  const docs = steps.reduce((sum, step) => sum + (step.docs ?? 0), 0)
  const screens = steps.reduce((sum, step) => sum + (step.screens ?? 0), 0)
  const people = count(steps.flatMap((step) => step.roles ?? []))
  const systems = count(steps.flatMap((step) => step.systems ?? []))
  const filtering = hasActiveFilters(filters)

  return (
    <>
      <section className="bg-base-secondary px-4 pt-4 pb-8 text-base-secondary-foreground">
        <FlowToolbar
          phases={phases}
          filters={filters}
          onFiltersChange={setFilters}
          showSummary={false}
        />
      </section>
      <Separator />
      <div className="flex flex-col gap-4 p-4 pt-8 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex max-w-[78ch] flex-col gap-1">
            <h2 className="text-xl font-semibold">Steps</h2>
            <p className="text-sm text-muted-foreground">
              Click a step to open it: the detail slides in from the right with
              the documents in and out, the decision, if any, and its notes.
              Phases run top to bottom, steps left to right within a phase; the
              exception paths at the end are reached from any step.{" "}
              {steps.length} steps · {docs} documents · {people} people and
              roles · {systems} systems · {screens} screens.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setAll(true)}>
              Expand all
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAll(false)}>
              Collapse all
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {phases.map((phase) => (
            <Collapsible
              key={phase.id}
              open={open[phase.id]}
              onOpenChange={(value) =>
                setOpen((current) => ({ ...current, [phase.id]: value }))
              }
              className={cn(
                "rounded-xl border bg-card",
                phase.exception && "border-dashed"
              )}
            >
              <CollapsibleTrigger className="group/phase flex w-full cursor-pointer items-start gap-4 rounded-xl p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="flex flex-1 flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {phase.id}
                  </span>
                  <span className="font-heading text-lg leading-snug font-semibold">
                    {phase.title}
                  </span>
                  {phase.description && (
                    <span className="text-sm text-muted-foreground">
                      {phase.description}
                    </span>
                  )}
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  {phase.steps.length} steps
                  <ChevronDownIcon className="size-4 transition-transform group-data-[panel-open]/phase:rotate-180" />
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-3 px-4 pb-4 md:grid-cols-2 xl:grid-cols-3">
                  {phase.steps.map((step) => {
                    const dimmed =
                      filtering && !stepMatchesFilters(step, filters)
                    return (
                      // The step-open button covers the card; the form
                      // link sits above it so both can be clicked.
                      <div
                        key={step.id}
                        className={cn(
                          "group/step relative isolate rounded-lg transition-opacity has-[>button:focus-visible]:ring-2 has-[>button:focus-visible]:ring-ring",
                          dimmed && "opacity-30"
                        )}
                      >
                        <StepCard
                          step={step}
                          dashed={phase.exception}
                          content="summary"
                          showDecision={false}
                          className="h-full transition-colors group-hover/step:bg-muted/50"
                        >
                          <StepForms
                            forms={formsForStep(step.id)}
                            stepLabel={`${step.id} ${step.title}`}
                          />
                        </StepCard>
                        <button
                          type="button"
                          onClick={() => openStep(step.id)}
                          aria-label={`Open ${step.id} ${step.title}`}
                          className="absolute inset-0 cursor-pointer rounded-lg outline-none"
                        />
                      </div>
                    )
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      <StepDrawer
        stepId={openStepId}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}

// The VA forms used at a step, as links that open a preview.
function StepForms({
  forms,
  stepLabel,
}: {
  forms: VaForm[]
  stepLabel: string
}) {
  if (forms.length === 0) return null
  return (
    // Sits above the card's step-open button so the links stay clickable.
    <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2">
      {forms.map((form) => (
        <FormPreviewDrawer key={form.id} form={form} stepLabel={stepLabel} />
      ))}
    </div>
  )
}
