import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type FlowStep = {
  id: string
  title: string
}

export type FlowPhase = {
  id: string
  title: string
  steps: FlowStep[]
}

// Phase label column, then up to three step columns with arrow gutters between.
const GRID_COLUMNS = "grid-cols-[12rem_1fr_2.5rem_1fr_2.5rem_1fr]"

// Grid column (1-based) for the step at a given index in its row.
const stepColumn = (index: number) => 2 + index * 2

export function FlowDiagram({ phases }: { phases: FlowPhase[] }) {
  return (
    <div className="overflow-x-auto">
      <div className={cn("grid min-w-4xl items-stretch", GRID_COLUMNS)}>
        {phases.map((phase, phaseIndex) => {
          const isLast = phaseIndex === phases.length - 1
          return (
            <PhaseRow
              key={phase.id}
              phase={phase}
              connectToNext={!isLast}
            />
          )
        })}
      </div>
    </div>
  )
}

function PhaseRow({
  phase,
  connectToNext,
}: {
  phase: FlowPhase
  connectToNext: boolean
}) {
  const lastColumn = stepColumn(phase.steps.length - 1)

  return (
    <>
      <div className="col-start-1 flex flex-col justify-center pr-4">
        <span className="text-xs font-semibold text-muted-foreground">
          {phase.id}
        </span>
        <h3 className="text-base leading-snug font-semibold">{phase.title}</h3>
      </div>
      {phase.steps.map((step, index) => (
        <StepCell
          key={step.id}
          step={step}
          column={stepColumn(index)}
          hasNext={index < phase.steps.length - 1}
        />
      ))}
      {connectToNext && <RowConnector lastColumn={lastColumn} />}
    </>
  )
}

function StepCell({
  step,
  column,
  hasNext,
}: {
  step: FlowStep
  column: number
  hasNext: boolean
}) {
  return (
    <>
      <div
        style={{ gridColumnStart: column }}
        className="flex min-h-24 flex-col gap-1 rounded-lg border bg-card p-3 text-card-foreground shadow-xs"
      >
        <span className="text-xs font-semibold text-muted-foreground">
          {step.id}
        </span>
        <p className="line-clamp-2 text-sm leading-snug font-semibold">
          {step.title}
        </p>
      </div>
      {hasNext && (
        <div
          style={{ gridColumnStart: column + 1 }}
          className="flex items-center justify-center text-muted-foreground"
          aria-hidden
        >
          <ArrowRightIcon className="size-5" />
        </div>
      )}
    </>
  )
}

// Elbow line from the bottom of a row's last step back to the first step of
// the next row: down, across to the left, then down into the next row.
function RowConnector({ lastColumn }: { lastColumn: number }) {
  const firstColumn = stepColumn(0)
  const middleColumns = Array.from(
    { length: lastColumn - firstColumn - 1 },
    (_, i) => firstColumn + 1 + i
  )

  if (lastColumn === firstColumn) {
    return (
      <div
        style={{ gridColumnStart: firstColumn }}
        className="relative h-10 text-muted-foreground"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-1/2 border-l border-current" />
        <ArrowHead />
      </div>
    )
  }

  return (
    <>
      <div
        style={{ gridColumnStart: firstColumn }}
        className="relative h-10 text-muted-foreground"
        aria-hidden
      >
        <div className="absolute top-1/2 right-0 bottom-0 left-1/2 border-t border-l border-current" />
        <ArrowHead />
      </div>
      {middleColumns.map((column) => (
        <div
          key={column}
          style={{ gridColumnStart: column }}
          className="relative h-10 text-muted-foreground"
          aria-hidden
        >
          <div className="absolute inset-x-0 top-1/2 border-t border-current" />
        </div>
      ))}
      <div
        style={{ gridColumnStart: lastColumn }}
        className="relative h-10 text-muted-foreground"
        aria-hidden
      >
        <div className="absolute top-0 right-1/2 bottom-1/2 left-0 border-r border-b border-current" />
      </div>
    </>
  )
}

function ArrowHead() {
  return (
    <svg
      viewBox="0 0 10 6"
      className="absolute bottom-0 left-1/2 h-1.5 w-2.5 -translate-x-1/2 fill-current"
    >
      <path d="M0 0h10L5 6z" />
    </svg>
  )
}
