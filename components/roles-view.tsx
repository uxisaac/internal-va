"use client"

import { LayoutGridIcon, SearchIcon, TableIcon, UsersIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { M26Role, Persona } from "@/lib/personas"

type View = "cards" | "table"

const matches = (query: string, values: (string | undefined)[]) =>
  query === "" || values.join(" ").toLowerCase().includes(query)

// Personas in the process, then the roles as M26-12 names them, as cards or
// tables, filtered by one search box.
export function RolesView({
  personas,
  m26Roles,
}: {
  personas: Persona[]
  m26Roles: M26Role[]
}) {
  const [query, setQuery] = useState("")
  const [view, setView] = useState<View>("table")

  const search = query.trim().toLowerCase()
  const visiblePersonas = personas.filter((persona) =>
    matches(search, [
      persona.name,
      persona.short,
      persona.organization,
      persona.role,
      persona.note,
      ...persona.systems,
      ...persona.steps,
    ])
  )
  const visibleRoles = m26Roles.filter((row) =>
    matches(search, [row.role, row.duties, row.source])
  )

  return (
    <div className="flex flex-col gap-10 p-4 pt-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Search roles and actors"
            placeholder="Search roles, systems, steps…"
            className="pl-8"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Tabs value={view} onValueChange={(value) => setView(value as View)}>
          <TabsList aria-label="View">
            <TabsTrigger value="table">
              <TableIcon />
              Table
            </TabsTrigger>
            <TabsTrigger value="cards">
              <LayoutGridIcon />
              Cards
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {visiblePersonas.length === 0 && visibleRoles.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersIcon />
            </EmptyMedia>
            <EmptyTitle>No roles match</EmptyTitle>
            <EmptyDescription>Try a different search.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {visiblePersonas.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionHeading
                title="Personas"
                count={visiblePersonas.length}
                total={personas.length}
              />
              {view === "cards" ? (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {visiblePersonas.map((persona) => (
                    <PersonaCard key={persona.name} persona={persona} />
                  ))}
                </div>
              ) : (
                <PersonasTable personas={visiblePersonas} />
              )}
            </section>
          )}

          {visibleRoles.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionHeading
                title="Roles as M26-12 names them"
                count={visibleRoles.length}
                total={m26Roles.length}
              />
              {view === "cards" ? (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {visibleRoles.map((row) => (
                    <M26Card key={row.role} row={row} />
                  ))}
                </div>
              ) : (
                <M26Table rows={visibleRoles} />
              )}
            </section>
          )}
        </>
      )}
    </div>
  )
}

function SectionHeading({
  title,
  count,
  total,
}: {
  title: string
  count: number
  total: number
}) {
  return (
    <div className="flex items-baseline gap-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <span className="text-sm text-muted-foreground tabular-nums">
        {count === total ? total : `${count} of ${total}`}
      </span>
    </div>
  )
}

// Same look as the step cards on the Process Breakdown page.
const cardClass =
  "flex flex-col gap-3 rounded-lg border bg-card p-3 text-card-foreground shadow-xs"

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-muted-foreground">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  )
}

function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <article className={cardClass}>
      <div className="flex flex-col items-start gap-1">
        <p className="text-base leading-snug font-semibold">{persona.name}</p>
        {persona.short && persona.short !== persona.name && (
          <Badge variant="secondary">{persona.short}</Badge>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {persona.role}
      </p>
      <Field label="Organization">{persona.organization}</Field>
      {persona.systems.length > 0 && (
        <Field label="Systems">
          <div className="flex flex-wrap gap-1">
            {persona.systems.map((system) => (
              <Badge key={system} variant="outline">
                {system}
              </Badge>
            ))}
          </div>
        </Field>
      )}
      {persona.steps.length > 0 && (
        <Field label={`Steps (${persona.steps.length})`}>
          <span className="text-xs leading-relaxed text-muted-foreground tabular-nums">
            {persona.steps.join(" ")}
          </span>
        </Field>
      )}
      {persona.note && (
        <p className="rounded-md bg-muted p-2 text-xs leading-relaxed text-muted-foreground">
          {persona.note}
        </p>
      )}
    </article>
  )
}

function M26Card({ row }: { row: M26Role }) {
  return (
    <article className={cardClass}>
      <p className="text-base leading-snug font-semibold">{row.role}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {row.duties}
      </p>
      <Field label="Source">{row.source}</Field>
    </article>
  )
}

function PersonasTable({ personas }: { personas: Persona[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table className="table-fixed">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[14%]">Persona</TableHead>
            <TableHead className="w-[13%]">Organization</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[15%]">Systems</TableHead>
            <TableHead className="w-[14%]">Steps</TableHead>
            <TableHead className="w-[16%]">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personas.map((persona) => (
            <TableRow key={persona.name} className="[&>td]:align-top">
              <TableCell className="whitespace-normal">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium">{persona.name}</span>
                  {persona.short && persona.short !== persona.name && (
                    <Badge variant="secondary">{persona.short}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="whitespace-normal text-muted-foreground">
                {persona.organization}
              </TableCell>
              <TableCell className="whitespace-normal">
                {persona.role}
              </TableCell>
              <TableCell className="whitespace-normal text-muted-foreground">
                {persona.systems.join(", ")}
              </TableCell>
              <TableCell className="whitespace-normal">
                <span className="text-xs leading-relaxed text-muted-foreground tabular-nums">
                  {persona.steps.join(" ")}
                </span>
              </TableCell>
              <TableCell className="text-xs whitespace-normal text-muted-foreground">
                {persona.note}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function M26Table({ rows }: { rows: M26Role[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table className="table-fixed">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[28%]">Role</TableHead>
            <TableHead>Duties</TableHead>
            <TableHead className="w-[18%]">Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.role} className="[&>td]:align-top">
              <TableCell className="font-medium whitespace-normal">
                {row.role}
              </TableCell>
              <TableCell className="whitespace-normal">{row.duties}</TableCell>
              <TableCell className="whitespace-normal text-muted-foreground">
                {row.source}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
