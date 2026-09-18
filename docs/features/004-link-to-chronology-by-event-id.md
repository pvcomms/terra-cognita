---
title: Link to chronology by event id
status: draft
created: 2026-09-19
---

# 004 — Link to chronology by event id

## Why

The same life now has two instruments looking at it. This one renders structure, with time as a
scrubber. `chronology` renders time, at a resolution this page's compressed timeline cannot
reach. They were one surface until the timeline was extracted, and a person reading their own
map will want to go from "this event made that peak" to "what else was happening that year"
without hunting for it by eye.

Two views of one dataset that cannot address each other are two datasets, and they will drift.

The link is navigation only. Neither page ranks the other's contents, neither sorts by
importance, neither decides what is worth looking at. One opens the other at the same event.

## What changes

- Before: an event in the panel here has no relationship to the same event over there.
- After: selecting an event offers a link that opens `chronology` with that event selected, and
  `chronology` offers the reverse.

## Where

| File                                 | Change                                                    |
| ------------------------------------ | ----------------------------------------------------------- |
| `index.html` `nodePanel()`           | a link on event nodes when a chronology path is configured |
| `index.html` boot                    | read `#event=<id>` and select it                           |
| `map.json`                           | an optional `chronology` field: a relative path or a URL   |
| `docs/ARCHITECTURE.md`               | the two-instrument relationship                            |
| `chronology` side                    | the mirror of all of the above, as its own `004`           |

Address by `id`, not by label or by age. Ids are already stable in both shapes, labels get
edited and ages can be corrected. An id that does not exist on the other side should say so on
arrival rather than silently selecting nothing.

Both pages must keep working with no link configured and with the other page absent. Nothing
about this feature may make either instrument depend on the other existing.

Use the fragment, never a query string. The fragment is not sent to a server, and an event id
from a person's own life is not something to put in a request line even against a static host.

## Out of scope

No shared runtime, no iframe embedding, no merged data file, no cross-page state. No syncing:
each page reads its own file, and keeping ids aligned across the two is the person's business,
or later, one exporter's.

## Acceptance checks

```bash
python3 -m http.server 5353   # both pages served from one tree
```

- [ ] Selecting an event here and following the link opens chronology with the same event
      selected and the readout at its age
- [ ] The reverse direction lands on the same node here, with the map at that age
- [ ] With no `chronology` field configured, no link is shown and nothing is broken
- [ ] An id that is not in the other file shows a plain message naming the id
- [ ] The event id never appears anywhere but the fragment

## Notes

Draft: `chronology` needs its own data file and its event shape needs to have settled before the
ids are worth addressing. This spec and chronology's `004` are the same feature from two sides
and should be built together.
