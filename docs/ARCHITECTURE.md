# Architecture

> The map. Read this instead of crawling a 123 KB file.

## In one paragraph

One static HTML file. A `SPECIMEN` constant holds a synthetic life as a typed graph; four
surfaces render it, all from the same data at the same moment in time. `state.age` is the
cross-section: every surface takes it as an argument, and dragging the timeline marker
re-renders all of them as of that age. There is no server, no storage and no build step. d3 and
the fonts come from CDNs today, which is the one thing about this page that is not local.

## The tree

```
terra-cognita/
  index.html          the whole program: markup, style, SPECIMEN, render
  scripts/
    shot.mjs          writes docs/img/terra-cognita.png; Playwright from a sibling project
  docs/
    PLAN.md           the published summary of the design
    private/          gitignored. the source plan document. never published
    img/              generated
    features/         one file per piece of work, numbered, never renumbered
```

## The file, top to bottom

| Lines     | What                                                                       |
| --------- | --------------------------------------------------------------------------- |
| 1–4       | `<head>`, the Google Fonts links                                           |
| 5–281     | `<style>`: tokens on `:root` and again for dark, the map, the panel, the timeline, the plan prose |
| 282–325   | markup: masthead, `.instrument` (the map plus the panel), `.timeline`      |
| 326–607   | `<main class="plan">`: the prose sections and the reading list             |
| 609       | the d3 `<script src>`                                                      |
| 612–891   | `SPECIMEN`                                                                 |
| 892–911   | derived constants and `state`; `mass()`, `radius()`, `visible()`, `pts()`  |
| 912–965   | `glyph()`, `wrap()`, the map scaffold, `defs`, the compass                 |
| 966–1040  | the density field, `renderLand`, `renderDistricts`, `edgePath`, `renderEdges`, `renderNodes` |
| 1042–1060 | the tooltip and the zoom behaviour                                         |
| 1061–1101 | `select()`, `enterField()`, `setMode()`, `seg()`, `setAge()`               |
| 1102–1190 | the panel: `defaultPanel`, `coreSample`, `nodePanel`, `ghostPanel`, `renderPanel`, `tryIt` |
| 1192–1262 | the timeline: `TL`, `xs`/`xinv`, `renderTimeline`, `renderTimelineAge`, the drag |
| 1264–1296 | the legend and the boot sequence                                           |

Line numbers drift. The comment banners in the script are the durable landmarks.

## The four surfaces

| Surface        | Where                        | Reads                                              |
| -------------- | ---------------------------- | --------------------------------------------------- |
| map            | `<svg id="map">`, 1200×760   | every node at `state.age`, plus edges and districts |
| timeline       | `<svg id="tl">`, 1200×250    | events, circumstances, unconformities, `state.age`  |
| strata panel   | `<aside id="panel">`         | one selected node and the edges touching it         |
| compare overlay| `.ghosts` inside the map svg | `SPECIMEN.accountB.ghosts`, shown when compare is on |

## Data flow

```
SPECIMEN ──▶ mass(node, t) ──▶ pts(t) ──▶ contourDensity ──▶ renderLand      ─┐
    │                              └─────▶ Delaunay.voronoi ─▶ renderDistricts ├─▶ #map
    │                                                          renderNodes     │
    │                              EDGES ─▶ edgePath ─────────▶ renderEdges   ─┘
    │
    ├──▶ nodes of type event ─────▶ xs(age) ─▶ renderTimeline ──────────────────▶ #tl
    │    circumstances, unconformities
    │
    └──▶ state.selected ─────────▶ nodePanel / coreSample ─────────────────────▶ #panel

state.age ──▶ setAge() ──▶ renderMap() + renderTimelineAge() + renderPanel()
```

`setAge()` is the spine. The timeline drag, a click on the axis, a click on a future event, the
`tryIt` shortcuts and entering field mode all funnel through it, and it re-renders everything.

## The `SPECIMEN` shape

```js
{
  birthYear: 1988, age: 38, told: 38, north: 'v_honesty',
  domains: { family: { label: 'Family' }, ... },        // six; the district set
  nodes: [ ... ],
  edges: [ [from, to, type, rung], ... ],
  unconformities: [ { from, to, kind, note } ],
  unexamined: { points: [[x, y], ...], label },
  circumstances: {
    structure:   [ { label, from, to } ],               // Braudel's long duration
    conjuncture: [ { label, from, to } ],
    events:      [ { label, age } ]
  },
  accountB: { label, birthYear, ghosts: [ { id, shared, kind, label, domain, x, y, ageB, quote, displacement } ] }
}
```

A **node** carries `id`, `type`, `label`, `domain`, `formed`, `x`, `y`, `status`, and per type:

| Type       | Also carries                                                              |
| ---------- | --------------------------------------------------------------------------- |
| `event`    | `intensity` 1–3, `quotes[]`, `now` (the first-person present-tense line), `circ[]` |
| `person`   | `quotes[]`                                                                 |
| `belief`   | `locus`, `reinf[{age, ev, i}]`, `quotes[]`                                 |
| `schema`   | `young` (the schema-therapy category), `reinf[]`, `quotes[]`               |
| `value`    | `locus`, `higgins` (actual/ideal/ought), `reinf[]`, `quotes[]`             |
| `strategy` | `protects[]` (schema ids), `reinf[]`, `quotes[]`                           |
| `taste`    | `locus`, `prov{age, via}`, `audience[]`, `ifNobodyKnew`, `labelled`, `blind` |

`formed` is valid time: when the thing happened. `told` is transaction time for the whole
account: when it was said. The gap between them is rendered in the panel as "years unnamed".

`status` is one of `reported`, `proposed`, `endorsed`, `contested`. `proposed` halves mass and
draws a dashed outline: the model's guess is visible as a guess.

`edges` are tuples, not objects, because there are eighty-three of them and the tuple form is
readable in a diff. `EDGES` inflates them at boot. `type` is one of `caused`, `reinforced`,
`contradicts`, `inherited`, `protects`, `recut`, `mediates`; `rung` is Pearl's ladder,
`association` / `intervention` / `counterfactual`.

## `state`

```js
{ age, mode, edges, mediation, compare, selected, scale, ageBeforeField }
```

`age` is the cross-section. `mode` is `observer` or `field`. `edges` filters which edge types
draw. `mediation` toggles the locus hatch. `compare` shows the second account. `selected` is a
node id or a ghost id. `scale` is `clock` or `proportional`. `ageBeforeField` remembers where
time was before field mode moved it.

## The render functions

`renderLand(t)`, `renderDistricts(t)`, `renderEdges(t)` and `renderNodes(t)` each take the age
and rebuild their layer; `renderMap()` calls all four. `renderGhosts()` draws the second account
once. `renderTimeline()` draws the bump, the unconformities, the circumstance bands, the outer
events, the axis and the event lanes; `renderTimelineAge()` draws only the future shade and the
marker, and is the one that runs on every drag frame. `renderPanel()` dispatches to
`defaultPanel`, `nodePanel` or `ghostPanel`.

## What it reads and writes

| Path                     | Direction | What                                     |
| ------------------------ | --------- | ------------------------------------------ |
| `index.html`             | read      | the page and the `SPECIMEN` inside it     |
| `cdnjs.cloudflare.com`   | read      | d3 7.9.0, at load                         |
| `fonts.googleapis.com` and `fonts.gstatic.com` | read | the stylesheet and three faces |

Nothing is written. No storage, no cookie, no network write of any kind.

## Invariants

Mass is derived. Proposals are half mass. The specimen is synthetic. Nothing ranks. The page
works from `file://`. Nothing here deploys.

## Known sharp edges

**Single file, and it is now large.** 123 KB with the data, the styles and the program in one
document. Splitting it is not free: the `file://` promise is the reason it is one file, and a
module graph does not load from `file://` without a server. `002` moves the data out, which is
the part that actually needs to move.

**d3 comes from a CDN today, and the fonts come from Google.** The page is described as
self-contained in several places and is not, until `001`.

**Node coordinates are hand-placed**, and every derived surface depends on them. See
`AGENTS.md`.

**The elevation thresholds are frozen at boot**, deliberately, so that scrubbing time compares
like with like. See `AGENTS.md`.

**Two structure bands are laid out by matching their label strings.** Renaming them in
`SPECIMEN` un-staggers the lane.

**The `<main class="plan">` prose is a condensation of a document that is not in this repo.**
It stands on its own and must keep standing on its own: nothing in it may be edited into a
reference a reader cannot follow.
