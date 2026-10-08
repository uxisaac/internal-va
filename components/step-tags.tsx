import { FileTextIcon, MonitorIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { FlowStep } from "@/lib/legacy-process-flow"
import { cn } from "@/lib/utils"

// Actor, system/document and status badges for a process step.
export function StepTags({
  step,
  className,
}: {
  step: FlowStep
  className?: string
}) {
  const hasStatus = Boolean(
    step.needsAnswer || step.conflicts || step.newItems || step.screens
  )
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {step.roles && (
        <div className="flex flex-wrap gap-1">
          {step.roles.map((role) => (
            <Badge key={role} variant="secondary">
              {role}
            </Badge>
          ))}
        </div>
      )}
      {(step.systems || !!step.docs) && (
        <div className="flex flex-wrap gap-1">
          {step.systems?.map((system) => (
            <Badge key={system} variant="outline">
              {system}
            </Badge>
          ))}
          {!!step.docs && (
            <Badge variant="outline" className="text-muted-foreground">
              <FileTextIcon data-icon="inline-start" />
              {step.docs} {step.docs === 1 ? "doc" : "docs"}
            </Badge>
          )}
        </div>
      )}
      {hasStatus && (
        <div className="flex flex-wrap gap-1">
          {step.needsAnswer && <Badge>Needs an answer</Badge>}
          {!!step.conflicts && (
            <Badge variant="destructive">
              Conflict{step.conflicts > 1 && ` ×${step.conflicts}`}
            </Badge>
          )}
          {!!step.newItems && (
            <Badge variant="outline" className="text-primary">
              +{step.newItems} new
            </Badge>
          )}
          {!!step.screens && (
            <Badge variant="outline" className="text-muted-foreground">
              <MonitorIcon data-icon="inline-start" />
              {step.screens} {step.screens === 1 ? "screen" : "screens"}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
