"use client"

import "@xyflow/react/dist/style.css"

import {
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type BuiltInEdge,
  type Node,
  type NodeProps,
} from "@xyflow/react"
import { InfoIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PhaseTimeline } from "@/components/phase-timeline"
import { StepDetailPanel } from "@/components/step-detail-panel"
import { StepCard } from "@/components/step-card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { FlowPhase, FlowStep } from "@/lib/legacy-process-flow"
import {
  hasActiveFilters,
  stepMatchesFilters,
  type FlowFilters,
} from "@/lib/flow-filters"
import { dummyStepDetail } from "@/lib/step-details"
import { cn } from "@/lib/utils"

const LABEL_WIDTH = 200
// Cards stretch above this width to fill wide screens.
const MIN_CARD_WIDTH = 260
// Minimum card height; rows grow to fit their tallest card.
const CARD_HEIGHT = 96
const COLUMN_GAP = 56
const ROW_GAP = 56
// Phases wrap onto extra lines after as many steps as fit the width, but never
// fewer than this; narrower screens scale the chart down instead.
const MIN_COLUMNS = 3

const graphWidth = (columns: number, cardWidth: number) =>
  LABEL_WIDTH + columns * (cardWidth + COLUMN_GAP) - COLUMN_GAP

// Columns that fit the available width, and card width that fills it.
function fitLayout(availableWidth: number, longestPhase: number) {
  const fit = Math.floor(
    (availableWidth - LABEL_WIDTH + COLUMN_GAP) / (MIN_CARD_WIDTH + COLUMN_GAP)
  )
  const columns = Math.max(
    1,
    Math.min(longestPhase, Math.max(MIN_COLUMNS, fit))
  )
  const cardWidth = Math.max(
    MIN_CARD_WIDTH,
    (availableWidth - LABEL_WIDTH - (columns - 1) * COLUMN_GAP) / columns
  )
  return { columns, cardWidth }
}

const EDGE_COLOR = "var(--primary)"

type PhaseNode = Node<{ phase: FlowPhase; onOpen: () => void }, "phase">
type StepNode = Node<
  { step: FlowStep; onOpen: () => void; dimmed: boolean; exception: boolean },
  "step"
>

type FlowLine = { phase: FlowPhase; steps: FlowStep[] }

// Splits every phase into lines of at most `columns` steps.
const toLines = (phases: FlowPhase[], columns: number): FlowLine[] =>
  phases.flatMap((phase) =>
    Array.from({ length: Math.ceil(phase.steps.length / columns) }, (_, i) => ({
      phase,
      steps: phase.steps.slice(i * columns, (i + 1) * columns),
    }))
  )

const rowHeight = (rowHeights: number[], row: number) =>
  Math.max(CARD_HEIGHT, rowHeights[row] ?? 0)

const nodeTypes = { phase: PhaseNodeView, step: StepNodeView }

function buildGraph(
  phases: FlowPhase[],
  rowHeights: number[],
  columns: number,
  cardWidth: number,
  onOpenPhase: (phase: FlowPhase) => void,
  onOpenStep: (step: FlowStep) => void,
  isDimmed: (step: FlowStep) => boolean
) {
  const nodes: (PhaseNode | StepNode)[] = []
  const edges: BuiltInEdge[] = []
  const edgeStyle = { stroke: EDGE_COLOR, strokeWidth: 1.5 }
  const markerEnd = { type: MarkerType.ArrowClosed, color: EDGE_COLOR }
  const elbow = (from: FlowStep, to: FlowStep): BuiltInEdge => ({
    id: `${from.id}-${to.id}`,
    source: from.id,
    sourceHandle: "bottom",
    target: to.id,
    targetHandle: "top",
    type: "smoothstep",
    pathOptions: { borderRadius: 16, offset: 2 },
    style: edgeStyle,
    markerEnd,
  })

  const lines = toLines(phases, columns)
  const lineY: number[] = []
  let y = 0
  lines.forEach((line, row) => {
    const height = rowHeight(rowHeights, row)
    lineY.push(y)
    const exception = Boolean(line.phase.exception)

    line.steps.forEach((step, column) => {
      nodes.push({
        id: step.id,
        type: "step",
        position: { x: LABEL_WIDTH + column * (cardWidth + COLUMN_GAP), y },
        width: cardWidth,
        height,
        // React Flow disables pointer events on non-interactive nodes.
        style: { pointerEvents: "all" },
        data: {
          step,
          onOpen: () => onOpenStep(step),
          dimmed: isDimmed(step),
          exception,
        },
      })

      const next = line.steps[column + 1]
      if (next) {
        edges.push({
          id: `${step.id}-${next.id}`,
          source: step.id,
          sourceHandle: "right",
          target: next.id,
          targetHandle: "left",
          type: "straight",
          style: edgeStyle,
          markerEnd,
        })
      }
    })

    // Elbow from this line's last step to the next line's first step. The
    // exception paths aren't reached from P11, so no elbow leads into them.
    const last = line.steps.at(-1)
    const nextLine = lines[row + 1]
    const startsExceptions =
      nextLine?.phase.exception && nextLine.phase !== line.phase
    if (last && nextLine && !startsExceptions) {
      edges.push(elbow(last, nextLine.steps[0]))
    }

    y += height + ROW_GAP
  })

  // Each phase label spans all of its lines.
  phases.forEach((phase) => {
    const rows = lines.flatMap((line, row) =>
      line.phase === phase ? [row] : []
    )
    if (rows.length === 0) return
    const first = rows[0]
    const last = rows[rows.length - 1]
    nodes.push({
      id: phase.id,
      type: "phase",
      position: { x: 0, y: lineY[first] },
      width: LABEL_WIDTH - 16,
      height: lineY[last] + rowHeight(rowHeights, last) - lineY[first],
      // React Flow disables pointer events on non-interactive nodes.
      style: { pointerEvents: "all" },
      data: { phase, onOpen: () => onOpenPhase(phase) },
    })
  })

  const width = graphWidth(columns, cardWidth)
  const height = y - ROW_GAP
  return { nodes, edges, width, height }
}

const noopSubscribe = () => () => {}

export function ProcessFlow({
  phases,
  filters,
}: {
  phases: FlowPhase[]
  filters?: FlowFilters
}) {
  const { resolvedTheme } = useTheme()
  // The theme is only known on the client; render light first to match SSR.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  // Fit as many columns as the container allows and stretch cards to fill it.
  // Below MIN_COLUMNS the chart is scaled down instead. Re-measured on resize.
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(() =>
    graphWidth(MIN_COLUMNS, MIN_CARD_WIDTH)
  )
  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    // Apply the first size right away, then wait for resizing to settle:
    // re-laying out the whole chart on every frame of the sidebar animation
    // makes it choppy.
    let timer: ReturnType<typeof setTimeout> | undefined
    let measured = false
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      if (!measured) {
        measured = true
        setContainerWidth(width)
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => setContainerWidth(width), 150)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])
  const longestPhase = Math.max(...phases.map((phase) => phase.steps.length))
  const { columns, cardWidth } = fitLayout(containerWidth, longestPhase)

  // Measure each card's natural height off-screen so every row fits its
  // tallest card. Re-measured whenever sizes change (e.g. web fonts load).
  const measureRef = useRef<HTMLDivElement>(null)
  const [rowHeights, setRowHeights] = useState<number[]>([])
  useEffect(() => {
    const element = measureRef.current
    if (!element) return
    let frame = 0
    const measure = () => {
      frame = 0
      const rows = Array.from(element.children, (row) =>
        Math.max(0, ...Array.from(row.children, (card) => card.scrollHeight))
      )
      setRowHeights((current) =>
        rows.every((h, i) => h === current[i]) ? current : rows
      )
    }
    // Defer to the next frame so the re-layout this triggers doesn't happen
    // inside the observer callback ("ResizeObserver loop" warnings).
    const observer = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(measure)
    })
    for (const row of element.children) {
      for (const card of row.children) observer.observe(card)
    }
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [phases, columns])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const stepPanelRef = useRef<HTMLDivElement>(null)
  const showStep = () => setDrawerOpen(true)

  // Keep the last phase while its drawer animates closed.
  const [openPhase, setOpenPhase] = useState<FlowPhase | null>(null)
  const [phaseDrawerOpen, setPhaseDrawerOpen] = useState(false)
  const showPhase = (phase: FlowPhase) => {
    setOpenPhase(phase)
    setPhaseDrawerOpen(true)
  }

  const { nodes, edges, width, height } = buildGraph(
    phases,
    rowHeights,
    columns,
    cardWidth,
    showPhase,
    showStep,
    // Fade steps that don't match the active filters.
    (step) =>
      !!filters &&
      hasActiveFilters(filters) &&
      !stepMatchesFilters(step, filters)
  )

  const zoom = Math.min(1, containerWidth / width)

  return (
    <div
      ref={containerRef}
      style={{ height: (height + 24) * zoom }}
      className="relative w-full"
    >
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 h-0 overflow-hidden"
      >
        {toLines(phases, columns).map((line) => (
          <div key={line.steps[0].id}>
            {line.steps.map((step) => (
              <div key={step.id} style={{ width: cardWidth }}>
                <StepCard step={step} dashed={line.phase.exception} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        colorMode={hydrated && resolvedTheme === "dark" ? "dark" : "light"}
        style={{ backgroundColor: "transparent" }}
        viewport={{ x: 0, y: 0, zoom }}
        minZoom={0.1}
        maxZoom={1}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      />
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          initialFocus={stepPanelRef}
          className="overflow-y-auto data-[side=right]:sm:max-w-xl"
        >
          {/* Placeholder: every step shows the same dummy step detail. */}
          <StepDetailPanel ref={stepPanelRef} detail={dummyStepDetail} />
        </SheetContent>
      </Sheet>
      <Sheet open={phaseDrawerOpen} onOpenChange={setPhaseDrawerOpen}>
        <SheetContent
          side="right"
          className="overflow-y-auto data-[side=right]:sm:max-w-xl"
        >
          {openPhase && (
            <>
              <SheetHeader>
                <span className="text-xs font-semibold text-muted-foreground">
                  {openPhase.id}
                </span>
                <SheetTitle className="text-lg">{openPhase.title}</SheetTitle>
                {openPhase.description && (
                  <SheetDescription>{openPhase.description}</SheetDescription>
                )}
              </SheetHeader>
              <div className="flex flex-col gap-3 px-4 pb-4">
                <h4 className="text-sm font-semibold">
                  {openPhase.steps.length} steps
                </h4>
                <PhaseTimeline
                  steps={openPhase.steps}
                  onSelectStep={() => {
                    setPhaseDrawerOpen(false)
                    showStep()
                  }}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Invisible connection points; the diagram is static.
function Handles() {
  const hidden = { opacity: 0 }
  return (
    <>
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        isConnectable={false}
        style={hidden}
      />
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={hidden}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        isConnectable={false}
        style={hidden}
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={hidden}
      />
    </>
  )
}

function PhaseNodeView({ data }: NodeProps<PhaseNode>) {
  return (
    <div className="flex size-full flex-col justify-center border-y border-l-2 border-l-muted-foreground bg-linear-to-r from-base-secondary to-transparent px-3">
      <span className="text-xs font-semibold text-muted-foreground">
        {data.phase.id}
      </span>
      <button
        type="button"
        onClick={data.onOpen}
        className="group w-fit cursor-pointer rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h3 className="text-base leading-snug font-semibold text-primary transition-colors group-hover:text-primary/80">
          {data.phase.title}
        </h3>
      </button>
      {data.phase.description && (
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="xs"
                className="mt-1 -ml-1.5 w-fit text-muted-foreground"
                aria-label={`Info about ${data.phase.title}`}
              />
            }
          >
            <InfoIcon data-icon="inline-start" />
            Info
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-72">
            <p className="text-sm text-muted-foreground">
              {data.phase.description}
            </p>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

function StepNodeView({ data }: NodeProps<StepNode>) {
  return (
    <>
      <Handles />
      <button
        type="button"
        onClick={data.onOpen}
        className={cn(
          "block size-full cursor-pointer rounded-lg text-left transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-ring",
          data.dimmed && "opacity-30"
        )}
      >
        <StepCard step={data.step} dashed={data.exception} className="h-full" />
      </button>
    </>
  )
}
