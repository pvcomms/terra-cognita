# Decisions

Append-only. Newest last. One entry per decision that would otherwise be re-litigated.

---

**2026-09-17 — The specimen is synthetic, by design and permanently.**
The page runs on "Specimen A", an invented life born 1988 and told at 38, with a second invented
account for three shared events. The data exists to exercise every mechanic — an unconformity,
a recut seventeen years after the fact, a taste with a labelled-versus-blind delta, a strategy
that protects a schema — in a way real early data never would, because a real life at the start
of this work would populate two node types and leave the rest undrawn. It is also the only
honest way to publish the page. Nothing in `SPECIMEN` is a real person's, and nothing real is
ever to be put there.

---

**2026-09-17 — A static single file.**
No server, no build step, no framework. The instrument is about a person's most sensitive data,
and the strongest possible statement about where that data goes is a page that has nowhere to
send it. The cost is a 123 KB file holding markup, styles, data and program together, and the
`file://` requirement rules out splitting it into modules without a server. `002` moves the data
out, which is the part that genuinely needs its own file.

---

**2026-09-17 — d3, and only d3.**
The page needs `contourDensity` for elevation from a weighted point field, `Delaunay`/voronoi
for districts, `geoPath` for contour rendering, and `zoom` and `drag`. Each of those is a real
algorithm, and writing marching squares by hand to avoid a dependency would be a worse use of
the constellation's "prefer thirty lines you can read" rule than taking the library that
already has them. It is the only dependency, it is used for four distinct things, and it is
pinned. It arrives from cdnjs today, which is the part that is wrong; vendoring it is
`docs/features/001-zero-third-party-requests.md`.

---

**2026-09-17 — Elevation thresholds are computed once and then frozen.**
`TH` comes from a probe render at the specimen's current age and is reused at every scrubbed
age. Recomputing per frame would make each age's contours relative to itself, so a low hill at
age 12 and a mountain at age 38 would be drawn the same and the whole point of scrubbing — the
continent visibly forming — would vanish. Frozen thresholds mean early ages look sparse. That
is the finding, not a rendering bug.

---

**2026-09-17 — Proposals are drawn at half mass rather than hidden until endorsed.**
A node inferred by a model rather than said by the person could have been kept off the map until
confirmed. Drawing it dashed at half contribution is better: the person sees what the model
thinks, can contest it, and can see how much of the landscape is the model's opinion. A map that
shows only endorsed structures would look more certain than it is.

---

**2026-09-19 — The plan document stays out of this repo.**
A 70 KB design document sits behind this page. It is written as a letter to one named person: it
opens by naming him, it argues against the framing in his private brief, it cites a private
north-star document of his, it sets gates in terms of his own usage, and it makes him subject
one of the evaluation. The specific things flagged for review — roughly ten mentions of therapy
and four of "father" — turned out clean, being research framing and the synthetic specimen's
family. The second-person material is not clean, and none of it is the specimen's or the
literature's. The file is held at `docs/private/`, which is gitignored, and was removed from the
repository's only commit before any remote existed. `docs/PLAN.md` is a published summary
written from the impersonal parts.

---

**2026-09-19 — `docs/PLAN.md` says its citations are unverified.**
The source document states that every reference in it is given from memory and was not checked
against a primary source. Publishing a summary of it without carrying that warning forward would
turn a working note into an apparent literature review. The header says so in the first
paragraph, and every name in it is a pointer to look up rather than a claim that was checked.

---

**2026-09-19 — Doc set adopted; the repo goes public.**
`AGENTS.md` with the vendored constellation kernel, `docs/ARCHITECTURE.md`, this file,
`docs/TEMPLATE.md`, four numbered feature specs, `CONTRIBUTING.md`, `SECURITY.md`,
`CHANGELOG.md`, MIT `LICENSE`, and a screenshot from headless Chromium. The page was live on
Vercel with no repository behind it; now the repository is the source and the deployment is
downstream of it.

---

**2026-09-19 — The timeline surface is being extracted into its own repo.**
`chronology` is the age axis, the outer lanes, the unconformities, the reminiscence bump and the
draggable present marker, standing alone with its own `events.json`. A number line of a life is
useful to someone who will never want a map of one, and the map's timeline had grown into a
second instrument living inside the first. The two are meant to be linked by event id rather
than merged; that is `004`, and it stays `draft` until `chronology` has a stable event shape.
