---
title: A person's own map as a local file
status: next
created: 2026-09-19
---

# 002 — A person's own map as a local file

## Why

To put your own life on this map you edit a JavaScript constant inside a 123 KB HTML file. One
unbalanced brace and the page is blank, with no error a non-programmer can act on. The thing the
instrument is for — a person building their own atlas over months — is currently an exercise in
not breaking source code, and every edit has to happen in an editor rather than in the page.

It also breaks the constellation's own rule: flat files are the database, and the database here
is a source file. A map should be a document you can back up, version, diff, hand to a therapist
on a USB stick, or delete, without any of those acts involving the program that renders it.

The instrument must not become a place data goes and cannot leave. Local file in, local file
out, no account, no cloud, no import from a service.

## What changes

- Before: the life lives in `SPECIMEN` inside `index.html`. There is no way to save anything.
- After: the page loads `map.json` from beside itself, falls back to the bundled specimen when
  there is no file, and can write the current map back out as a file the person chooses.

## Where

| File                      | Change                                                                |
| ------------------------- | ----------------------------------------------------------------------- |
| `map.json`                | new. the specimen, translated, shipped as the example                  |
| `index.html` around 612   | `SPECIMEN` becomes an inline `<script type="application/json">` fallback |
| `index.html` boot         | `loadMap()`: try `fetch('map.json')`, fall back to the inline block     |
| `index.html` controls     | an _open_ and a _save_ control in the toolbar                           |
| `docs/ARCHITECTURE.md`    | the data flow starts at a file                                          |
| `docs/TEMPLATE.md`        | the whole "edit the constant" path is replaced                          |

`fetch()` of a sibling file is blocked from `file://` in Chromium, and the page must keep
working when double-clicked. Hence both: fetch the file when it loads, and keep an inline copy
as the fallback, exactly as `chronology` does. Say which one won, somewhere visible, so a person
who edited `map.json` and is seeing the specimen knows why.

Saving uses the File System Access API where it exists, so a person can reopen the same file and
overwrite it, and falls back to a download elsewhere. Neither path uploads anything.

Validate on load: a version field, the domains referenced by nodes existing, edge endpoints
resolving to node ids, and `reinf[].ev` pointing at real events. Report problems in the page in
plain language naming the offending id. Refusing to render with no explanation is the failure
this feature exists to remove.

## Out of scope

No editor for nodes and edges in the page; that is a separate and much larger feature. No
schema migrations. No cloud, no sync, no account, ever. No encryption at rest here — a person
who needs that has a filesystem that does it.

## Acceptance checks

```bash
open index.html                    # with no map.json: the specimen draws, source says "bundled"
python3 -m http.server 5353        # with map.json present: it wins, source says "map.json"
```

- [ ] Editing a label in `map.json` and reloading shows the edit
- [ ] Renaming `map.json` falls back to the bundled specimen without an error dialog
- [ ] Save writes a file that loads back to an identical map
- [ ] A JSON file with an edge pointing at a missing node id names that id on the page
- [ ] The whole round trip works from `file://` as well as over HTTP
- [ ] No request leaves the page at any point in the round trip

## Notes

Ship the specimen as `map.json` as well as inline. A person's first act is usually to open the
example, change one label and see it work; making them export it first is a step too many.

Two circumstance bands are currently positioned by matching their label strings. Fix that while
the data is moving, or the first person to rename a band gets a silently broken lane.
