"use client"

import { useSyncExternalStore } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PERSONAS = [
  { value: "agent", label: "Agent" },
  { value: "coordinator", label: "Coordinator" },
  { value: "aao", label: "AAO" },
  { value: "ci", label: "Compliance Inspector" },
]

const STORAGE_KEY = "persona"
const DEFAULT_PERSONA = "agent"
// Fired after this tab saves a choice; "storage" only fires in other tabs.
const CHANGE_EVENT = "persona-change"

function readPersona() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return PERSONAS.some((option) => option.value === saved)
      ? (saved as string)
      : DEFAULT_PERSONA
  } catch {
    // Storage can be blocked; Agent stays selected.
    return DEFAULT_PERSONA
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function savePersona(next: string) {
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Storage can be blocked; nothing to remember the choice in.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

// The selected persona's value, kept in sync across every component using it.
const usePersona = () =>
  useSyncExternalStore(subscribe, readPersona, () => DEFAULT_PERSONA)

// The selected persona's display name, e.g. "Agent".
export function usePersonaLabel() {
  const persona = usePersona()
  return PERSONAS.find((option) => option.value === persona)?.label ?? "Agent"
}

// The VA staff role the tool is being viewed as. Remembered in this browser
// so it carries across pages; defaults to Agent.
export function PersonaSelect() {
  const persona = usePersona()

  return (
    <div className="flex items-center gap-2">
      <Label
        htmlFor="persona-select"
        className="text-sm text-muted-foreground max-sm:sr-only"
      >
        Persona
      </Label>
      <Select
        items={PERSONAS}
        value={persona}
        onValueChange={(next) =>
          savePersona((next as string | null) ?? DEFAULT_PERSONA)
        }
      >
        <SelectTrigger id="persona-select" size="sm" className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PERSONAS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
