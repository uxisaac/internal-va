import type { FlowStep } from "@/lib/legacy-process-flow"

export type FlagFilter = "all" | "needs-answer" | "conflict" | "new"

export type FlowFilters = {
  actor: string
  system: string
  flag: FlagFilter
  layer: string
  query: string
}

export const defaultFlowFilters: FlowFilters = {
  actor: "all",
  system: "all",
  flag: "all",
  layer: "all",
  query: "",
}

export const hasActiveFilters = (filters: FlowFilters) =>
  filters.actor !== "all" ||
  filters.system !== "all" ||
  filters.flag !== "all" ||
  filters.query.trim() !== ""

const matchesFlag = (step: FlowStep, flag: FlagFilter) => {
  switch (flag) {
    case "needs-answer":
      return Boolean(step.needsAnswer)
    case "conflict":
      return Boolean(step.conflicts)
    case "new":
      return Boolean(step.newItems)
    default:
      return true
  }
}

export function stepMatchesFilters(step: FlowStep, filters: FlowFilters) {
  const query = filters.query.trim().toLowerCase()
  const searchable = [step.id, step.title, ...(step.roles ?? []), ...(step.systems ?? [])]
    .join(" ")
    .toLowerCase()

  return (
    (filters.actor === "all" || (step.roles ?? []).includes(filters.actor)) &&
    (filters.system === "all" || (step.systems ?? []).includes(filters.system)) &&
    matchesFlag(step, filters.flag) &&
    (query === "" || searchable.includes(query))
  )
}
