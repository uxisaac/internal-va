"use client"

import {
  CircleHelpIcon,
  ListChecksIcon,
  PlusIcon,
  SearchIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FlagFilter, FlowFilters } from "@/lib/flow-filters"
import type { FlowPhase } from "@/lib/legacy-process-flow"
import { cn } from "@/lib/utils"

type Option = { value: string; label: string }

const FLAG_OPTIONS: Option[] = [
  { value: "all", label: "Every step" },
  { value: "needs-answer", label: "Needs an answer" },
  { value: "conflict", label: "Conflict" },
  { value: "new", label: "New additions" },
]

const LAYER_OPTIONS: Option[] = [{ value: "all", label: "The whole map" }]

const withAll = (values: string[]): Option[] => [
  { value: "all", label: "All" },
  ...[...new Set(values)].sort().map((value) => ({ value, label: value })),
]

// At-a-glance summary, legend and filter controls for a process map.
export function FlowToolbar({
  phases,
  filters,
  onFiltersChange,
}: {
  phases: FlowPhase[]
  filters: FlowFilters
  onFiltersChange: (filters: FlowFilters) => void
}) {
  const steps = phases.flatMap((phase) => phase.steps)
  const additions = steps.reduce((sum, step) => sum + (step.newItems ?? 0), 0)
  const stepsWithAdditions = steps.filter((step) => step.newItems).length
  const conflicts = steps.reduce((sum, step) => sum + (step.conflicts ?? 0), 0)
  const stepsWithConflicts = steps.filter((step) => step.conflicts).length
  const needsAnswer = steps.filter((step) => step.needsAnswer).length

  const update = (patch: Partial<FlowFilters>) =>
    onFiltersChange({ ...filters, ...patch })
  // Clicking the active card again clears the flag filter.
  const toggleFlag = (flag: FlagFilter) =>
    update({ flag: filters.flag === flag ? "all" : flag })

  return (
    <div className="flex flex-col gap-4">
      <Card className="mb-4 grid grid-cols-2 gap-0 py-0 lg:grid-cols-4">
        <StatItem
          label="New additions"
          icon={<PlusIcon />}
          value={additions}
          caption={`across ${stepsWithAdditions} steps`}
          active={filters.flag === "new"}
          onClick={() => toggleFlag("new")}
        />
        <StatItem
          className="border-l"
          label="Conflicts"
          icon={<TriangleAlertIcon />}
          tone="destructive"
          value={conflicts}
          caption={`on ${stepsWithConflicts} steps`}
          active={filters.flag === "conflict"}
          onClick={() => toggleFlag("conflict")}
        />
        <StatItem
          className="lg:border-l"
          label="Needs an answer"
          icon={<CircleHelpIcon />}
          tone="primary"
          value={needsAnswer}
          caption="open questions"
          active={filters.flag === "needs-answer"}
          onClick={() => toggleFlag("needs-answer")}
        />
        <StatItem
          className="border-l"
          label="Steps updated"
          icon={<ListChecksIcon />}
          value={`${stepsWithAdditions} of ${steps.length}`}
          caption="have new content"
        />
      </Card>

      <div className="flex flex-wrap items-end gap-4">
        <FilterSelect
          id="highlight-actor"
          label="Highlight actor"
          options={withAll(steps.flatMap((step) => step.roles ?? []))}
          value={filters.actor}
          onValueChange={(actor) => update({ actor })}
        />
        <FilterSelect
          id="highlight-system"
          label="Highlight system"
          options={withAll(steps.flatMap((step) => step.systems ?? []))}
          value={filters.system}
          onValueChange={(system) => update({ system })}
        />
        <FilterSelect
          id="flags"
          label="Flags"
          options={FLAG_OPTIONS}
          value={filters.flag}
          onValueChange={(flag) => update({ flag: flag as FlagFilter })}
        />
        <FilterSelect
          id="layer"
          label="Layer"
          options={LAYER_OPTIONS}
          value={filters.layer}
          onValueChange={(layer) => update({ layer })}
        />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="find">Find</Label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="find"
              type="search"
              placeholder="Form, letter, screen…"
              className="w-56 pl-8"
              value={filters.query}
              onChange={(event) => update({ query: event.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ICON_TONES = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
}

// One KPI inside the shared summary card; vertical rules separate items.
function StatItem({
  label,
  icon,
  tone = "neutral",
  value,
  caption,
  active,
  onClick,
  className,
}: {
  label: string
  icon: React.ReactNode
  tone?: keyof typeof ICON_TONES
  value: React.ReactNode
  caption: string
  active?: boolean
  onClick?: () => void
  className?: string
}) {
  const content = (
    <>
      <span className="flex items-center justify-between gap-2">
        <span className="text-base font-medium text-foreground">{label}</span>
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full [&_svg]:size-3.5",
            ICON_TONES[tone]
          )}
        >
          {icon}
        </span>
      </span>
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-2xl font-semibold text-foreground tabular-nums">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{caption}</span>
      </span>
    </>
  )
  const base = cn("flex flex-col p-4 text-left", className)

  if (!onClick) return <div className={base}>{content}</div>
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        base,
        "cursor-pointer transition-colors outline-none hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        active &&
          "bg-primary/5 shadow-[inset_0_-2px_0_var(--primary)] hover:bg-primary/5"
      )}
    >
      {content}
    </button>
  )
}

function FilterSelect({
  id,
  label,
  options,
  value,
  onValueChange,
}: {
  id: string
  label: string
  options: Option[]
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select
        items={options}
        value={value}
        onValueChange={(next) =>
          onValueChange((next as string | null) ?? "all")
        }
      >
        <SelectTrigger id={id} className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
