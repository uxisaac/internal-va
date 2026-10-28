import { StepTags } from "@/components/step-tags"
import type { FlowStep } from "@/lib/legacy-process-flow"
import { cn } from "@/lib/utils"

// A process step: id, title, then either its tags or a plain-language
// summary. Shared by the flowchart, the phase drawer and the steps list.
export function StepCard({
  step,
  dashed,
  content = "tags",
  showDecision = true,
  className,
  children,
}: {
  step: FlowStep
  dashed?: boolean
  content?: "tags" | "summary"
  /** Mark decision points with a red rule on the left edge. */
  showDecision?: boolean
  className?: string
  /** Extra content at the bottom of the card, e.g. a form link. */
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border bg-card p-3 text-card-foreground shadow-xs",
        dashed && "border-dashed",
        // Decision points carry a red rule on the left edge.
        showDecision &&
          step.decisionPoint &&
          "relative overflow-hidden pl-4 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-destructive",
        className
      )}
    >
      <span className="text-xs font-semibold text-muted-foreground">
        {step.id}
      </span>
      <p className="text-base leading-snug font-semibold">{step.title}</p>
      {content === "summary" && step.summary ? (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {step.summary}
        </p>
      ) : (
        <StepTags step={step} className="mt-1" />
      )}
      {children}
    </div>
  )
}
