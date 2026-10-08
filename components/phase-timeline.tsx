import { ChevronRightIcon } from "lucide-react"

import { StepTags } from "@/components/step-tags"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import type { FlowStep } from "@/lib/legacy-process-flow"
import { cn } from "@/lib/utils"

// A phase's steps as a vertical timeline: numbered markers on a connecting
// line, each step an Item that opens its details.
export function PhaseTimeline({
  steps,
  onSelectStep,
}: {
  steps: FlowStep[]
  onSelectStep: (step: FlowStep) => void
}) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <li
            key={step.id}
            className={cn("relative flex gap-3", !isLast && "pb-4")}
          >
            {!isLast && (
              <span
                aria-hidden
                className="absolute top-8 bottom-0 left-4 w-px -translate-x-1/2 bg-border"
              />
            )}
            <span
              className={cn(
                "relative flex size-8 shrink-0 items-center justify-center rounded-full border bg-card text-xs font-semibold tabular-nums",
                step.conflicts
                  ? "border-destructive text-destructive"
                  : step.needsAnswer
                    ? "border-primary text-primary"
                    : "text-muted-foreground"
              )}
            >
              {index + 1}
            </span>
            <Item
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 cursor-pointer items-start bg-card text-left hover:bg-muted/50",
                step.decisionPoint &&
                  "relative overflow-hidden pl-4 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-destructive"
              )}
              render={
                <button type="button" onClick={() => onSelectStep(step)} />
              }
            >
              <ItemContent className="gap-1">
                <ItemDescription className="text-xs font-semibold">
                  {step.id}
                </ItemDescription>
                <ItemTitle className="text-base leading-snug font-semibold">
                  {step.title}
                </ItemTitle>
                <StepTags step={step} className="mt-1" />
              </ItemContent>
              <ItemActions className="self-center text-muted-foreground">
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Item>
          </li>
        )
      })}
    </ol>
  )
}
