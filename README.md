# Terra Cognita

An inner-life cartography instrument: a life drawn as land, time as geology, and both bound to
a timeline of the events that laid them down.

![The map of Specimen A at age 38: six districts washed in colour over a contoured landmass,
schemas drawn as peaks, events as index fossils, typed edges between them, the reading panel
beside it and the elevation and glyph legend below.](docs/img/terra-cognita.png)

A structure a person is made of is invisible to them; they look through it. The same structure
drawn as a landform is something they can stand beside and appraise. That move is the whole
instrument. Elevation is mass, and mass is how many times an event confirmed a thing, so the
peaks are what a life kept re-teaching. Depth is time: pull a core sample from any structure
and the strata are the events that laid it down, oldest at the bottom, with later
reinterpretations cutting across them as dated intrusions. Drag the age marker back and the
continent un-forms.

It never decides. Nothing is scored against a norm, ranked, or recommended. Gaps in the record
are drawn as gaps, hatched and labelled, because a map that quietly fills its silences is
lying.

## The data is invented

The life on the page is **Specimen A**, a synthetic life born 1988 and told at 38, with a
second synthetic account for three shared events. It is fiction, written to exercise every
mechanic: an early move, a parent's illness, a job loss in 2008, an abandoned craft, an
overwork script, a panic attack, a lockdown, a quit, a return to the craft, and a conversation
that recuts a belief seventeen years after it formed. No real person's life is in this repo.

This is a working prototype of a plan, not a finished instrument. `docs/PLAN.md` summarises
the design the page is drawn from, including what it does not yet do.

## What it reads and writes, and what never leaves the machine

Nothing leaves the machine. There is no backend, no account, no analytics, no telemetry and no
storage of any kind: the page holds its state in memory and forgets it on reload.

| Path                  | Direction | What                                                   |
| --------------------- | --------- | ------------------------------------------------------- |
| `index.html`          | read      | the page, and the `SPECIMEN` constant inside it         |
| nothing               | write     | there is no export yet; feature 002 adds a local file   |

Two things are fetched from third parties today, both at load: d3 7.9.0 from cdnjs, and the
Google Fonts stylesheet with the three faces it pulls in. That is the only network traffic, it
carries nothing from the page, and removing it is
[feature 001](docs/features/001-zero-third-party-requests.md).

## Prerequisites

A browser. No Node, no package manager, no build step, no dependency to install. Python only
if you would rather serve the file than open it.

## Run

```bash
open index.html                  # or drag it into a browser window
python3 -m http.server 5353      # then http://localhost:5353
```

## How it works

One HTML file. A `SPECIMEN` constant holds the life; everything visible is derived from it at
render time, and nothing is hand-placed except the node coordinates.

Four surfaces read the same data:

- **The map** is a density field over the nodes, weighted by mass, contoured into elevation
  bands. Districts are Voronoi cells merged by domain. Schemas are peaks because a schema
  confirmed nine times has nine reinforcements of mass.
- **The timeline** is the age axis, with a clock scale and a proportional one where
  `x ∝ ln(1 + age)`, because a year at seven is subjectively longer than a year at thirty-seven.
  Above the personal lanes are three outer lanes for structure, conjuncture and event, the
  historian's three durations. The reminiscence bump is shaded, the unconformity is hatched,
  and the red marker is draggable: it is a cross-section plane, and the map re-renders as of
  wherever you put it.
- **The strata panel** is the core sample: reinforcements as bands with thickness for
  intensity, tinted by the district of the event, oldest at the bottom, with recuts drawn as
  diagonal cuts across them.
- **The compare overlay** lays a second account's version of the same events over the first.
  The two are never merged, and neither is adjudicated. The same event sitting in a different
  district for each person is the finding, not an error to resolve.

`docs/ARCHITECTURE.md` is the map of the file itself.

## Running it on your own life

Today: edit the `SPECIMEN` constant. That is a real answer and a bad one, and
`docs/features/002-own-map-as-a-local-file.md` replaces it with a JSON file beside the page.
`docs/TEMPLATE.md` is the full seam: what in here is the specimen and what is the instrument.

## Part of the constellation

One of the instruments from the Center for Applied Post-Phenomenology, alongside
[niwa](https://github.com/pvcomms/niwa), kiku and
[chronology](https://github.com/pvcomms/chronology). They share one contract: local by default,
flat files as the database, no dependency without a written reason, and the tool never decides
anything on your behalf. The contract is vendored into [`AGENTS.md`](./AGENTS.md).

The timeline surface here is also the seed of `chronology`, which is that number line on its
own, with its own data file. The two are meant to be linked by event id; that is
[feature 004](docs/features/004-link-to-chronology-by-event-id.md).

## License

MIT. See [LICENSE](./LICENSE).
