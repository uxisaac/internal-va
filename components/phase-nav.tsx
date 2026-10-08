"use client"

import { useEffect, useRef, useState } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FlowPhase } from "@/lib/legacy-process-flow"
import { cn } from "@/lib/utils"

const phaseNode = (id: string) =>
  document.querySelector<HTMLElement>(`.react-flow__node[data-id="${id}"]`)

// Sticky tab bar that jumps to a phase in the flowchart and highlights the
// phase currently in view.
export function PhaseNav({ phases }: { phases: FlowPhase[] }) {
  const barRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(phases[0]?.id ?? "")
  const [stuck, setStuck] = useState(false)

  // Keep the active tab visible in the horizontally scrolling bar. Scrolls only
  // the bar, so it doesn't interrupt the page's own smooth scroll.
  useEffect(() => {
    const scroller = scrollerRef.current
    const tab = scroller?.querySelector<HTMLElement>(`[data-phase="${active}"]`)
    if (!scroller || !tab) return
    const left = tab.offsetLeft - scroller.offsetLeft
    const right = left + tab.offsetWidth
    if (
      left < scroller.scrollLeft ||
      right > scroller.scrollLeft + scroller.clientWidth
    ) {
      scroller.scrollTo({ left: left - 16, behavior: "smooth" })
    }
  }, [active])

  // Where the bar's bottom edge sits once pinned under the header; content
  // above it is hidden. Measured from the sticky offset, not the bar's current
  // position, which is lower before it sticks.
  const scrollOffset = () => {
    const bar = barRef.current
    if (!bar) return 0
    return parseFloat(getComputedStyle(bar).top) + bar.offsetHeight + 16
  }

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const offset = scrollOffset()
      let current = phases[0]?.id ?? ""
      for (const phase of phases) {
        const node = phaseNode(phase.id)
        if (node && node.getBoundingClientRect().top <= offset + 1) {
          current = phase.id
        }
      }
      setActive(current)

      // Pinned once the bar reaches its sticky offset under the header.
      const bar = barRef.current
      if (bar) {
        const stickyTop = parseFloat(getComputedStyle(bar).top)
        setStuck(bar.getBoundingClientRect().top <= stickyTop + 0.5)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [phases])

  const scrollToPhase = (id: string) => {
    const node = phaseNode(id)
    if (!node) return
    setActive(id)
    window.scrollTo({
      top: window.scrollY + node.getBoundingClientRect().top - scrollOffset(),
      behavior: "smooth",
    })
  }

  return (
    // z-4: below the page header (z-5) and the fixed sidebar (z-10) so it
    // slides under the sidebar when the page scrolls sideways.
    <div
      ref={barRef}
      className={cn(
        "sticky top-12 z-4 border-b px-4 pt-1 transition-colors group-has-data-[collapsible=icon]/sidebar-wrapper:top-10",
        stuck ? "bg-card" : "bg-background"
      )}
    >
      <Tabs
        value={active}
        onValueChange={(value) => scrollToPhase(value as string)}
      >
        {/* Titles are too long for one line, so the bar scrolls sideways.
            w-0 + min-w-full keeps the tabs' full width from widening the page. */}
        <div
          ref={scrollerRef}
          className="w-0 min-w-full [scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          <TabsList variant="line" className="w-max">
            {phases.map((phase) => (
              <TabsTrigger
                key={phase.id}
                value={phase.id}
                data-phase={phase.id}
                className="flex-none gap-1.5 after:bg-primary"
              >
                <span className="text-muted-foreground">{phase.id}</span>
                {phase.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}
