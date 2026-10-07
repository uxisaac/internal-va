import type { FlowPhase } from "@/components/flow-diagram"

export const legacyProcessFlow: FlowPhase[] = [
  {
    id: "P0",
    title: "Eligibility and assignment",
    steps: [
      { id: "S0.1", title: "Application received (26-4555)" },
      { id: "S0.2", title: "Eligibility determined; eligibility letter sent" },
      { id: "S0.3", title: "Case assigned to RO and Agent" },
    ],
  },
  {
    id: "P1",
    title: "Interview preparation",
    steps: [
      { id: "S1.1", title: "Research the Veteran in VBMS" },
      { id: "S1.2", title: "Pull property and tax records" },
    ],
  },
  {
    id: "P2",
    title: "Initial contact and materials",
    steps: [
      { id: "S2.1", title: "Initial call: screening questions" },
      { id: "S2.2", title: "Send pre-interview materials" },
      { id: "S2.3", title: "Veteran returns completed forms" },
    ],
  },
  {
    id: "P3",
    title: "Interview and property suitability",
    steps: [
      { id: "S3.1", title: "Interview and deliver grant packet" },
      { id: "S3.2", title: "Property suitability review: photos, sketch" },
      { id: "S3.3", title: "Upload interview documents; After Interview" },
    ],
  },
]
