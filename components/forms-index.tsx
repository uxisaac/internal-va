"use client"

import { ExternalLinkIcon, FileSearchIcon, SearchIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { FormPreviewDrawer } from "@/components/form-preview-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { legacyProcessFlow } from "@/lib/legacy-process-flow"
import { vaForms, type VaForm } from "@/lib/va-forms"

// Forms in form-number order, so 26-1839 sorts before 26-4555 and 26-4555c.
const sortedForms = [...vaForms].sort((a, b) =>
  a.number.localeCompare(b.number, undefined, { numeric: true })
)

// Which phase each step belongs to, for the phase filter.
const phaseOfStep = Object.fromEntries(
  legacyProcessFlow.flatMap((phase) =>
    phase.steps.map((step) => [step.id, phase.id])
  )
)

const phaseOptions = [
  { value: "all", label: "All phases" },
  ...legacyProcessFlow.map((phase) => ({
    value: phase.id,
    label: phase.title,
  })),
]

// Lower-case, without "VA" or "form", so "VA Form 26-4555" finds 26-4555.
const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/\b(va|form)\b/g, "")
    .trim()

function matchesSearch(form: VaForm, query: string) {
  const needle = normalize(query)
  if (!needle) return true
  return [form.number, form.title, ...form.usedAt].some((text) =>
    text.toLowerCase().includes(needle)
  )
}

const matchesPhase = (form: VaForm, phase: string) =>
  phase === "all" || form.usedAt.some((step) => phaseOfStep[step] === phase)

// Every VA form as one searchable table, for Agents looking up a form they
// already know by number or name.
export function FormsIndex() {
  const [query, setQuery] = useState("")
  const [phase, setPhase] = useState("all")
  const searchRef = useRef<HTMLInputElement>(null)

  // Search is the main way in: focus it on load, and on "/" from anywhere
  // outside a text field.
  useEffect(() => {
    searchRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const typing =
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      if (event.key === "/" && !typing) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const visible = sortedForms.filter(
    (form) => matchesSearch(form, query) && matchesPhase(form, phase)
  )
  const clear = () => {
    setQuery("")
    setPhase("all")
    searchRef.current?.focus()
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-12 z-4 flex flex-wrap items-center gap-3 border-b bg-background px-4 py-3 group-has-data-[collapsible=icon]/sidebar-wrapper:top-10">
        <div className="relative w-full max-w-md">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            type="search"
            aria-label="Search forms"
            aria-keyshortcuts="/"
            placeholder="Search by form number or name…"
            className="pl-8"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select
          items={phaseOptions}
          value={phase}
          onValueChange={(next) => setPhase((next as string | null) ?? "all")}
        >
          <SelectTrigger aria-label="Phase" className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {phaseOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span
          aria-live="polite"
          className="ml-auto text-sm text-muted-foreground tabular-nums"
        >
          Showing {visible.length} of {sortedForms.length}
        </span>
      </div>

      <div className="p-4 pt-6 pb-12">
        {visible.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileSearchIcon />
              </EmptyMedia>
              <EmptyTitle>
                {query ? `No forms match “${query}”` : "No forms match"}
              </EmptyTitle>
              <EmptyDescription>
                Try the form number without letters, or part of its name.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={clear}>
                Clear search
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-card">
            <Table className="min-w-3xl table-fixed">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-36">Form</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[18%]">Direction</TableHead>
                  <TableHead className="w-[18%]">Used at</TableHead>
                  <TableHead className="w-28">
                    <span className="sr-only">PDF</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((form) => (
                  <TableRow
                    key={form.id}
                    className="[&>td]:align-top [&>td]:whitespace-normal"
                  >
                    <TableCell>
                      <FormPreviewDrawer
                        form={form}
                        className="text-sm font-semibold"
                      />
                    </TableCell>
                    <TableCell>
                      <span className="line-clamp-2" title={form.title}>
                        {form.title}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {form.direction}
                    </TableCell>
                    <TableCell>
                      {form.usedAt.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {form.usedAt.map((step) => (
                            <Badge key={step} variant="outline">
                              {step}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {form.file && (
                        <a
                          href={`/${form.file}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View PDF of VA Form ${form.number}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          View PDF
                          <ExternalLinkIcon aria-hidden className="size-3.5" />
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
