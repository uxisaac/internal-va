export type SourcedText = {
  text: string
  source: string
}

export type StepDetail = {
  stepId: string
  phaseTitle: string
  title: string
  summary: string
  openQuestions: SourcedText[]
  trainingNotes: SourcedText[]
  actors: string[]
  systems: string[]
  documentsIn: string[]
  documentsOut: string[]
  guide?: string
}

// Placeholder content until real step details exist.
export const dummyStepDetail: StepDetail = {
  stepId: "S0.1",
  phaseTitle: "Eligibility and assignment",
  title: "Application received (26-4555)",
  summary:
    "Veteran applies, on paper or online. An electronic 26-4555 needs no signature and appears on the SAHSHA Form 26-4555 screen.",
  openQuestions: [
    {
      text: "The Chapter 1 deck still sends online applications through eBenefits, which the map records as retired. Which online path carries the 26-4555 now, and does it still create the Coordinator's work bucket?",
      source: "Chapter 1 deck",
    },
  ],
  trainingNotes: [
    {
      text: "A paper 26-4555 can go to the Evidence Intake Center by mail or fax, or to the RLC by mail, email, fax or hand delivery. The RLC records a paper application in the system before it goes to the Veterans Service Center.",
      source: "Chapter 1 deck",
    },
    {
      text: "For a paper application the Agent checks that the Veteran information is complete, the three questions are answered, the form is signed by the Veteran or the POA, and the version date at the bottom left is current, then sends it to the Coordinator. An online application creates a work bucket for the Coordinator.",
      source: "Chapter 1 deck",
    },
    {
      text: "When someone other than the Veteran signed the 26-4555, the Agent follows up to establish whether the Veteran is able to sign documents.",
      source: "Chapter 1 deck",
    },
    {
      text: "The 26-4555 is an application, not an approval. Eligibility is established by two things together: a rating decision granting the entitlement and a properly completed 26-4555. An inferred rating creates the record when the Veteran met the criteria without applying.",
      source: "Chapter 1 deck",
    },
  ],
  actors: ["Veteran", "SAH Coordinators"],
  systems: ["SAHSHA", "eBenefits"],
  documentsIn: ["VA Form 26-4555"],
  documentsOut: [],
  guide: "Form 26-4555",
}
