// Training for new Agents: categories of courses, ordered the way a case
// runs. Placeholder content until the real courses are written.
import {
  BadgeCheckIcon,
  BanknoteIcon,
  CalculatorIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  FileTextIcon,
  FlagIcon,
  GavelIcon,
  HammerIcon,
  HardHatIcon,
  HeartHandshakeIcon,
  HourglassIcon,
  HouseIcon,
  LandmarkIcon,
  LifeBuoyIcon,
  MessagesSquareIcon,
  MonitorIcon,
  PresentationIcon,
  RocketIcon,
  RulerIcon,
  ScaleIcon,
  SearchIcon,
  SendIcon,
  SignpostIcon,
  UserRoundIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

export type Outcome = {
  title: string
  description: string
}

export type Lesson = {
  title: string
  minutes: number
}

export type Chapter = {
  title: string
  items: Lesson[]
}

export type Course = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  /** Link text on the course card. */
  cta?: string
  /** What a new Agent takes away from the course. */
  outcomes: Outcome[]
  /** The course's contents, shown as an accordion. */
  chapters: Chapter[]
}

export type Category = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  courses: Course[]
}

export const categories: Category[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "New to the SAH grant team? Start here to learn the program, your role as an Agent and the tools you'll use every day.",
    icon: RocketIcon,
    courses: [
      {
        id: "welcome",
        title: "Welcome to SAH Grants",
        description:
          "What the Specially Adapted Housing program does, the three grant types and the people you'll work with.",
        icon: HouseIcon,
        cta: "Get started",
        outcomes: [
          {
            title: "Explain the program",
            description:
              "Say in plain words what the grant is for and who it helps.",
          },
          {
            title: "Tell the grant types apart",
            description:
              "Know when a case is SAH, SHA or TRA, and why it matters.",
          },
          {
            title: "Know who's involved",
            description:
              "Recognise the Veterans, VA staff and builders you'll work with.",
          },
        ],
        chapters: [
          {
            title: "The program",
            items: [
              { title: "What the SAH program is for", minutes: 5 },
              { title: "Who qualifies", minutes: 6 },
              { title: "The three grant types", minutes: 7 },
            ],
          },
          {
            title: "The people",
            items: [
              { title: "Veterans and their families", minutes: 5 },
              { title: "Coordinators, AAO and CIs", minutes: 6 },
              { title: "Builders", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "agent-role",
        title: "Your Role as an Agent",
        description:
          "What an Agent owns from the first call to close-out, and how your work is reviewed.",
        icon: UserRoundIcon,
        outcomes: [
          {
            title: "Know what you own",
            description: "See which steps and decisions are yours.",
          },
          {
            title: "Manage your caseload",
            description: "Keep many cases moving without missing a deadline.",
          },
          {
            title: "Know when to escalate",
            description: "Bring in a Coordinator or the AAO at the right time.",
          },
        ],
        chapters: [
          {
            title: "Day to day",
            items: [
              { title: "A case from start to finish", minutes: 8 },
              { title: "Managing your caseload", minutes: 6 },
              { title: "Working with Coordinators", minutes: 5 },
            ],
          },
          {
            title: "Doing it right",
            items: [
              { title: "Timeframes you're held to", minutes: 5 },
              { title: "Documenting your work", minutes: 6 },
              { title: "When to escalate", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "toolkit",
        title: "Your Toolkit",
        description:
          "SAHSHA, VBMS, SHARE and the other systems you'll use, with what each one is for.",
        icon: MonitorIcon,
        outcomes: [
          {
            title: "Find your way around SAHSHA",
            description: "Open a case and find the screens each step needs.",
          },
          {
            title: "Research a Veteran",
            description: "Read the VA record in VBMS before the first call.",
          },
          {
            title: "Check payments",
            description: "Confirm disbursements in SHARE at close-out.",
          },
        ],
        chapters: [
          {
            title: "Core systems",
            items: [
              { title: "SAHSHA basics", minutes: 10 },
              { title: "Researching in VBMS", minutes: 7 },
              { title: "Checking payments in SHARE", minutes: 6 },
            ],
          },
          {
            title: "Everyday tools",
            items: [
              { title: "Email and letter templates", minutes: 4 },
              { title: "County property records", minutes: 5 },
              { title: "Cost estimators", minutes: 5 },
            ],
          },
        ],
      },
      {
        id: "training",
        title: "Training Decks",
        description:
          "The chapter decks behind the process map, with the notes, open questions and conflicts raised from each one.",
        icon: PresentationIcon,
        outcomes: [
          {
            title: "Find the source material",
            description:
              "Locate the chapter decks and guides behind each step of the process map.",
          },
          {
            title: "Answer open questions",
            description:
              "Understand what each open question is asking and who can answer it.",
          },
          {
            title: "Suggest corrections",
            description:
              "Leave a note on a step when the training material is wrong or out of date.",
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
            title: "Keeping it current",
            items: [
              { title: "Resolving conflicts", minutes: 7 },
              { title: "Suggesting corrections", minutes: 5 },
              { title: "What changed this round", minutes: 6 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "intake",
    title: "Eligibility and Intake",
    description:
      "How a case starts: the application, eligibility and entitlement, and what you check before the first call.",
    icon: ClipboardCheckIcon,
    courses: [
      {
        id: "application",
        title: "Reading the Application",
        description:
          "Check a 26-4555 is complete and know what happens when it arrives on paper or online.",
        icon: FileTextIcon,
        outcomes: [
          {
            title: "Check an application",
            description:
              "Spot missing answers, signatures and out-of-date versions.",
          },
          {
            title: "Handle both channels",
            description: "Know how paper and online applications differ.",
          },
          {
            title: "Open the case",
            description: "Know what the Coordinators do once it arrives.",
          },
        ],
        chapters: [
          {
            title: "The 26-4555",
            items: [
              { title: "What the form asks", minutes: 6 },
              { title: "Checking it's complete", minutes: 5 },
              { title: "Paper and online applications", minutes: 4 },
            ],
          },
          {
            title: "Next steps",
            items: [
              { title: "Opening the case", minutes: 4 },
              { title: "Common problems", minutes: 5 },
            ],
          },
        ],
      },
      {
        id: "eligibility",
        title: "Eligibility and Entitlement",
        description:
          "How VA decides a Veteran qualifies, how much grant is left to them and what the eligibility letter says.",
        icon: BadgeCheckIcon,
        outcomes: [
          {
            title: "Read a rating decision",
            description: "Find the entitlement and the reasons behind it.",
          },
          {
            title: "Work out what's left",
            description: "Check prior use against the current limits.",
          },
          {
            title: "Explain the letter",
            description: "Walk a Veteran through their eligibility letter.",
          },
        ],
        chapters: [
          {
            title: "Eligibility",
            items: [
              { title: "Rating decisions", minutes: 7 },
              { title: "Inferred ratings", minutes: 5 },
              { title: "The eligibility letter", minutes: 4 },
            ],
          },
          {
            title: "Entitlement",
            items: [
              { title: "Grant limits and uses", minutes: 6 },
              { title: "Prior grant use", minutes: 5 },
            ],
          },
        ],
      },
      {
        id: "first-contact",
        title: "Preparing for First Contact",
        description:
          "Research the Veteran and the property, then make the first call with the screening questions.",
        icon: SearchIcon,
        outcomes: [
          {
            title: "Do your homework",
            description:
              "Know the Veteran's record and the home before you call.",
          },
          {
            title: "Run the first call",
            description: "Ask the screening questions and set expectations.",
          },
          {
            title: "Get forms back",
            description: "Send pre-interview materials and follow them up.",
          },
        ],
        chapters: [
          {
            title: "Research",
            items: [
              { title: "Reading the VA record", minutes: 6 },
              { title: "Property and tax records", minutes: 5 },
            ],
          },
          {
            title: "The first call",
            items: [
              { title: "Screening questions", minutes: 6 },
              { title: "Sending pre-interview materials", minutes: 5 },
              { title: "Following up on returned forms", minutes: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "feasibility",
    title: "Interview and Feasibility",
    description:
      "Run the home interview, review the property and decide whether adapting the home is feasible.",
    icon: HouseIcon,
    courses: [
      {
        id: "home-interview",
        title: "The Home Interview",
        description:
          "Plan the visit, talk through the Veteran's needs and leave with the grant packet signed.",
        icon: MessagesSquareIcon,
        outcomes: [
          {
            title: "Plan the visit",
            description: "Know what to bring and who should be there.",
          },
          {
            title: "Understand the need",
            description: "Record the need in the Veteran's own terms.",
          },
          {
            title: "Wrap it up",
            description:
              "Upload documents and send the After Interview letter.",
          },
        ],
        chapters: [
          {
            title: "Before the visit",
            items: [
              { title: "Planning the interview", minutes: 5 },
              { title: "The grant packet", minutes: 6 },
            ],
          },
          {
            title: "During the visit",
            items: [
              { title: "Talking through needs", minutes: 7 },
              { title: "Getting forms signed", minutes: 5 },
              { title: "Phone interviews", minutes: 4 },
            ],
          },
          {
            title: "After the visit",
            items: [
              { title: "Uploading documents", minutes: 4 },
              { title: "The After Interview letter", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "property-review",
        title: "Property Suitability Review",
        description:
          "Measure, photograph and sketch the home, and confirm the Veteran's ownership interest.",
        icon: RulerIcon,
        outcomes: [
          {
            title: "Capture the home",
            description: "Take photos, a sketch and measurements that help.",
          },
          {
            title: "Check the lot",
            description: "Look at slope, flood zone, HOA rules and access.",
          },
          {
            title: "Confirm ownership",
            description: "Verify ownership interest and VMLI status.",
          },
        ],
        chapters: [
          {
            title: "On site",
            items: [
              { title: "Photos that help", minutes: 5 },
              { title: "Sketches and measurements", minutes: 7 },
              { title: "Lots, access and flood zones", minutes: 6 },
            ],
          },
          {
            title: "Ownership",
            items: [
              { title: "Verifying ownership interest", minutes: 6 },
              { title: "VMLI status", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "feasibility-decision",
        title: "Feasibility and Conditional Approval",
        description:
          "Make and document the feasibility decision, then request Conditional Approval.",
        icon: ScaleIcon,
        outcomes: [
          {
            title: "Apply the tests",
            description:
              "Weigh medical, financial and property feasibility for SAH.",
          },
          {
            title: "Write the letter",
            description: "Tell the Veteran the decision and their rights.",
          },
          {
            title: "Request approval",
            description: "Send a complete Conditional Approval request.",
          },
        ],
        chapters: [
          {
            title: "Feasibility",
            items: [
              { title: "The three feasibility tests", minutes: 8 },
              { title: "Non-feasible findings", minutes: 6 },
              { title: "Writing the feasibility letter", minutes: 5 },
            ],
          },
          {
            title: "Conditional Approval",
            items: [
              { title: "Requesting Conditional Approval", minutes: 6 },
              { title: "IL cases", minutes: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "builders",
    title: "Builders and Payments",
    description:
      "Guide the builder through bids, contract and vendor setup, agree how they'll be paid and submit the grant.",
    icon: HardHatIcon,
    courses: [
      {
        id: "working-with-builders",
        title: "Working with Builders",
        description:
          "Help the Veteran choose a builder and coach the builder through the paperwork VA needs.",
        icon: UsersIcon,
        outcomes: [
          {
            title: "Support the choice",
            description: "Help the Veteran compare bids and pick a builder.",
          },
          {
            title: "Coach the builder",
            description: "Explain payment terms and required documents.",
          },
          {
            title: "Review the package",
            description: "Check the contract, plans, specs and license.",
          },
        ],
        chapters: [
          {
            title: "Selection",
            items: [
              { title: "Bids and builder choice", minutes: 6 },
              { title: "Coaching the builder", minutes: 6 },
            ],
          },
          {
            title: "Paperwork",
            items: [
              { title: "Contract, plans and specs", minutes: 8 },
              { title: "Licenses and vendor enrollment", minutes: 5 },
            ],
          },
        ],
      },
      {
        id: "cost-analysis",
        title: "Cost Analysis",
        description:
          "Check a builder's price is reasonable, and handle MPR waivers and Veteran funds.",
        icon: CalculatorIcon,
        outcomes: [
          {
            title: "Test the price",
            description: "Compare the bid against cost estimates.",
          },
          {
            title: "Handle waivers",
            description: "Know when an MPR waiver applies.",
          },
          {
            title: "Account for Veteran funds",
            description: "Record money the Veteran adds to the project.",
          },
        ],
        chapters: [
          {
            title: "Pricing",
            items: [
              { title: "Using the cost estimator", minutes: 7 },
              { title: "Comparing against bids", minutes: 5 },
            ],
          },
          {
            title: "Adjustments",
            items: [
              { title: "MPR waivers", minutes: 5 },
              { title: "Veteran funds", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "escrow",
        title: "Payment Schedule and Escrow",
        description:
          "Agree when the builder gets paid and record the grant money VA holds in escrow.",
        icon: LandmarkIcon,
        outcomes: [
          {
            title: "Build the schedule",
            description: "Set payment stages everyone can sign.",
          },
          {
            title: "Understand escrow",
            description: "Know how VA holds and releases grant funds.",
          },
          {
            title: "Use the screen",
            description: "Complete the Escrow Processing screen.",
          },
        ],
        chapters: [
          {
            title: "Payment schedule",
            items: [
              { title: "Building the schedule", minutes: 6 },
              { title: "Getting it signed", minutes: 4 },
            ],
          },
          {
            title: "Escrow",
            items: [
              { title: "How escrow works", minutes: 5 },
              { title: "The Escrow Processing screen", minutes: 6 },
            ],
          },
        ],
      },
      {
        id: "grant-submission",
        title: "Submitting the Grant",
        description:
          "Finish the checklist and SAHSHA screens, submit, and see the grant through to approval.",
        icon: SendIcon,
        outcomes: [
          {
            title: "Submit complete",
            description: "Work through the checklist before you submit.",
          },
          {
            title: "Write the synopsis",
            description: "Give Coordinators what they need to review.",
          },
          {
            title: "Follow it to approval",
            description: "Know what happens at review and AAO approval.",
          },
        ],
        chapters: [
          {
            title: "Submission",
            items: [
              { title: "The submission checklist", minutes: 6 },
              { title: "The synopsis email", minutes: 4 },
            ],
          },
          {
            title: "Approval",
            items: [
              { title: "Coordinator review", minutes: 5 },
              { title: "AAO approval and the voucher", minutes: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "construction",
    title: "Construction and Close-out",
    description:
      "Assign an inspector, pay the builder stage by stage and close the project out.",
    icon: HammerIcon,
    courses: [
      {
        id: "inspections",
        title: "Compliance Inspections",
        description:
          "Get the inspector's fee approved, assign a CI and act on each inspection report.",
        icon: ClipboardListIcon,
        outcomes: [
          {
            title: "Set up the CI",
            description: "Get the fee pre-approved and assign an inspector.",
          },
          {
            title: "Read a CIR",
            description: "Know what a stage inspection report tells you.",
          },
          {
            title: "Pay the inspector",
            description: "Forward the CI invoice for payment.",
          },
        ],
        chapters: [
          {
            title: "Setup",
            items: [
              { title: "CI fee pre-approval", minutes: 4 },
              { title: "Assigning a CI", minutes: 5 },
            ],
          },
          {
            title: "Inspections",
            items: [
              { title: "Reading a CIR (26-1839)", minutes: 6 },
              { title: "Paying the CI", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "disbursements",
        title: "Disbursements and Change Orders",
        description:
          "Pay the builder as each stage passes, and handle changes to the work.",
        icon: BanknoteIcon,
        outcomes: [
          {
            title: "Pay on time",
            description:
              "Request each stage payment within five business days.",
          },
          {
            title: "Manage changes",
            description: "Process change orders without stalling the work.",
          },
          {
            title: "Know the extras",
            description: "Know when a supplemental grant is allowed.",
          },
        ],
        chapters: [
          {
            title: "Paying the builder",
            items: [
              { title: "Requesting a stage disbursement", minutes: 6 },
              { title: "The five-day rule", minutes: 3 },
            ],
          },
          {
            title: "Changes",
            items: [
              { title: "Change orders", minutes: 7 },
              { title: "Supplemental grants", minutes: 6 },
            ],
          },
        ],
      },
      {
        id: "close-out",
        title: "Final Review and Close-out",
        description:
          "Do the Final Field Review, release the holdback and submit the final accounting.",
        icon: FlagIcon,
        outcomes: [
          {
            title: "Review the finished work",
            description: "Complete the Final Field Review with the Veteran.",
          },
          {
            title: "Release the holdback",
            description: "Collect the lien release and request the 20%.",
          },
          {
            title: "Close the project",
            description: "Verify payments and submit the final accounting.",
          },
        ],
        chapters: [
          {
            title: "Final review",
            items: [
              { title: "The Final Field Review (26-1858d)", minutes: 7 },
              { title: "Lien release and the 20% holdback", minutes: 5 },
            ],
          },
          {
            title: "Close-out",
            items: [
              { title: "Verifying payments", minutes: 5 },
              { title: "Final Accounting", minutes: 6 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "special-cases",
    title: "Special Cases",
    description:
      "What to do when a case leaves the usual path, from a Veteran's death to an appeal.",
    icon: LifeBuoyIcon,
    courses: [
      {
        id: "death-of-veteran",
        title: "Death of a Veteran",
        description:
          "Pause the case with care, work with the next of kin and settle the builder's work.",
        icon: HeartHandshakeIcon,
        outcomes: [
          {
            title: "Respond with care",
            description: "Know the first steps when a Veteran dies.",
          },
          {
            title: "Work with next of kin",
            description: "Know who you can talk to and what they can decide.",
          },
          {
            title: "Settle the project",
            description: "Handle the builder, payments and case closure.",
          },
        ],
        chapters: [
          {
            title: "First steps",
            items: [
              { title: "Pausing the case", minutes: 4 },
              { title: "Working with next of kin", minutes: 6 },
            ],
          },
          {
            title: "Finishing the work",
            items: [
              { title: "The builder and payments", minutes: 6 },
              { title: "Closing the case", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "stalled-cases",
        title: "Inactive and Unresponsive Cases",
        description:
          "Handle cases that have stalled, and help the Veteran restart when they're ready.",
        icon: HourglassIcon,
        outcomes: [
          {
            title: "Spot a stalled case",
            description: "Know when a case should go inactive.",
          },
          {
            title: "Follow up",
            description: "Use the work bucket and letters the right way.",
          },
          {
            title: "Restart it",
            description: "Tell the Veteran what they need to do next.",
          },
        ],
        chapters: [
          {
            title: "Stalled cases",
            items: [
              { title: "Inactive Status", minutes: 5 },
              { title: "The unresponsive Veteran work bucket", minutes: 5 },
              { title: "Restarting a case", minutes: 4 },
            ],
          },
        ],
      },
      {
        id: "il-and-tra",
        title: "IL and TRA Grants",
        description:
          "How Independent Living and Temporary Residence Adaptation cases differ from the usual path.",
        icon: SignpostIcon,
        outcomes: [
          {
            title: "Run an IL case",
            description: "Work with VR&E and know which steps are skipped.",
          },
          {
            title: "Run a TRA case",
            description: "Adapt a family member's home the Veteran lives in.",
          },
          {
            title: "Know the limits",
            description: "Apply the right grant amounts to each variant.",
          },
        ],
        chapters: [
          {
            title: "Independent Living",
            items: [
              { title: "Working with VR&E", minutes: 6 },
              { title: "What's different", minutes: 4 },
            ],
          },
          {
            title: "Temporary Residence Adaptation",
            items: [{ title: "Adapting a family member's home", minutes: 6 }],
          },
        ],
      },
      {
        id: "complaints-and-appeals",
        title: "Complaints and Appeals",
        description:
          "Handle complaints, explain appeal rights and manage transfers, suspensions and cancellations.",
        icon: GavelIcon,
        outcomes: [
          {
            title: "Handle a complaint",
            description: "Know who responds and how fast.",
          },
          {
            title: "Explain appeal rights",
            description: "Tell a Veteran how to challenge a decision.",
          },
          {
            title: "Change a case's status",
            description: "Transfer, suspend or cancel a case correctly.",
          },
        ],
        chapters: [
          {
            title: "When a Veteran disagrees",
            items: [
              { title: "Handling a complaint", minutes: 5 },
              { title: "Appeal rights", minutes: 6 },
            ],
          },
          {
            title: "Case changes",
            items: [
              { title: "Transfers, suspensions and cancellations", minutes: 6 },
            ],
          },
        ],
      },
    ],
  },
]

export const findCategory = (id: string) =>
  categories.find((category) => category.id === id)

export const findCourse = (category: Category, id: string) =>
  category.courses.find((course) => course.id === id)

export const lessonsOf = (course: Course) =>
  course.chapters.flatMap((chapter) => chapter.items)

export const minutesOf = (course: Course) =>
  lessonsOf(course).reduce((sum, lesson) => sum + lesson.minutes, 0)

export const courseHref = (category: Category, course: Course) =>
  `/guides/${category.id}/${course.id}`

// URL-safe id for a lesson, from its title.
export const lessonSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const lessonHref = (
  category: Category,
  course: Course,
  lesson: Lesson
) => `${courseHref(category, course)}/${lessonSlug(lesson.title)}`

// Finds a course's lesson by slug, with its chapter and position.
export function findLesson(course: Course, slug: string) {
  for (const [chapterIndex, chapter] of course.chapters.entries()) {
    const lesson = chapter.items.find((item) => lessonSlug(item.title) === slug)
    if (lesson) return { chapter, chapterIndex, lesson }
  }
  return undefined
}
