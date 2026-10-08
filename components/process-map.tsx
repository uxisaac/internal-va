"use client"

import { useState } from "react"

import { FlowToolbar } from "@/components/flow-toolbar"
import { PhaseNav } from "@/components/phase-nav"
import { ProcessFlow } from "@/components/process-flow"
import { Separator } from "@/components/ui/separator"
import { defaultFlowFilters } from "@/lib/flow-filters"
import type { FlowPhase } from "@/lib/legacy-process-flow"

// Summary, filters and flowchart sharing one set of filters. The header,
// KPIs and filters sit in a full-width band above the chart.
export function ProcessMap({
  phases,
  header,
}: {
  phases: FlowPhase[]
  header?: React.ReactNode
}) {
  const [filters, setFilters] = useState(defaultFlowFilters)

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-4 bg-base-secondary px-4 pt-4 pb-8 text-base-secondary-foreground">
        {header}
        <FlowToolbar
          phases={phases}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </section>
      <Separator />
      <PhaseNav phases={phases} />
      <div className="p-4 pt-8">
        <ProcessFlow phases={phases} filters={filters} />
      </div>
    </div>
  )
}
