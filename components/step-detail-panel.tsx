"use client"

import { ExternalLinkIcon, FileTextIcon, PlayIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import type { StepDetail } from "@/lib/step-details"
import type { VaForm } from "@/lib/va-forms"

const NOTE_KINDS = ["Question", "Correction", "Confirmation", "Addition"]

type Note = { kind: string; text: string; author: string }

export function StepDetailPanel({
  detail,
  showVideo = false,
  showOpenQuestions = true,
  forms = [],
  ref,
}: {
  detail: StepDetail
  /** Adds a video placeholder section under the summary. */
  showVideo?: boolean
  /** Shows the step's open questions under "Needs an answer". */
  showOpenQuestions?: boolean
  /** The step's VA forms; those with a PDF are listed as links. */
  forms?: VaForm[]
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    // Focusable so the drawer can open on its top instead of the form.
    <div
      ref={ref}
      tabIndex={-1}
      className="flex flex-col gap-6 p-6 outline-none"
    >
      <div className="flex flex-col gap-2 pr-8">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {detail.stepId} · {detail.phaseTitle}
        </span>
        <SheetTitle className="text-xl font-semibold">
          {detail.title}
        </SheetTitle>
        <SheetDescription className="text-base text-foreground">
          {detail.summary}
        </SheetDescription>
      </div>

      {showVideo && (
        <Section title="Video">
          {/* Placeholder until step videos are uploaded. */}
          <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border bg-muted text-muted-foreground">
            <span className="flex size-14 items-center justify-center rounded-full bg-card shadow-sm">
              <PlayIcon aria-hidden className="ml-1 size-6 text-primary" />
            </span>
            <span className="text-sm">Video coming soon</span>
          </div>
        </Section>
      )}

      <FormPdfs forms={forms} />

      {showOpenQuestions && detail.openQuestions.length > 0 && (
        <Section title="Needs an answer">
          {detail.openQuestions.map((question) => (
            <div
              key={question.text}
              className="flex flex-col items-start gap-2 rounded-md border-l-4 border-primary bg-muted p-3"
            >
              <Badge>Needs an answer</Badge>
              <p>{question.text}</p>
              <span className="text-xs text-muted-foreground">
                From: {question.source}
              </span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            To resolve a conflict or answer a question, leave a note on this
            element.
          </p>
        </Section>
      )}

      {detail.trainingNotes.length > 0 && (
        <Section title="From the training material">
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {detail.trainingNotes.map((note) => (
              <li key={note.text}>
                {note.text}{" "}
                <span className="text-xs text-muted-foreground">
                  ({note.source})
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Actors">
        <TagList items={detail.actors} variant="secondary" />
      </Section>
      <Section title="Systems">
        <TagList items={detail.systems} variant="outline" />
      </Section>
      <Section title="Documents in">
        <TagList items={detail.documentsIn} variant="outline" withIcon />
      </Section>
      <Section title="Documents out">
        <TagList items={detail.documentsOut} variant="outline" withIcon />
      </Section>

      {detail.guide && (
        <>
          <Separator />
          <p className="text-muted-foreground">Guide: {detail.guide}</p>
        </>
      )}
      <Separator />

      <FeedbackForm detail={detail} />
    </div>
  )
}

// The step's form PDFs, each opening in a new tab. Forms without a file
// are left out.
function FormPdfs({ forms }: { forms: VaForm[] }) {
  const withPdf = forms.filter((form) => form.file)
  if (withPdf.length === 0) return null
  return (
    <Section title="PDF files">
      <ul className="flex flex-col divide-y rounded-lg border">
        {withPdf.map((form) => (
          <li key={form.id}>
            <a
              href={`/${form.file}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 transition-colors outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              <FileTextIcon
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground"
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">VA Form {form.number}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {form.title}
                </span>
              </span>
              <ExternalLinkIcon
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground"
              />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      {children}
    </section>
  )
}

function TagList({
  items,
  variant,
  withIcon,
}: {
  items: string[]
  variant: "secondary" | "outline"
  withIcon?: boolean
}) {
  if (items.length === 0) {
    return <p className="text-muted-foreground">None named</p>
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item} variant={variant}>
          {withIcon && <FileTextIcon data-icon="inline-start" />}
          {item}
        </Badge>
      ))}
    </div>
  )
}

// Notes are kept in local state only until there is a backend.
function FeedbackForm({ detail }: { detail: StepDetail }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [kind, setKind] = useState("")
  const [text, setText] = useState("")
  const author = "Isaac Sanchez"

  const addNote = (event: React.FormEvent) => {
    event.preventDefault()
    setNotes((current) => [...current, { kind, text: text.trim(), author }])
    setKind("")
    setText("")
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold">Feedback on this element</h4>
        <span className="text-xs text-muted-foreground">
          {notes.length === 0
            ? "no notes"
            : `${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
        </span>
      </div>

      {notes.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing yet. The first note starts the thread.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {notes.map((note, index) => (
            <li key={index} className="rounded-md border p-3">
              <div className="mb-1 flex items-center gap-2">
                <Badge variant="secondary">{note.kind}</Badge>
                <span className="text-xs text-muted-foreground">
                  {note.author}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{note.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={addNote} className="flex flex-col gap-3">
        <NativeSelect
          aria-label="Kind of note"
          value={kind}
          onChange={(event) => setKind(event.target.value)}
          className="w-fit"
        >
          <NativeSelectOption value="" disabled>
            Choose a kind
          </NativeSelectOption>
          {NOTE_KINDS.map((option) => (
            <NativeSelectOption key={option} value={option}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <p className="text-xs text-muted-foreground">as {author}</p>
        <Textarea
          aria-label="Note"
          placeholder="What is wrong, unclear, right, or worth adding?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs text-muted-foreground">
            {detail.stepId} {detail.title}
          </span>
          <Button type="submit" disabled={!kind || !text.trim()}>
            Add note
          </Button>
        </div>
      </form>
    </section>
  )
}
