"use client"

import {
  ArrowRightIcon,
  ClockIcon,
  LayersIcon,
  LibraryIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
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
import { Separator } from "@/components/ui/separator"
import type { Catalog } from "@/lib/catalogs"

type Option = { value: string; label: string }

const options = (label: string, values: string[]): Option[] => [
  { value: "all", label },
  ...[...new Set(values)].map((value) => ({ value, label: value })),
]

export function CatalogGrid({ catalogs }: { catalogs: Catalog[] }) {
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState("all")

  const search = query.trim().toLowerCase()
  const visible = catalogs.filter(
    (catalog) =>
      (topic === "all" || catalog.topic === topic) &&
      (search === "" ||
        `${catalog.title} ${catalog.description}`
          .toLowerCase()
          .includes(search))
  )

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Search guides"
            placeholder="Search guides"
            className="pl-8"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <FilterSelect
          label="Topic"
          options={options(
            "All topics",
            catalogs.map((catalog) => catalog.topic)
          )}
          value={topic}
          onValueChange={setTopic}
        />
      </div>

      {visible.length === 0 ? (
        <Empty className="flex-1 border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LibraryIcon />
            </EmptyMedia>
            <EmptyTitle>No guides match</EmptyTitle>
            <EmptyDescription>
              Try a different search or clear the filters.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((catalog) => (
            <CatalogCard key={catalog.id} catalog={catalog} />
          ))}
        </div>
      )}
    </div>
  )
}

function CatalogCard({ catalog }: { catalog: Catalog }) {
  return (
    <Card className="gap-4 pt-0 [--card-spacing:--spacing(4)]">
      {/* Placeholder thumbnail until guides have preview images. */}
      <div className="relative flex aspect-video items-center justify-center bg-muted text-muted-foreground">
        <LibraryIcon className="size-10" />
        <Badge variant="secondary" className="absolute top-3 left-3 bg-card">
          {catalog.topic}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col gap-2">
        <CardTitle className="font-sans text-lg font-semibold">
          {catalog.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {catalog.description}
        </CardDescription>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground [&_svg]:size-4">
          <span className="flex items-center gap-1.5">
            <LayersIcon />
            {catalog.items} items
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon />
            {catalog.updated}
          </span>
          <span className="flex items-center gap-1.5">
            <UsersIcon />
            {catalog.owner}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <Separator />
        <a
          href={`/catalogs/${catalog.id}`}
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View guide
          <ArrowRightIcon className="size-4" />
        </a>
      </CardFooter>
    </Card>
  )
}

function FilterSelect({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string
  options: Option[]
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <Select
      items={options}
      value={value}
      onValueChange={(next) => onValueChange((next as string | null) ?? "all")}
    >
      <SelectTrigger aria-label={label} className="w-56">
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
  )
}
