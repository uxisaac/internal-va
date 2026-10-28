import { CircleHelpIcon, InfoIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { GrantActivity, GrantSection } from "@/lib/grant-process"
import { grantIntro } from "@/lib/grant-process"
import { cn } from "@/lib/utils"

// Summary tiles are hidden for now; set to true to bring them back.
const SHOW_TILES = false

// The grant as a process in its own right: summary tiles, then each
// section's activities as a table. Step chips open the matching legacy step.
export function GrantProcessView({
  sections,
  stepTitles,
  onOpenStep,
}: {
  sections: GrantSection[]
  stepTitles: Record<string, string>
  onOpenStep: (stepId: string) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      {SHOW_TILES && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {grantIntro.tiles.map((tile) => (
            <Card key={tile.label} size="sm" className="gap-1 px-4">
              <span
                className={cn(
                  "text-2xl font-semibold tabular-nums",
                  tile.accent && "text-primary"
                )}
              >
                {tile.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {tile.label}
              </span>
            </Card>
          ))}
        </div>
      )}

      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 border-l-2 border-l-muted-foreground pl-3">
            <span className="text-xs font-semibold text-muted-foreground">
              {section.id}
            </span>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
          </div>
          <ActivityTable
            activities={section.activities}
            stepTitles={stepTitles}
            onOpenStep={onOpenStep}
          />
        </section>
      ))}

      <Alert>
        <InfoIcon />
        <AlertDescription>
          Sections after B (from G7 onwards) haven&apos;t been added yet.
        </AlertDescription>
      </Alert>
    </div>
  )
}

function ActivityTable({
  activities,
  stepTitles,
  onOpenStep,
}: {
  activities: GrantActivity[]
  stepTitles: Record<string, string>
  onOpenStep: (stepId: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table className="min-w-4xl table-fixed">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead className="w-[16%]">Who</TableHead>
            <TableHead className="w-[22%]">What has to be true</TableHead>
            <TableHead className="w-[12%]">Steps</TableHead>
            <TableHead className="w-[12%]">Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow
              key={activity.id}
              id={`gr-${activity.id}`}
              className="[&>td]:align-top [&>td]:whitespace-normal"
            >
              <TableCell className="font-semibold text-muted-foreground">
                {activity.id}
              </TableCell>
              <TableCell>
                <ActivityDetails activity={activity} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {activity.who}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {activity.mustBeTrue}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {activity.steps.map((stepId) => (
                    <Button
                      key={stepId}
                      variant="outline"
                      size="xs"
                      title={stepTitles[stepId]}
                      onClick={() => onOpenStep(stepId)}
                    >
                      {stepId}
                    </Button>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {activity.source}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// The activity cell: badges, title and what it does, plus any open question
// and training-material additions.
function ActivityDetails({ activity }: { activity: GrantActivity }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge
          variant={activity.kind === "program" ? "default" : "secondary"}
          className={cn(
            activity.kind === "program" && "bg-primary/10 text-primary"
          )}
        >
          {activity.kind}
        </Badge>
        {activity.vaDecides && <Badge variant="outline">VA decides</Badge>}
        {!!activity.newItems && (
          <Badge variant="outline" className="text-primary">
            +{activity.newItems} new
          </Badge>
        )}
      </div>
      <p className="font-semibold">{activity.title}</p>
      <p className="text-muted-foreground">{activity.does}</p>
      {activity.question && (
        <div className="flex flex-col items-start gap-2 rounded-md border-l-4 border-primary bg-muted p-3">
          <Badge>
            <CircleHelpIcon data-icon="inline-start" />
            Needs an answer
          </Badge>
          <p>{activity.question.text}</p>
          <span className="text-xs text-muted-foreground">
            From: {activity.question.source}
          </span>
        </div>
      )}
      {activity.additions.length > 0 && (
        <Collapsible>
          <CollapsibleTrigger className="group/fold flex cursor-pointer items-center gap-1 text-sm font-medium text-primary">
            From the training material ({activity.additions.length})
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
              {activity.additions.map((addition) => (
                <li key={addition.text}>
                  {addition.text}{" "}
                  <span className="text-xs text-muted-foreground">
                    ({addition.source})
                  </span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}
