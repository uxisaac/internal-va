// Placeholder catalogs until real content exists.
export type Outcome = {
  title: string
  description: string
}

export type ChapterItem = {
  title: string
  minutes: number
}

export type Chapter = {
  title: string
  items: ChapterItem[]
}

export type Catalog = {
  id: string
  title: string
  description: string
  topic: string
  items: number
  updated: string
  owner: string
  /** What a reader takes away from the guide. */
  outcomes: Outcome[]
  /** The guide's contents, shown as an accordion. */
  chapters: Chapter[]
}

export const catalogs: Catalog[] = [
  {
    id: "forms",
    title: "VA Forms Library",
    description:
      "Each grant activity, who carries it out and what has to be true, with the process steps behind it.",
    topic: "Forms",
    items: 42,
    updated: "Updated 2 days ago",
    owner: "Coordinators",
    outcomes: [
      {
        title: "Find the right form fast",
        description:
          "Know which form each step needs, from the 26-4555 application to the 26-1858d Final Field Review.",
      },
      {
        title: "Check a form is complete",
        description:
          "Spot missing signatures, unanswered questions and out-of-date versions before a form moves on.",
      },
      {
        title: "Route forms correctly",
        description:
          "Send each form to the Evidence Intake Center, the RLC or a Coordinator through the right channel.",
      },
      {
        title: "Track form versions",
        description:
          "See which version is current and what changed, so nobody works from an old template.",
      },
      {
        title: "Link forms to steps",
        description:
          "Jump from a form to the process step that uses it and back again.",
      },
      {
        title: "Handle exceptions",
        description:
          "Know which forms change when a case is suspended, transferred or reopened.",
      },
    ],
    chapters: [
      {
        title: "Getting started",
        items: [
          { title: "How the forms library is organised", minutes: 4 },
          { title: "Finding a form by step", minutes: 3 },
          { title: "Reading a form's history", minutes: 5 },
        ],
      },
      {
        title: "Application and eligibility forms",
        items: [
          { title: "VA Form 26-4555", minutes: 8 },
          { title: "Eligibility letters", minutes: 6 },
          { title: "Common application errors", minutes: 7 },
        ],
      },
      {
        title: "Construction and inspection forms",
        items: [
          { title: "Compliance Inspection Report (26-1839)", minutes: 9 },
          { title: "Change orders", minutes: 6 },
          { title: "Stage disbursement requests", minutes: 7 },
        ],
      },
      {
        title: "Close-out forms",
        items: [
          { title: "Final Field Review (26-1858d)", minutes: 8 },
          { title: "Lien release and holdback", minutes: 5 },
          { title: "Final Accounting", minutes: 6 },
        ],
      },
    ],
  },
  {
    id: "screens",
    title: "SAHSHA Screens",
    description:
      "A screen-by-screen reference for SAHSHA, showing which fields Agents complete at each step and what the next screen expects.",
    topic: "Systems",
    items: 37,
    updated: "Updated 1 week ago",
    owner: "Agents",
    outcomes: [
      {
        title: "Navigate SAHSHA with confidence",
        description:
          "Move between the screens Agents use most without losing your place in a case.",
      },
      {
        title: "Complete each screen correctly",
        description:
          "Know which fields are required, which are optional and what each one feeds downstream.",
      },
      {
        title: "Avoid common errors",
        description:
          "Recognise the validation messages that block a case and how to clear them.",
      },
      {
        title: "Hand off between roles",
        description:
          "See which screens Coordinators and AAO review after an Agent submits.",
      },
      {
        title: "Use the escrow and accounting screens",
        description:
          "Record disbursements and Final Accounting without rework.",
      },
      {
        title: "Find screens by step",
        description:
          "Look up the SAHSHA screens behind any step in the legacy process map.",
      },
    ],
    chapters: [
      {
        title: "SAHSHA basics",
        items: [
          { title: "Signing in and finding a case", minutes: 4 },
          { title: "Reading the case summary", minutes: 5 },
          { title: "Saving and resuming work", minutes: 3 },
        ],
      },
      {
        title: "Intake screens",
        items: [
          { title: "Form 26-4555 screen", minutes: 7 },
          { title: "Eligibility screens", minutes: 6 },
          { title: "Assignment screens", minutes: 5 },
        ],
      },
      {
        title: "Grant screens",
        items: [
          { title: "Checklist screens", minutes: 9 },
          { title: "Escrow Processing screen", minutes: 8 },
          { title: "Disbursement screens", minutes: 7 },
        ],
      },
      {
        title: "Close-out screens",
        items: [
          { title: "Final Accounting screen", minutes: 6 },
          { title: "Closing a project", minutes: 5 },
          { title: "Reopening a case", minutes: 4 },
        ],
      },
    ],
  },
  {
    id: "systems",
    title: "Systems and Tools",
    description:
      "VBMS, SHARE, SIM, eBenefits and the other systems the grant touches, with what each one is used for and who has access.",
    topic: "Systems",
    items: 14,
    updated: "Updated 3 weeks ago",
    owner: "Program office",
    outcomes: [
      {
        title: "Know what each system is for",
        description:
          "Understand the role of VBMS, SHARE, SIM, eBenefits and SAHSHA in the grant.",
      },
      {
        title: "Request the right access",
        description:
          "Find out who grants access to each system and how long it takes.",
      },
      {
        title: "Move information between systems",
        description: "Follow how a record in one system shows up in the next.",
      },
      {
        title: "Choose the right tool",
        description:
          "Pick between cost estimators, county sites and internal tools for each task.",
      },
      {
        title: "Troubleshoot outages",
        description: "Know the workarounds when a system is down mid-case.",
      },
      {
        title: "Keep records consistent",
        description:
          "Avoid conflicting data when the same fact lives in two systems.",
      },
    ],
    chapters: [
      {
        title: "System overview",
        items: [
          { title: "How the systems fit together", minutes: 6 },
          { title: "Who uses what", minutes: 4 },
          { title: "Getting access", minutes: 5 },
        ],
      },
      {
        title: "Benefits systems",
        items: [
          { title: "VBMS", minutes: 7 },
          { title: "eBenefits", minutes: 5 },
          { title: "SHARE", minutes: 6 },
        ],
      },
      {
        title: "Grant and payment systems",
        items: [
          { title: "SAHSHA", minutes: 8 },
          { title: "SIM", minutes: 6 },
          { title: "VA-FSC vendor file and EFT", minutes: 7 },
        ],
      },
      {
        title: "Supporting tools",
        items: [
          { title: "County auditor sites", minutes: 4 },
          { title: "Cost estimators", minutes: 5 },
          { title: "When a system is down", minutes: 6 },
        ],
      },
    ],
  },
  {
    id: "roles",
    title: "Roles and Actors",
    description:
      "Who does what: Agents, Coordinators, AAO, CI, builders and Veterans, mapped to the steps and decisions they own.",
    topic: "People",
    items: 18,
    updated: "Updated yesterday",
    owner: "Program office",
    outcomes: [
      {
        title: "Know who owns each step",
        description:
          "See which role is responsible, consulted or informed at every step.",
      },
      {
        title: "Understand handoffs",
        description:
          "Follow how work moves between Agents, Coordinators, AAO and CIs.",
      },
      {
        title: "Work with builders",
        description:
          "Know what to expect from builders at bids, contract and construction.",
      },
      {
        title: "Support Veterans and families",
        description:
          "Understand when the Veteran, POA or next of kin needs to act.",
      },
      {
        title: "Escalate the right way",
        description:
          "Know who to contact when a step is blocked or a decision is disputed.",
      },
      {
        title: "Cover for a colleague",
        description:
          "Pick up another role's work without missing required steps.",
      },
    ],
    chapters: [
      {
        title: "Roles at a glance",
        items: [
          { title: "The core roles", minutes: 5 },
          { title: "Who decides what", minutes: 6 },
          { title: "Reading the responsibility map", minutes: 4 },
        ],
      },
      {
        title: "VA staff",
        items: [
          { title: "Agents", minutes: 7 },
          { title: "Coordinators", minutes: 6 },
          { title: "AAO and CI", minutes: 7 },
        ],
      },
      {
        title: "Outside the VA",
        items: [
          { title: "Veterans, POA and family", minutes: 6 },
          { title: "Builders", minutes: 6 },
          { title: "Next of kin", minutes: 4 },
        ],
      },
      {
        title: "Working together",
        items: [
          { title: "Handoffs between roles", minutes: 7 },
          { title: "Escalation paths", minutes: 5 },
          { title: "Covering for a colleague", minutes: 4 },
        ],
      },
    ],
  },
  {
    id: "letters",
    title: "Letters and Templates",
    description:
      "Eligibility, feasibility, After Interview and close-out letters, with the template version and the step that sends each one.",
    topic: "Forms",
    items: 23,
    updated: "Updated 4 days ago",
    owner: "Coordinators",
    outcomes: [
      {
        title: "Pick the right letter",
        description:
          "Know which letter each step sends, from eligibility to close-out.",
      },
      {
        title: "Use the current template",
        description:
          "Find the latest version of each template and what changed.",
      },
      {
        title: "Personalise without errors",
        description:
          "Fill in case details correctly and avoid common mistakes.",
      },
      {
        title: "Send through the right channel",
        description: "Choose email, postal mail or eBenefits for each letter.",
      },
      {
        title: "Record what was sent",
        description:
          "Log every letter in SAHSHA so the case history stays complete.",
      },
      {
        title: "Write clear follow-ups",
        description: "Draft follow-up letters when a Veteran hasn't responded.",
      },
    ],
    chapters: [
      {
        title: "Letter basics",
        items: [
          { title: "Where templates live", minutes: 4 },
          { title: "Personalising a letter", minutes: 5 },
          { title: "Logging a letter in SAHSHA", minutes: 4 },
        ],
      },
      {
        title: "Early-stage letters",
        items: [
          { title: "Eligibility letter", minutes: 6 },
          { title: "Feasibility letter", minutes: 7 },
          { title: "Pre-interview materials", minutes: 5 },
        ],
      },
      {
        title: "Mid-process letters",
        items: [
          { title: "After Interview letter", minutes: 6 },
          { title: "Conditional Approval notice", minutes: 6 },
          { title: "Follow-up letters", minutes: 5 },
        ],
      },
      {
        title: "Close-out letters",
        items: [
          { title: "Completion letter", minutes: 5 },
          { title: "Holdback release", minutes: 4 },
          { title: "Project closure", minutes: 4 },
        ],
      },
    ],
  },
  {
    id: "steps",
    title: "Process Steps",
    description:
      "Every step of the legacy process, grouped by phase, with the forms, roles and systems each one uses.",
    topic: "Process",
    items: 44,
    updated: "Updated today",
    owner: "Coordinators",
    outcomes: [],
    chapters: [],
  },
  {
    id: "training",
    title: "Training Material",
    description:
      "Chapter decks and guides behind the process map, with the notes, open questions and conflicts raised from each one.",
    topic: "Training",
    items: 9,
    updated: "Updated today",
    owner: "Training team",
    outcomes: [
      {
        title: "Find the source material",
        description:
          "Locate the chapter decks and guides behind each step of the process map.",
      },
      {
        title: "Read the notes in context",
        description: "See training notes next to the step they describe.",
      },
      {
        title: "Answer open questions",
        description:
          "Understand what each open question is asking and who can answer it.",
      },
      {
        title: "Resolve conflicts",
        description:
          "Compare conflicting sources and record the agreed answer.",
      },
      {
        title: "Suggest corrections",
        description:
          "Leave a note on a step when the training material is wrong or out of date.",
      },
      {
        title: "Stay up to date",
        description: "See what changed in each new round of training material.",
      },
    ],
    chapters: [
      {
        title: "About the training material",
        items: [
          { title: "Where the material comes from", minutes: 5 },
          { title: "How it maps to steps", minutes: 4 },
          { title: "Reading notes in context", minutes: 4 },
        ],
      },
      {
        title: "Chapter decks",
        items: [
          { title: "Chapter 1: Application and eligibility", minutes: 9 },
          { title: "Chapter 2: Interview and feasibility", minutes: 9 },
          { title: "Chapter 3: Construction and close-out", minutes: 9 },
        ],
      },
      {
        title: "Open questions",
        items: [
          { title: "How questions are raised", minutes: 5 },
          { title: "Answering a question", minutes: 6 },
          { title: "Tracking answers", minutes: 4 },
        ],
      },
      {
        title: "Keeping it current",
        items: [
          { title: "Resolving conflicts", minutes: 7 },
          { title: "Suggesting corrections", minutes: 5 },
          { title: "What changed this round", minutes: 6 },
        ],
      },
    ],
  },
]

// Reference entries shown under Library instead of Guides.
const LIBRARY_IDS = ["forms", "roles", "systems", "screens", "letters"]

export const guides = catalogs.filter(
  (catalog) => !LIBRARY_IDS.includes(catalog.id)
)

export const library = catalogs.filter((catalog) =>
  LIBRARY_IDS.includes(catalog.id)
)

// URL-safe id for a chapter item, from its title.
export const itemSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const itemHref = (guide: Catalog, item: ChapterItem) =>
  `/guides/${guide.id}/${itemSlug(item.title)}`

// Finds a guide's item by slug, with its chapter and position.
export function findItem(guide: Catalog, slug: string) {
  for (const [chapterIndex, chapter] of guide.chapters.entries()) {
    const item = chapter.items.find((entry) => itemSlug(entry.title) === slug)
    if (item) return { chapter, chapterIndex, item }
  }
  return undefined
}
