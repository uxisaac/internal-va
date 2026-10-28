// VA forms from the documents table, with the steps that use them.
// Other document kinds in that table (certifications, records, emails,
// handouts…) aren't included here.

export type VaForm = {
  id: string
  /** Form number, e.g. "26-4555". */
  number: string
  title: string
  kind: string
  direction: string
  /** Legacy process steps that use this form. */
  usedAt: string[]
  requires: string
  provides: string
  sahshaCategory: string
  publicCopy: string
  /** Path of the retrieved PDF in the source material, if any. */
  file?: string
}

export const vaForms: VaForm[] = [
  {
    id: "va-26-4555",
    number: "26-4555",
    title:
      "Application in Acquiring Specially Adapted Housing or Special Home Adaptation Grant (MAY 2024)",
    kind: "VA form",
    direction: "Veteran to VA",
    usedAt: ["S0.1", "S0.2"],
    requires:
      "Veteran identity, service, disability claim, property intent (per form)",
    provides: "Triggers eligibility determination and the case in SAHSHA",
    sahshaCategory: "Application Data / Form 26-4555",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-4555.pdf",
  },
  {
    id: "va-26-4555c",
    number: "26-4555c",
    title:
      "Veteran/Servicemember's Supplemental Application for Assistance in Acquiring Specially Adapted Housing (OCT 2023)",
    kind: "VA form",
    direction: "Veteran to Agent",
    usedAt: ["S2.2", "S2.3", "S3.1", "S4.4", "S7.1"],
    requires:
      "Income, occupancy (household members and ages), annual maintenance costs, property and mortgage details; Veteran signature",
    provides:
      "Financial feasibility; source for Property/Financial Data screen (income, occupancy, maintenance). Not requested for IL.",
    sahshaCategory: "Grant Approval Data / 26-4555c/d",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-4555c.pdf",
  },
  {
    id: "va-26-4555d",
    number: "26-4555d",
    title:
      "Veterans Application for Assistance in Acquiring Special Housing Adaptations (JUN 2007); the SHA application with intent-to-reside checkboxes",
    kind: "VA form",
    direction: "Veteran to Agent",
    usedAt: [],
    requires: "Not described in guide",
    provides: "Categorized with 26-4555c",
    sahshaCategory: "Grant Approval Data / 26-4555c/d",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-4555d.pdf",
  },
  {
    id: "va-3288",
    number: "3288",
    title:
      "Request for and Consent to Release of Information from Individual's Records (OCT 1995)",
    kind: "VA form",
    direction: "Veteran to Agent",
    usedAt: ["S2.2", "S2.3", "S3.1", "SX.6"],
    requires:
      "Veteran identity, what may be released, to whom; signature (or POA deemed legally sufficient)",
    provides: "Consent to share case information with builder, CI and others",
    sahshaCategory: "Other Documents / Any Otherwise Unidentified Document",
    publicCopy: "yes, retrieved",
    file: "forms/VA-3288.pdf",
  },
  {
    id: "va-29-8636",
    number: "29-8636",
    title: "Veterans Mortgage Life Insurance Statement (JUL 2024)",
    kind: "VA form",
    direction: "Veteran to Agent",
    usedAt: ["S2.2", "S2.3", "S3.1", "S4.2", "S7.1"],
    requires: "Accept or decline VMLI; mortgage details; signature",
    provides:
      "VMLI Information on Property/Financial Data screen. Not requested for IL.",
    sahshaCategory: "Grant Approval Data / VMLI 29-8636",
    publicCopy: "yes, retrieved",
    file: "forms/VA-29-8636.pdf",
  },
  {
    id: "va-26-1858a",
    number: "26-1858a",
    title:
      "Report of Loan Guaranty Existing Housing Unit Inspection, SAH Property Suitability (OMB submission draft 2025)",
    kind: "VA form (internal)",
    direction: "Agent",
    usedAt: ["S3.2", "S3.3", "S4.3", "S4.4", "SX.6"],
    requires:
      "Property observations, measurements; medical, property and financial feasibility findings",
    provides: "Feasibility determination text (Glossary template)",
    sahshaCategory: "Feasibility Data / Site Visit or Suitability Data",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1858a.pdf",
  },
  {
    id: "va-26-1858b",
    number: "26-1858b",
    title:
      "Report of Loan Guaranty SHA Property Suitability (OMB submission draft 2025)",
    kind: "VA form (internal)",
    direction: "Agent",
    usedAt: ["S3.2"],
    requires: "As 1858a, for SHA",
    provides: "Suitability record",
    sahshaCategory: "Feasibility Data / Site Visit or Suitability Data",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1858b.pdf",
  },
  {
    id: "va-26-1858c",
    number: "26-1858c",
    title:
      "Report of Loan Guaranty SAH Vacant Lot Inspection (OMB submission draft 2025)",
    kind: "VA form (internal)",
    direction: "Agent",
    usedAt: ["S3.2"],
    requires: "Lot observations",
    provides: "Suitability record for new construction",
    sahshaCategory: "Feasibility Data / Site Visit or Suitability Data",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1858c.pdf",
  },
  {
    id: "va-26-1858d",
    number: "26-1858d",
    title:
      "Report of Loan Guaranty Final SAH/SHA Field Review (OMB submission draft 2025)",
    kind: "VA form (internal)",
    direction: "Agent",
    usedAt: ["S10.1", "S10.2", "S11.2"],
    requires:
      "MPR compliance, contract conformance, Veteran acceptance, issues, CI performance measure",
    provides:
      "Basis for 20% holdback and final accounting; also uploaded to SIM",
    sahshaCategory:
      "Final Accounting Data / Other Such Evidence Relating to Inspections",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1858d.pdf",
  },
  {
    id: "va-26-1839",
    number: "26-1839",
    title: "Compliance Inspection Report (JUL 2026)",
    kind: "VA form",
    direction: "CI to Agent",
    usedAt: ["S9.2", "S9.4"],
    requires:
      "Stage inspected, date, findings, photos; completed in SAHSHA or on paper",
    provides:
      "Evidence that a stage is complete; triggers disbursement clock (5 business days)",
    sahshaCategory: "Construction Data / Compliance Inspection Reports",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1839.pdf",
  },
  {
    id: "va-26-1852",
    number: "26-1852",
    title: "Description of Materials (MAY 2024)",
    kind: "VA form (optional format)",
    direction: "Builder",
    usedAt: ["S5.2", "S5.3", "S8.2"],
    requires: "Materials by building element",
    provides: "Contract section V reference; sent to CI",
    sahshaCategory: "Construction Data / VA Form 26-1852 or List of Materials",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1852.pdf",
  },
  {
    id: "va-26-1844",
    number: "26-1844",
    title:
      "Request for Acceptance of Changes in Approved Drawings and Specifications, joint form HUD-92577 / VA 26-1844 (05/2016)",
    kind: "VA form",
    direction: "Builder to Agent",
    usedAt: ["S9.5"],
    requires: "Change description, cost effect, signatures",
    provides: "VA approval of changes before work",
    sahshaCategory: "Construction Data / Change Order Requests/Amendments",
    publicCopy: "yes, retrieved",
    file: "forms/VA-26-1844-HUD-92577.pdf",
  },
  {
    id: "va-10091",
    number: "10091",
    title: "VA-FSC Vendor File Request Form (JAN 2024)",
    kind: "VA form",
    direction: "Builder or payee to Agent",
    usedAt: ["S5.6", "S6.1", "SX.1"],
    requires:
      "Payee/vendor type C Commercial, DBA, banking details; plus voided check",
    provides: "EFT payment to builder or reimbursement payee",
    sahshaCategory: "not listed in guide table",
    publicCopy: "yes, retrieved",
    file: "forms/VA-10091.pdf",
  },
  {
    id: "va-10-0103",
    number: "10-0103",
    title:
      "Veterans Application for Assistance in Acquiring Home Improvements and Structural Alterations (MAR 2025)",
    kind: "VA form (VHA)",
    direction: "Given to Veteran",
    usedAt: ["S3.1"],
    requires: "n/a (informational in packet)",
    provides: "Referral to HISA benefit",
    sahshaCategory: "n/a",
    publicCopy: "yes, retrieved",
    file: "forms/VA-10-0103.pdf",
  },
  {
    id: "va-21-2680",
    number: "21-2680",
    title:
      "Examination for Housebound Status or Permanent Need for Regular Aid and Attendance (JUN 2026)",
    kind: "VA form",
    direction: "Given to Veteran",
    usedAt: ["S3.1"],
    requires: "n/a",
    provides: "Referral to Aid and Attendance",
    sahshaCategory: "n/a",
    publicCopy: "yes, retrieved",
    file: "forms/VA-21-2680.pdf",
  },
  {
    id: "va-21-4502",
    number: "21-4502",
    title:
      "Application for Automobile or Other Conveyance and Adaptive Equipment (AUG 2024)",
    kind: "VA form",
    direction: "Given to Veteran",
    usedAt: ["S3.1"],
    requires: "n/a",
    provides: "Referral to auto allowance",
    sahshaCategory: "n/a",
    publicCopy: "yes, retrieved",
    file: "forms/VA-21-4502.pdf",
  },
  {
    id: "va-10-1394",
    number: "10-1394",
    title:
      "Application for Adaptive Equipment Automobile or Other Conveyance (JUN 2024)",
    kind: "VA form (VHA)",
    direction: "Given to Veteran",
    usedAt: ["S3.1"],
    requires: "n/a",
    provides: "Referral to adaptive equipment",
    sahshaCategory: "n/a",
    publicCopy: "yes, retrieved",
    file: "forms/VA-10-1394.pdf",
  },
  {
    id: "va-28-1900",
    number: "28-1900",
    title:
      "Application for Veteran Readiness and Employment Benefits (edition printed DEC 2026)",
    kind: "VA form",
    direction: "Given to Veteran",
    usedAt: ["S3.1"],
    requires: "n/a",
    provides: "Referral to VR&E",
    sahshaCategory: "n/a",
    publicCopy: "yes, retrieved",
    file: "forms/VA-28-1900.pdf",
  },
  {
    id: "medical-feasibility-10-4555b",
    number: "10-4555b",
    title: "Certificate of Medical Feasibility (scanned image, 1998)",
    kind: "VA form (VHA, internal)",
    direction: "VHA to Agent",
    usedAt: ["S4.4"],
    requires:
      "Medical opinion that the Veteran can reside outside an institution",
    provides: "Medical feasibility for CA when not assumed",
    sahshaCategory: "Feasibility Data / Medical Feasibility Data",
    publicCopy: "yes, retrieved",
    file: "forms/VA-10-4555b.pdf",
  },
]

/** VA forms used at a step, in table order. */
export const formsForStep = (stepId: string) =>
  vaForms.filter((form) => form.usedAt.includes(stepId))
