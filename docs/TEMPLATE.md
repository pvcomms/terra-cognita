# Running your own

This instrument was built against one invented life on purpose. The specimen is not a
placeholder for a real person's data; it is a test fixture that exercises every mechanic. Which
means the seam between "the specimen" and "the instrument" is unusually clean, and this file is
where it runs.

## What is the specimen

Everything inside the `SPECIMEN` constant in `index.html`, lines 612 to 891.

| Thing                                              | Where                        | Replace with                          |
| -------------------------------------------------- | ---------------------------- | ------------------------------------- |
| `birthYear: 1988`, `age: 38`, `told: 38`           | top of `SPECIMEN`            | yours                                 |
| The six domains                                    | `SPECIMEN.domains`           | your own districts; the count is free |
| Every node: events, people, beliefs, schemas, values, strategies, tastes | `SPECIMEN.nodes` | yours                        |
| `x` and `y` on every node                          | `SPECIMEN.nodes`             | hand-placed; see below                |
| The eighty-three edges                             | `SPECIMEN.edges`             | yours                                 |
| `north: 'v_honesty'`                               | top of `SPECIMEN`            | the value id you want the compass to point at |
| The unconformity at 11–13, and the unexamined patch | `SPECIMEN.unconformities`, `.unexamined` | your own gaps, or none |
| The structure, conjuncture and outer-event bands   | `SPECIMEN.circumstances`     | the conditions you actually lived under |
| The second account                                 | `SPECIMEN.accountB`          | a second person's version, or delete it |
| The district colours `--d-family` … `--d-taste`    | `:root` in `<style>`         | one per district you define           |
| The masthead copy and the specimen tag             | the markup                   | your own framing                      |
| Port 5353                                          | `AGENTS.md`                  | anything free                         |

Node coordinates are the awkward part. They are hand-placed in a 1200×760 space, and the
coastline, the districts, the district labels and every edge curve are derived from them. Put
things that belong together near each other and the map reads; scatter them and it does not.
There is no automatic layout, and the design document argues there should not be a fully
automatic one: where you put "father" is itself data.

## What is the instrument

Everything below line 892. `mass()` and the density field, the contour bands and the coastline
threshold, the Voronoi districts and their mass-weighted labels, `glyph()`, the typed edge
rendering with its rungs and arrows, the core-sample column with its intensity-thick bands and
its dated intrusions, the locus gauge, the taste provenance box, observer and field modes, the
compare overlay with its displacement note, the zoom and the fog, and the whole timeline: the
two scales, the outer lanes, the reminiscence bump, the unconformity hatch, the future shade and
the draggable marker.

None of it knows whose life it is drawing. It reads `SPECIMEN` and renders whatever is there.

The epistemic layer is also general and is the part most worth keeping: `status` on every node,
`proposed` at half mass and dashed, `contested` in red, a `rung` on every edge, and receipts
quoted with the age at which they were told. Any version of this that drops those is a different
and worse instrument.

## Running it against your own life

1. Clone. Open `index.html`. No install step.
2. Decide your districts first. They are the spatial frame everything else is placed inside, and
   changing them later moves every coordinate.
3. Write your events: `id`, `label`, `domain`, `formed` as an age, `intensity` 1 to 3, a `quote`
   with the age you are telling it at, and `now` in the first person present tense if you want
   field mode to work on it.
4. Place them. Same district near each other. Expect to iterate with the page open.
5. Add the structures the events laid down — beliefs, schemas, values, strategies — each with
   `reinf` entries pointing at the events that confirmed them. That list is what makes a peak.
6. Draw the edges. Be strict about `rung`: `counterfactual` only where you would actually say
   "if that had not happened".
7. Name your gaps. `unconformities` with a kind — `no-record`, `refused`, `unexamined` — is the
   feature that keeps the map honest, and leaving it empty is a claim that you remember
   everything.

Then keep it local. This is the most sensitive file you will ever write about yourself.

## What will not work yet

**Your data lives inside the page.** Editing a 123 KB HTML file to add an event is a bad
authoring experience and one bad paste away from breaking the program.
`docs/features/002-own-map-as-a-local-file.md` moves it to JSON beside the page.

**Node placement is manual.** There is no layout, no anchoring pass and no semantic placement,
though the design calls for all three.

**Two circumstance bands are laid out by matching their label strings**, so renaming
`Single-income household` or `First-generation university family` un-staggers that lane until
you fix the two lines that reference them.

**Nothing is saved.** There is no export, no import and no persistence. Reload and any state you
changed in the page is gone; the data itself survives only because it is source code.

**The compare overlay assumes exactly one second account**, with its ghosts hand-placed in the
first account's coordinate space.

**Field mode has no time box and no exit ritual**, both of which the design document treats as
safety features rather than polish.

**The page fetches d3 and three fonts** from two CDNs, so it is not yet the local-only artefact
it should be. That is `001`, and it is the first thing to fix.
