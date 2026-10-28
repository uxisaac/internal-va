export type FlowStep = {
  id: string
  title: string
  /** People or teams involved. */
  roles?: string[]
  /** Systems and channels used. */
  systems?: string[]
  docs?: number
  needsAnswer?: boolean
  conflicts?: number
  newItems?: number
  /** SAHSHA screens involved. */
  screens?: number
  /** Marks a decision point (shown with a red rule). */
  decisionPoint?: boolean
  /** Plain-language description of what happens at this step. */
  summary?: string
}

export type FlowPhase = {
  id: string
  title: string
  description?: string
  /** Paths that can be reached from any step, outside the main sequence. */
  exception?: boolean
  steps: FlowStep[]
}

export const legacyProcessFlow: FlowPhase[] = [
  {
    id: "P0",
    title: "Eligibility and assignment",
    description:
      "Application arrives, LGY determines eligibility, Coordinators send the eligibility letter, AAO assigns the case to a Regional Office and Agent.",
    steps: [
      {
        id: "S0.1",
        summary:
          "The Veteran applies for the grant, on paper or online. The application lands with the Coordinators, who start a case for it.",
        title: "Application received (26-4555)",
        roles: ["Veteran", "Coordinators"],
        systems: ["SAHSHA", "eBenefits"],
        docs: 1,
        needsAnswer: true,
        newItems: 4,
      },
      {
        id: "S0.2",
        summary:
          "VA checks whether the Veteran qualifies and how much grant money is left to them, then sends a letter with the answer.",
        title: "Eligibility determined; eligibility letter sent",
        roles: ["LGY", "Coordinators"],
        systems: ["SAHSHA"],
        docs: 4,
        newItems: 2,
      },
      {
        id: "S0.3",
        summary:
          "The case is handed to a Regional Office and a named Agent, who will guide the Veteran through the rest of the process.",
        title: "Case assigned to RO and Agent",
        roles: ["AAO", "Agent"],
        systems: ["SAHSHA"],
        conflicts: 1,
        newItems: 2,
      },
    ],
  },
  {
    id: "P1",
    title: "Interview preparation",
    description:
      "Agent researches the Veteran in VBMS and the property on county sites before first contact.",
    steps: [
      {
        id: "S1.1",
        summary:
          "Before calling the Veteran, the Agent reads their VA record to understand their disability, service and history with the program.",
        title: "Research the Veteran in VBMS",
        roles: ["Agent"],
        systems: ["VBMS"],
        docs: 1,
        newItems: 1,
      },
      {
        id: "S1.2",
        summary:
          "The Agent looks up the Veteran's home on county websites to confirm who owns it and check its tax records.",
        title: "Pull property and tax records",
        roles: ["Agent"],
        systems: ["County auditor site"],
        docs: 2,
      },
    ],
  },
  {
    id: "P2",
    title: "Initial contact and materials",
    description:
      "Agent calls the Veteran, asks the screening questions, and emails or mails the forms to complete before the interview.",
    steps: [
      {
        id: "S2.1",
        summary:
          "The Agent calls the Veteran for the first time, introduces the program and asks a short set of screening questions.",
        title: "Initial call: screening questions",
        roles: ["Agent", "Veteran", "POA"],
        systems: ["SAHSHA"],
        newItems: 6,
      },
      {
        id: "S2.2",
        summary:
          "The Agent sends the forms and information the Veteran needs to fill in before the interview, by email or post.",
        title: "Send pre-interview materials",
        roles: ["Agent", "Veteran"],
        systems: ["Email", "Postal mail"],
        docs: 5,
        needsAnswer: true,
      },
      {
        id: "S2.3",
        summary:
          "The Veteran fills in the forms and sends them back, and the Agent files them in SAHSHA.",
        title: "Veteran returns completed forms",
        roles: ["Veteran", "Agent"],
        systems: ["Email", "Postal mail", "eBenefits", "SAHSHA"],
        docs: 4,
      },
    ],
  },
  {
    id: "P3",
    title: "Interview and property suitability review",
    description:
      "Site visit at the home (or phone interview): packet delivered, forms signed, photos, sketch and measurements taken.",
    steps: [
      {
        id: "S3.1",
        summary:
          "The Agent meets the Veteran, usually at home, to talk through their needs and hand over the grant packet to sign.",
        title: "Interview and deliver grant packet",
        roles: ["Agent", "Veteran", "Family", "POA"],
        systems: ["SAHSHA"],
        docs: 23,
      },
      {
        id: "S3.2",
        summary:
          "The Agent checks whether the home can be adapted, taking photos, a sketch and measurements of the spaces that matter.",
        title: "Property suitability review: photos, sketch, measurements",
        roles: ["Agent", "Veteran", "Builder"],
        systems: ["SAHSHA"],
        docs: 10,
        conflicts: 2,
        newItems: 4,
      },
      {
        id: "S3.3",
        summary:
          "The Agent uploads everything from the interview and sends the Veteran a letter summarising what happens next.",
        title: "Upload interview documents; After Interview letter",
        roles: ["Agent"],
        systems: ["SAHSHA", "SharePoint"],
        docs: 5,
      },
    ],
  },
  {
    id: "P4",
    title: "Feasibility and Conditional Approval",
    description:
      "Ownership interest, VMLI status and feasibility are verified and recorded; Conditional Approval (CA) is requested from Coordinators. IL cases skip CA.",
    steps: [
      {
        id: "S4.1",
        summary:
          "The Agent confirms the Veteran owns, or has the right to adapt, the home, using county records and legal advice if needed.",
        title: "Verify ownership interest",
        roles: ["Agent", "Veteran", "OGC"],
        systems: ["County auditor site", "SAHSHA"],
        docs: 9,
      },
      {
        id: "S4.2",
        summary:
          "The Agent checks whether the Veteran has mortgage life insurance through VA, which affects the case.",
        title: "Verify VMLI status",
        roles: ["Agent"],
        systems: ["SHARE", "VBMS", "SAHSHA"],
        docs: 2,
      },
      {
        id: "S4.3",
        summary:
          "VA decides whether adapting this home is possible and sensible, and writes to the Veteran with the decision either way.",
        title: "Feasibility letter (adaptable or not)",
        roles: ["Agent", "Veteran"],
        systems: ["SAHSHA"],
        docs: 3,
        conflicts: 1,
        newItems: 2,
        decisionPoint: true,
      },
      {
        id: "S4.4",
        summary:
          "The Agent asks the Coordinators to approve the case in principle before any building work is planned. IL cases skip this.",
        title: "Request Conditional Approval",
        roles: ["Agent", "Coordinators", "CO"],
        systems: ["SAHSHA", "Email"],
        docs: 7,
        conflicts: 1,
        newItems: 9,
        screens: 1,
        decisionPoint: true,
      },
    ],
  },
  {
    id: "P5",
    title: "Builder, plans and contract",
    description:
      "Veteran selects a builder; Agent coaches the builder through contract, plans, specs, materials, license, vendor enrollment and cost analysis.",
    steps: [
      {
        id: "S5.1",
        summary:
          "The Veteran chooses a builder, usually after comparing bids, and the Agent records the choice.",
        title: "Builder selection and bids",
        roles: ["Veteran", "Builder", "Agent"],
        systems: ["SAHSHA", "SIM"],
        docs: 4,
      },
      {
        id: "S5.2",
        summary:
          "The Agent walks the builder through how and when they'll be paid and which paperwork VA needs from them.",
        title: "Coach builder: payment terms and paperwork",
        roles: ["Agent", "Builder"],
        systems: ["Email"],
        docs: 4,
      },
      {
        id: "S5.3",
        summary:
          "The builder prepares the contract, plans, specifications and materials list, and the Veteran and Agent review them.",
        title: "Contract, plans, specs, materials",
        roles: ["Builder", "Veteran", "Agent"],
        systems: ["SAHSHA"],
        docs: 10,
      },
      {
        id: "S5.4",
        summary:
          "The Agent handles any waivers to the minimum property requirements and any money the Veteran adds to the project.",
        title: "MPR waivers and Veteran funds",
        roles: ["Veteran", "Agent", "Coordinators"],
        systems: ["SAHSHA"],
        docs: 4,
      },
      {
        id: "S5.5",
        summary:
          "The Agent checks the builder's price is reasonable by comparing it with cost estimates for the same work.",
        title: "Cost analysis",
        roles: ["Agent"],
        systems: ["VA Cost Estimator", "Homewyse", "SAHSHA"],
        docs: 3,
        decisionPoint: true,
      },
      {
        id: "S5.6",
        summary:
          "The builder is set up as a VA vendor so they can be paid electronically.",
        title: "Vendor enrollment",
        roles: ["Builder", "Agent"],
        systems: ["SAHSHA", "VA-FSC vendor file and EFT"],
        docs: 2,
        conflicts: 1,
        screens: 1,
      },
    ],
  },
  {
    id: "P6",
    title: "Payment schedule and escrow",
    description:
      "Payment (Disbursement) Schedule agreed and signed by Veteran, Builder and Agent; VA holds grant funds in internal escrow.",
    steps: [
      {
        id: "S6.1",
        summary:
          "The Veteran, builder and Agent agree and sign the schedule for when the builder will be paid during construction.",
        title: "Payment (Disbursement) Schedule executed",
        roles: ["Builder", "Veteran", "Agent"],
        systems: ["SAHSHA"],
        docs: 2,
        newItems: 2,
      },
      {
        id: "S6.2",
        summary:
          "The Agent records the grant money VA is holding in escrow, so it can be paid out in stages.",
        title: "Escrow Processing screen",
        roles: ["Agent"],
        systems: ["SAHSHA"],
        docs: 1,
        conflicts: 1,
        needsAnswer: true,
        newItems: 2,
        screens: 1,
      },
    ],
  },
  {
    id: "P7",
    title: "Grant submission and approval",
    description:
      "Agent completes the checklist and SAHSHA screens, submits, and emails a synopsis to the Coordinators group; Coordinators review, AAO approves, voucher issued.",
    steps: [
      {
        id: "S7.1",
        summary:
          "The Agent works through the submission checklist and completes the remaining SAHSHA screens for the case.",
        title: "Checklist and SAHSHA screens complete",
        roles: ["Agent"],
        systems: ["SAHSHA"],
        docs: 1,
        screens: 18,
      },
      {
        id: "S7.2",
        summary:
          "The Agent emails the Coordinators a short summary of the case, asking them to review it.",
        title: "Grant submission synopsis emailed",
        roles: ["Agent", "Coordinators"],
        systems: ["Email", "SAHSHA"],
        docs: 1,
      },
      {
        id: "S7.3",
        summary:
          "The Coordinators review the case and a manager approves the grant, which releases the money for the project.",
        title: "Coordinator review and AAO approval",
        roles: ["Coordinators", "AAO", "AO"],
        systems: ["SAHSHA"],
        docs: 4,
        conflicts: 1,
        newItems: 2,
        screens: 2,
        decisionPoint: true,
      },
    ],
  },
  {
    id: "P8",
    title: "Compliance Inspector assignment",
    description:
      "CI fee pre-approved by AAO and SSD, CI assigned and activated in SAHSHA, builder notified.",
    steps: [
      {
        id: "S8.1",
        summary:
          "Before an inspector is assigned, managers approve the fee the inspector will be paid.",
        title: "CI Fee Pre-Approval",
        roles: ["Agent", "CI", "AAO", "SSD"],
        systems: ["Email", "SAHSHA"],
        docs: 1,
        newItems: 1,
      },
      {
        id: "S8.2",
        summary:
          "A Compliance Inspector is assigned to the case, and the builder and Veteran are told construction can be inspected.",
        title: "CI assigned and activated; builder notified",
        roles: ["Agent", "CI", "Builder", "Veteran"],
        systems: ["SAHSHA", "Email", "UPS"],
        docs: 8,
        newItems: 1,
        screens: 2,
      },
    ],
  },
  {
    id: "P9",
    title: "Construction, inspections and disbursements",
    description:
      "Builder completes stages; CI inspects and reports; Agent approves the report, forwards the CI invoice and requests each stage disbursement within 5 business days.",
    steps: [
      {
        id: "S9.1",
        summary: "The builder starts work on the home.",
        title: "Construction begins",
        roles: ["Builder", "Veteran"],
        docs: 1,
        conflicts: 1,
        newItems: 1,
        screens: 1,
      },
      {
        id: "S9.2",
        summary:
          "At each stage of the work, the inspector visits and writes a report on whether it's been done properly.",
        title: "Stage inspection and CIR (26-1839)",
        roles: ["CI", "Builder", "Agent"],
        systems: ["SAHSHA", "Email"],
        docs: 2,
        newItems: 4,
        decisionPoint: true,
      },
      {
        id: "S9.3",
        summary:
          "The inspector's invoice is sent on so they can be paid for the inspection.",
        title: "CI invoice forwarded for payment",
        roles: ["CI", "Agent", "Coordinators", "AAO"],
        systems: ["Merchant account (PayPal)", "Email", "SIM", "SAHSHA"],
        docs: 3,
      },
      {
        id: "S9.4",
        summary:
          "Once a stage passes inspection, the Agent asks for the builder to be paid for that stage, normally within five business days.",
        title: "Stage disbursement to builder",
        roles: ["Agent", "Builder", "Coordinators", "AAO"],
        systems: ["SAHSHA", "Email", "VA-FSC vendor file and EFT"],
        docs: 4,
        conflicts: 1,
        newItems: 5,
        screens: 4,
        decisionPoint: true,
      },
      {
        id: "S9.5",
        summary:
          "If the work needs to change, the Agent handles the change order and, where allowed, extra grant money to cover it.",
        title: "Change order and supplemental grant",
        roles: ["Builder", "Veteran", "Agent", "Coordinators"],
        systems: ["SAHSHA", "Email"],
        docs: 6,
        conflicts: 2,
        newItems: 12,
        screens: 4,
      },
    ],
  },
  {
    id: "P10",
    title: "Completion and final field review",
    description:
      "Agent performs the Final Field Review (26-1858d), collects the satisfaction statement and full lien release, and requests the 20% holdback.",
    steps: [
      {
        id: "S10.1",
        summary:
          "When the work is finished, the Agent inspects the result with the Veteran and records the Final Field Review.",
        title: "Final Field Review (26-1858d)",
        roles: ["Agent", "Veteran", "CI"],
        systems: ["SAHSHA", "SIM"],
        docs: 3,
        newItems: 4,
      },
      {
        id: "S10.2",
        summary:
          "The builder confirms no one else has a claim on the home, and VA releases the 20% of the price it held back.",
        title: "Full lien release and 20% holdback",
        roles: ["Builder", "Agent", "Coordinators", "AAO"],
        systems: ["SAHSHA", "Email"],
        docs: 6,
        newItems: 1,
      },
    ],
  },
  {
    id: "P11",
    title: "Final accounting and close-out",
    description:
      "Payments verified in SHARE (or third-party ledger), Final Accounting screen saved, Coordinators asked to close the project.",
    steps: [
      {
        id: "S11.1",
        summary:
          "The Agent checks every payment has been made correctly and closes the escrow account.",
        title: "Verify payments and close escrow",
        roles: ["Agent"],
        systems: ["SHARE", "SAHSHA"],
        docs: 2,
        conflicts: 1,
        newItems: 2,
        screens: 1,
      },
      {
        id: "S11.2",
        summary:
          "The Agent submits the final accounting and asks the Coordinators to close the project.",
        title: "Final Accounting submitted",
        roles: ["Agent", "Coordinators"],
        systems: ["SAHSHA", "Email"],
        docs: 2,
        conflicts: 2,
        newItems: 2,
        screens: 1,
      },
    ],
  },
  {
    id: "PX",
    title: "Exception paths",
    description:
      "Reached from any step: death of the Veteran, Inactive Status, grant transfer, supplemental grants, complaints, appeals, unresponsive Veteran.",
    exception: true,
    steps: [
      {
        id: "SX.1",
        summary:
          "If the Veteran dies during the process, the case is paused and handled with the next of kin and the builder.",
        title: "Death of the Veteran",
        roles: ["Agent", "NOK", "Builder", "Coordinators", "AAO"],
        systems: ["SAHSHA", "SHARE", "VBMS"],
        docs: 10,
        needsAnswer: true,
        newItems: 9,
        screens: 13,
        decisionPoint: true,
      },
      {
        id: "SX.2",
        summary:
          "A case that has stalled is marked inactive, and the Veteran is told what they need to do to restart it.",
        title: "Inactive Status",
        roles: ["Veteran", "Agent", "AAO"],
        systems: ["SAHSHA", "Email", "Postal mail"],
        docs: 3,
        conflicts: 1,
      },
      {
        id: "SX.3",
        summary:
          "If the Veteran stops responding, the case moves to a work bucket and the Agent follows up by post.",
        title: "Unresponsive Veteran (Work Bucket)",
        roles: ["Agent", "Veteran"],
        systems: ["SAHSHA", "Postal mail"],
        docs: 2,
      },
      {
        id: "SX.4",
        summary:
          "Cases can be transferred to another office, suspended, rechecked for eligibility, merged as duplicates or cancelled.",
        title: "Transfer, suspend, eligibility, duplicate, cancel",
        roles: ["AAO", "Coordinators", "Agent"],
        systems: ["SAHSHA"],
      },
      {
        id: "SX.5",
        summary:
          "The Veteran can complain about a decision or appeal it, which can go up to management or the Board of Veterans' Appeals.",
        title: "Complaints and appeals",
        roles: ["Veteran", "Agent", "Management / VACO", "BVA"],
        systems: ["SAHSHA"],
        docs: 1,
        newItems: 1,
      },
      {
        id: "SX.6",
        summary:
          "An Independent Living case, run with Vocational Rehabilitation, follows a slightly different path.",
        title: "IL grant variant",
        roles: ["VRC (VR&E)", "Agent", "Veteran", "AAO", "VR&E VACO"],
        systems: ["SAHSHA"],
        docs: 7,
      },
      {
        id: "SX.7",
        summary:
          "A Temporary Residence Adaptation adapts a family member's home where the Veteran is living for a while.",
        title: "TRA grant variant",
        roles: ["Veteran", "Family", "Agent", "OGC"],
        systems: ["SAHSHA"],
        newItems: 6,
        screens: 1,
      },
    ],
  },
]
