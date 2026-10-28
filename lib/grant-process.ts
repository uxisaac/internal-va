// The SAH grant as a process in its own right, with the system taken out.
// Only sections A and B (G1–G6) have arrived so far; the source text was cut
// off partway through G6.

export type SourcedNote = {
  text: string
  source: string
}

export type GrantActivity = {
  id: string
  /** "program": required by statute or regulation. "practice": how VA chose to administer it. */
  kind: "program" | "practice"
  vaDecides?: boolean
  newItems?: number
  title: string
  does: string
  who: string
  mustBeTrue: string
  /** Legacy process steps that carry out this activity. */
  steps: string[]
  source: string
  question?: SourcedNote
  additions: SourcedNote[]
}

export type GrantSection = {
  id: string
  title: string
  description: string
  activities: GrantActivity[]
}

export const grantIntro = {
  grade:
    "Grade C · The machine's reading of the legacy process against 38 CFR part 36 subpart D and the Cleveland training guide. The regulation carries the decisions and the money; the rest is read from the guide and marked as practice rather than law. Daniel and the product owners correct it through the feedback on each activity.",
  lead: "The Specially Adapted Housing grant as a process in its own right, with the system taken out. It says what has to happen for a Veteran to get an adapted home and for public money to be accounted for, in the order it has to happen, without naming a screen, a file store, an email or a form number. It names no VA office role either: who inside VA carries out a step is an administrative choice, and this map is the part that would stand whoever did it. It is the yardstick the other two maps are read against.",
  notes: [
    "An activity marked program is required by statute or regulation. One marked practice is how VA has chosen to administer the grant soundly, and could be done another way.",
    "What the legacy process does for the sake of the software or the office arrangement is not on this map. It is listed under what the system adds, with the legacy step it comes from.",
    "Documents are named by what they have to establish, not by their form number, because a form is one way of carrying evidence.",
  ],
  training: {
    received: "2026-09-25",
    additions: 31,
    activities: 19,
    conflicts: 2,
    questions: 1,
  },
  tiles: [
    { value: 31, label: "activities the grant needs" },
    { value: 23, label: "required by statute or regulation", accent: true },
    { value: 8, label: "how VA has chosen to administer it" },
    { value: 30, label: "legacy steps that answer to one of them" },
    {
      value: 14,
      label: "legacy steps the system and the office add",
      accent: true,
    },
  ],
}

const CH1 = "Chapter 1 deck"
const FEAS = "Feasibility deck"

export const grantSections: GrantSection[] = [
  {
    id: "A",
    title: "Establish the right",
    description:
      "Whether this Veteran may have a grant, of which kind, and how much is left to them.",
    activities: [
      {
        id: "G1",
        kind: "program",
        title: "The Veteran asks for the grant",
        does: "A Veteran or service member asks VA to help adapt a home for a service-connected disability. A case can also begin the other way about, with VA identifying the Veteran first; see G1b.",
        who: "the Veteran",
        mustBeTrue:
          "A request that identifies the person and says what is being asked for.",
        steps: ["S0.1"],
        source: "38 U.S.C. 2101; 38 CFR 36.4404",
        additions: [],
      },
      {
        id: "G1b",
        kind: "practice",
        newItems: 1,
        title:
          "VA identifies a Veteran who may be eligible and invites them to apply",
        does: "A separate VA record of health and service identifies a Veteran as meeting the disability and service criteria, and someone contacts the Veteran to say they appear eligible and invites an application.",
        who: "VA, the Veteran",
        mustBeTrue:
          "The identification, the contact made, and the application it leads to.",
        steps: [],
        source:
          "Daniel, 2026-09-24, from note nmuftztu on this activity. The training guide describes the application arriving and does not cover this way in; the application it leads to is the one at 38 CFR 36.4404.",
        additions: [
          {
            text: "The Chapter 1 deck names this an inferred rating: a record created automatically from a rating decision granting SAH or SHA entitlement when the Veteran did not specifically apply. Eligibility is established once the rating and a completed application are both on file.",
            source: CH1,
          },
        ],
      },
      {
        id: "G2",
        kind: "program",
        vaDecides: true,
        newItems: 1,
        title: "VA decides whether the disability requirements are met",
        does: "VA decides whether the Veteran has a disability the program covers, and tells the Veteran the answer with the reasons.",
        who: "VA",
        mustBeTrue: "A decision on the record, and the Veteran told of it.",
        steps: ["S0.2"],
        source: "38 CFR 36.4404(a); 36.4405(a)(1)(i)",
        additions: [
          {
            text: "Eligibility rests on two things together: a rating decision granting the entitlement, which gives the legal, medical and service reasons, and a properly completed application.",
            source: CH1,
          },
        ],
      },
      {
        id: "G3",
        kind: "program",
        vaDecides: true,
        newItems: 2,
        title: "VA establishes how much assistance is left",
        does: "VA establishes which kind of grant applies, what the Veteran has used before, and the amount available this year.",
        who: "VA",
        mustBeTrue:
          "The grant type, prior use, and the current maximum, all recorded.",
        steps: ["S0.2"],
        source: "38 CFR 36.4402(d); 36.4403; 36.4411",
        question: {
          text: "The Federal Register notice is reported to print $25,349 for SHA and $9,099 for TRA against SHA, while va.gov and the Chapter 1 deck print $25,350 and $9,100. Which governs? (Knowledge items C13, L31 and G35.)",
          source: CH1,
        },
        additions: [
          {
            text: "FY2026 maximums as the Chapter 1 deck prints them: SAH $126,526, SHA $25,350, TRA $50,961 against SAH and $9,100 against SHA; six lifetime uses; the amounts rise each October 1 and do not fall.",
            source: CH1,
          },
          {
            text: "Conditional approval confirms the Veteran has not exceeded the use or dollar limits.",
            source: "Conditional Approval deck",
          },
        ],
      },
    ],
  },
  {
    id: "B",
    title: "Establish that it can be done",
    description:
      "Whether adapting this home will meet the need, and whether the Veteran holds the home.",
    activities: [
      {
        id: "G4",
        kind: "practice",
        title: "VA learns what the Veteran needs the home to do",
        does: "VA finds out how the Veteran moves through a home, who else lives there, and what the household needs the adaptation to achieve.",
        who: "the Veteran, the Veteran's family",
        mustBeTrue:
          "A record of the need in the Veteran's own terms, taken with the Veteran present.",
        steps: ["S2.1", "S2.3", "S3.1"],
        source:
          "Training guide, interview; the basis for the feasibility decision at 38 CFR 36.4404(b)",
        additions: [],
      },
      {
        id: "G5",
        kind: "practice",
        newItems: 2,
        title: "The home is examined against the need",
        does: "Someone looks at the actual dwelling and records what is there: the approach, the doorways, the bathroom, the levels, the condition.",
        who: "the Veteran, VA",
        mustBeTrue:
          "Measurements, photographs and a sketch of the home as it stands.",
        steps: ["S3.2"],
        source:
          "Training guide, property suitability review; evidence for 38 CFR 36.4404(b)",
        additions: [
          {
            text: "For a lot: its size, slope and topography, flood zone, HOA rules and access for emergency services. For a home: whether the design requirements are present or can be built, weighed against the Veteran's current and expected needs by matrix type.",
            source: FEAS,
          },
          {
            text: "For SHA the home is not examined in full: residency is the test, and photos are a best practice.",
            source: FEAS,
          },
        ],
      },
      {
        id: "G6",
        kind: "program",
        vaDecides: true,
        newItems: 3,
        title: "VA decides the adaptation is feasible and the home suitable",
        does: "VA decides whether this home can be adapted to meet the need, and tells the Veteran either way.",
        who: "VA",
        mustBeTrue:
          "A feasibility decision on the record, with the reasons, and the Veteran told.",
        steps: ["S4.3"],
        source: "38 CFR 36.4404(b); 36.4405(a)(1)(ii)",
        // The third training note was cut off in the source text.
        additions: [
          {
            text: "For SAH three tests: medically feasible for the Veteran to live outside an institution; financially feasible, the cost bearing a proper relation to the Veteran's present and expected income and expenses; and the home suitable to adapt. For SHA the test is residency: the Veteran lives in, and intends to keep living in, a home the Veteran or a family member owns. Failing any one test is a non-feasible finding.",
            source: FEAS,
          },
          {
            text: "A non-feasible finding is concurred by a second decider before the Veteran is told, and the notice carries the decision and appeal rights (see G27).",
            source: FEAS,
          },
        ],
      },
    ],
  },
]
