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
        title: "Application received (26-4555)",
        roles: ["Veteran", "Coordinators"],
        systems: ["SAHSHA", "eBenefits"],
        docs: 1,
        needsAnswer: true,
        newItems: 4,
      },
      {
        id: "S0.2",
        title: "Eligibility determined; eligibility letter sent",
        roles: ["LGY", "Coordinators"],
        systems: ["SAHSHA"],
        docs: 4,
        newItems: 2,
      },
      {
        id: "S0.3",
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
        title: "Research the Veteran in VBMS",
        roles: ["Agent"],
        systems: ["VBMS"],
        docs: 1,
        newItems: 1,
      },
      {
        id: "S1.2",
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
        title: "Initial call: screening questions",
        roles: ["Agent", "Veteran", "POA"],
        systems: ["SAHSHA"],
        newItems: 6,
      },
      {
        id: "S2.2",
        title: "Send pre-interview materials",
        roles: ["Agent", "Veteran"],
        systems: ["Email", "Postal mail"],
        docs: 5,
        needsAnswer: true,
      },
      {
        id: "S2.3",
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
        title: "Interview and deliver grant packet",
        roles: ["Agent", "Veteran", "Family", "POA"],
        systems: ["SAHSHA"],
        docs: 23,
      },
      {
        id: "S3.2",
        title: "Property suitability review: photos, sketch, measurements",
        roles: ["Agent", "Veteran", "Builder"],
        systems: ["SAHSHA"],
        docs: 10,
        conflicts: 2,
        newItems: 4,
      },
      {
        id: "S3.3",
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
        title: "Verify ownership interest",
        roles: ["Agent", "Veteran", "OGC"],
        systems: ["County auditor site", "SAHSHA"],
        docs: 9,
      },
      {
        id: "S4.2",
        title: "Verify VMLI status",
        roles: ["Agent"],
        systems: ["SHARE", "VBMS", "SAHSHA"],
        docs: 2,
      },
      {
        id: "S4.3",
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
        title: "Builder selection and bids",
        roles: ["Veteran", "Builder", "Agent"],
        systems: ["SAHSHA", "SIM"],
        docs: 4,
      },
      {
        id: "S5.2",
        title: "Coach builder: payment terms and paperwork",
        roles: ["Agent", "Builder"],
        systems: ["Email"],
        docs: 4,
      },
      {
        id: "S5.3",
        title: "Contract, plans, specs, materials",
        roles: ["Builder", "Veteran", "Agent"],
        systems: ["SAHSHA"],
        docs: 10,
      },
      {
        id: "S5.4",
        title: "MPR waivers and Veteran funds",
        roles: ["Veteran", "Agent", "Coordinators"],
        systems: ["SAHSHA"],
        docs: 4,
      },
      {
        id: "S5.5",
        title: "Cost analysis",
        roles: ["Agent"],
        systems: ["VA Cost Estimator", "Homewyse", "SAHSHA"],
        docs: 3,
        decisionPoint: true,
      },
      {
        id: "S5.6",
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
        title: "Payment (Disbursement) Schedule executed",
        roles: ["Builder", "Veteran", "Agent"],
        systems: ["SAHSHA"],
        docs: 2,
        newItems: 2,
      },
      {
        id: "S6.2",
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
        title: "Checklist and SAHSHA screens complete",
        roles: ["Agent"],
        systems: ["SAHSHA"],
        docs: 1,
        screens: 18,
      },
      {
        id: "S7.2",
        title: "Grant submission synopsis emailed",
        roles: ["Agent", "Coordinators"],
        systems: ["Email", "SAHSHA"],
        docs: 1,
      },
      {
        id: "S7.3",
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
        title: "CI Fee Pre-Approval",
        roles: ["Agent", "CI", "AAO", "SSD"],
        systems: ["Email", "SAHSHA"],
        docs: 1,
        newItems: 1,
      },
      {
        id: "S8.2",
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
        title: "Construction begins",
        roles: ["Builder", "Veteran"],
        docs: 1,
        conflicts: 1,
        newItems: 1,
        screens: 1,
      },
      {
        id: "S9.2",
        title: "Stage inspection and CIR (26-1839)",
        roles: ["CI", "Builder", "Agent"],
        systems: ["SAHSHA", "Email"],
        docs: 2,
        newItems: 4,
        decisionPoint: true,
      },
      {
        id: "S9.3",
        title: "CI invoice forwarded for payment",
        roles: ["CI", "Agent", "Coordinators", "AAO"],
        systems: ["Merchant account (PayPal)", "Email", "SIM", "SAHSHA"],
        docs: 3,
      },
      {
        id: "S9.4",
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
        title: "Final Field Review (26-1858d)",
        roles: ["Agent", "Veteran", "CI"],
        systems: ["SAHSHA", "SIM"],
        docs: 3,
        newItems: 4,
      },
      {
        id: "S10.2",
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
        title: "Inactive Status",
        roles: ["Veteran", "Agent", "AAO"],
        systems: ["SAHSHA", "Email", "Postal mail"],
        docs: 3,
        conflicts: 1,
      },
      {
        id: "SX.3",
        title: "Unresponsive Veteran (Work Bucket)",
        roles: ["Agent", "Veteran"],
        systems: ["SAHSHA", "Postal mail"],
        docs: 2,
      },
      // Details for SX.4–SX.7 weren't in the reference yet.
      // SX.4's full title was cut off.
      { id: "SX.4", title: "Transfer, suspend, eligibility, duplicate…" },
      { id: "SX.5", title: "Complaints and appeals" },
      { id: "SX.6", title: "IL grant variant" },
      { id: "SX.7", title: "TRA grant variant" },
    ],
  },
]
