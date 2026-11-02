"use client"

import { usePersonaLabel } from "@/components/persona-select"

// Text with a "{persona}" placeholder, filled with the selected persona and
// its article, e.g. "Your Role as {persona}" → "Your Role as a Coordinator".
export function PersonaText({ text }: { text: string }) {
  const persona = usePersonaLabel()
  const article = /^[aeiou]/i.test(persona) ? "an" : "a"
  return <>{text.replaceAll("{persona}", `${article} ${persona}`)}</>
}
