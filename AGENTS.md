# Agents

Constellation-wide rules are vendored at the bottom of this file. The map is
`docs/ARCHITECTURE.md` — read that instead of crawling a 123 KB file.

## Stack

One HTML file, 123 KB, with an inline `<style>` and an inline `<script>` in modern browser
JavaScript. No framework, no bundler, no package manager, no `node_modules`. Two things come
from third parties at load and both are `docs/features/001-zero-third-party-requests.md`:

- d3 7.9.0 from `cdnjs.cloudflare.com`, used for `contourDensity`, `Delaunay`/voronoi, `geoPath`,
  `zoom`, `drag`, `polygonCentroid`, selections and transitions
- the Google Fonts stylesheet: Bricolage Grotesque, Newsreader, JetBrains Mono

`scripts/shot.mjs` is the only file that runs under Node, and it loads Playwright from a
sibling project rather than installing it here.

## Commands

```bash
open index.html               # the proof: the map draws, the marker drags, the panel fills
python3 -m http.server 5353   # http://localhost:5353, the same page served
node scripts/shot.mjs         # rewrites docs/img/terra-cognita.png at 1400x900
grep -c 'https://' index.html # third-party references; 001 drives this down to the citations
```

There are no tests and no typecheck. `CONTRIBUTING.md` carries the by-hand list that replaces
them, and a change is not finished until that list has been walked.

## Do not touch

**`docs/private/`.** It is gitignored and holds the source plan document, which is written to
one named person about his own brief and stays out of this repo permanently. Do not move it in,
do not quote from it into a published file, do not reference its contents as if a reader could
check them. `docs/PLAN.md` is the published summary and is the only thing that cites it.

`.vercel/`. The Vercel project exists; nothing in this repo deploys, and no agent should.

`docs/img/terra-cognita.png` by hand — it is written by `scripts/shot.mjs`.

## Invariants

**The specimen is synthetic and stays synthetic.** Every name, quote, event and date in
`SPECIMEN` is invented to exercise a mechanic. Never replace any of it with material from a
real life, and never add a real person's detail as a more vivid example.

**Never deploy this from an agent session.** `.vercel/` is present and the project exists. This
repo's job is the page and the docs.

**Mass is derived, never stored.** `mass(n, t)` sums the intensities of reinforcements at or
before `t`; elevation is a density over mass; the coastline is the lowest threshold. Every
surface recomputes from `SPECIMEN` at the current age. Do not cache a rendered state, and do not
add a field that duplicates something `mass()` can compute.

**Proposals are drawn at half mass.** `status: 'proposed'` halves a node's contribution. That is
the visible difference between what the person said and what a model inferred, and it is
load-bearing for the whole epistemic layer.

**Nothing ranks or recommends.** No score of a life, no "your top schema", no ordering of
people or districts by anything but what the data mechanically implies. Unconformities are
drawn as gaps rather than filled.

**The page works from `file://`.** No feature may require a server without a `file://` path.

## Traps

**Node coordinates are hand-placed.** Every node in `SPECIMEN` carries an `x` and a `y` in the
1200×760 map space, chosen so districts read as coherent regions. The density field, the
Voronoi cells, the district labels and the edge curves are all derived from them, so moving one
node changes the coastline and can move a district label into the sea. Change coordinates in
small steps and look at the result.

**The density thresholds are computed once, at boot, from the age-38 state.** `TH` is derived
from a probe render at `S.age` and then reused for every scrubbed age. That is deliberate: it
keeps the elevation legend meaningful while you drag time. If you recompute thresholds per
frame, the contours stop being comparable between ages and the "watch the continent form"
reading breaks.

**`glyph()` returns a path string, and the timeline uses it too.** The map, the legend and the
timeline event marks all call it. A change to the event glyph shows up in three places.

**Field mode moves the age.** Entering field mode on a node sets the age to that node's
`formed`, stashing the previous age in `state.ageBeforeField`. Code that reads `state.age` to
mean "now" is wrong while field mode is on.

**The wobble filter reseeds on a timer.** A `setInterval` ticks the `feTurbulence` seed every
200 ms while the map is in view and the tab is visible, which is the hand-drawn line boil. It is
skipped under `prefers-reduced-motion`. It is also the reason a screenshot of the coast is never
byte-identical twice.

**Two of the timeline's structure bands are positioned by label.** `renderTimeline()` filters by
the literal strings `First-generation university family` and `Single-income household` to stagger
them. Renaming either in `SPECIMEN` silently un-staggers the lane, and that is one of the
reasons `002` moves the data out of the file.

---

<!-- BEGIN:node -->

## This node

| | |
|---|---|
| **Role** | instrument · CAPP |
| **Local** | `~/work/capp/instruments/terra-cognita` |
| **GitHub** | [pvcomms/terra-cognita](https://github.com/pvcomms/terra-cognita) |
| **Live** | https://terra-cognita.vercel.app |
| **Surface** | public — prototype on Vercel, synthetic data |

An inner-life cartography instrument: a life as land, time as geology, bound to a timeline of events.

**How it relates to the whole.** A sense-making tool you can open and use. It must argue something about perception — otherwise it is a tool and belongs in ~/personal/tools/.

Siblings (instrument, capp): `chronology`, `nervous-system-sandbox`, `suji`, `think-forward-reverse`, `venn`.

The two trees are `~/work/capp/` (the Center) and `~/personal/` (everything else). `~/Code/` is a compatibility symlink farm — never build there.

Front door for all of it:

```bash
cd ~/work/capp/spine && python3 bin/scan.py && cat START.md
```

This block is generated by `spine/bin/scan.py --sync` from `projects.json`. Do not edit it here.

<!-- END:node -->

<!-- BEGIN:capp -->

## Constellation rules

This repo is part of the Center for Applied Post-Phenomenology constellation. These rules hold
here and in every sibling repo. This block is generated — edit `spine/KERNEL.md`, not this copy.

**Read this much, then stop.** This file, then `docs/ARCHITECTURE.md` for the map, then the one
feature spec you were given at `docs/features/NNN-slug.md`. Do not crawl the repo to get
oriented — the architecture doc exists so you do not have to. Do not open a fifth document
without a reason you could state. Token discipline is a product requirement here, not a
preference: a tool about attention that wastes yours is a joke.

**Local by default.** Personal data stays on the machine that made it. No telemetry, no
analytics, no error reporting to a third party, no fonts or scripts from a CDN, no usage pings.
If a feature needs the network it says so in its spec and names the host.

**Flat files are the database.** Markdown with YAML frontmatter for what a human writes, JSON
for what a program writes. No hosted database, no ORM, no migration framework.

**The tool never decides.** Nothing ranks a person's options for them, scores them against a
norm, or recommends. Instruments surface; people judge. If a spec asks for a recommendation
engine, it is out of scope — say so rather than building it.

**No dependency without a written reason** in `docs/DECISIONS.md`. Prefer the standard library.
Prefer thirty lines you can read.

**Three similar lines beat a premature abstraction.** Extract on the third repetition.

**Never invent a fact about the system.** If you need to know what deploys where or whether
something is live, check it. This whole structure exists because hand-written claims drifted
from reality while still reading as authoritative.

**Features** are `docs/features/NNN-slug.md` with frontmatter `status:` of `draft` / `next` /
`building` / `shipped` / `parked`. Acceptance checks are commands with expected output, never
adjectives. Mark `shipped` only when you ran them and they passed — and report the output. A
feature you could not finish stays `building` with a note on what blocked it. Never silently
narrow scope.

**Style.** Plain declarative prose, no emoji, no "comprehensive" or "seamlessly", no summary
paragraph restating what was just said. Code matches its neighbours. Commit subjects say what
changed and why it mattered.

**Before you finish**, run the repo's tests and typecheck, and say plainly what passed, what
failed, and what you did not do.

<!-- END:capp -->
