---
title: Import life events from markdown
status: draft
created: 2026-09-19
---

# 003 — Import life events from markdown

## Why

People who keep notes already have their life events written down, in a vault, in dated files,
in prose. Asking them to retype those into JSON to see them on a map is asking them to do the
work twice, and the second copy immediately starts drifting from the first.

Markdown with frontmatter is what the constellation already treats as the human-authored format.
An events file a person can write in their own editor, keep in their own vault, and read as
prose is a better front door to this instrument than any form.

The importer must not interpret. It converts dates to ages and reads fields that are written
down. It does not infer a domain, guess an intensity, or propose a belief from a sentence: that
is the extractor's job in a later stage, and it requires the epistemic machinery this feature
does not touch.

## What changes

- Before: events are JSON objects with an `age` in them.
- After: a markdown file with absolute dates is a first-class source, converted to ages on load.

## Where

| File                   | Change                                                       |
| ---------------------- | -------------------------------------------------------------- |
| `events.md`            | new. the example, in the shape below                          |
| `index.html`           | a parser: frontmatter, then one event per list item or heading |
| `docs/TEMPLATE.md`     | the markdown path as the recommended way in                   |

```markdown
---
birthYear: 1988
told: 2026-09-19
---

- 1996-08-01 — Moved cities; lost first friends
  domain: belonging
  intensity: 3
  note: Nobody asked me. One day the house was boxes.
```

Ages come from the date and `birthYear`, floored to whole years. A date with no day is the
middle of the month; a year alone is the middle of the year. Record which rule applied, because
an event placed at 8 rather than 9 moves it across a district boundary on the timeline.

Use the same event shape `chronology` defines — `{id, label, domain, age, intensity, note}` —
so a file written for one renders in the other. Generate `id` from the label when the file does
not give one, and keep generation stable, or every re-import renumbers everything.

## Out of scope

No inference of any kind: no domain guessing, no intensity guessing, no relationship extraction,
no NLP. No writing back to the markdown. No vault crawling, no directory scanning, no watching:
one file the person points at. No support for other note formats.

## Acceptance checks

```bash
python3 -m http.server 5353
```

- [ ] A four-event `events.md` renders four events at the right ages
- [ ] A date with no day and a bare year both land where the documented rule says
- [ ] An event missing `domain` reports which line it is on, rather than vanishing
- [ ] The same `events.md` renders identically in `chronology`
- [ ] Re-importing an unchanged file produces identical ids

## Notes

Draft, not next: it depends on `002` having moved the data out of the page, and on
`chronology`'s event shape having settled. Ordering is 002, then chronology 001, then this.
