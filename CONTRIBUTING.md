# Contributing

There is no CI on this repo. It is one static HTML file with no build step and no test runner.
The checks below are what a person walks before a change is finished.

## Before you start

Read `AGENTS.md`, then `docs/ARCHITECTURE.md`, then the one feature spec you are working on.
Do not crawl the file to get oriented; the architecture doc exists so that you do not have to.

Two things about this repo specifically. The data is a synthetic specimen and must stay
synthetic. `docs/private/` is gitignored and its contents never move into the repository.

## Check it by hand

```bash
open index.html               # the file:// path, which must always work
python3 -m http.server 5353   # http://localhost:5353, the same page served
```

1. **It draws.** Map, timeline, panel and legend all render, and the console is clean.
2. **Time.** Drag the marker to 8. Three islets where a continent was; the timeline events after
   8 go pale; the panel truncates. Drag back to 38 and it all returns.
3. **Both scales.** Switch clock to proportional. Childhood widens, the tick positions move, the
   calendar-year labels follow, and the marker stays on the same age.
4. **Click-to-age.** Click the axis, then click a future event. Both set the age, and the
   readout matches.
5. **Selection.** Click a schema. The core sample column shows its reinforcements oldest at the
   bottom, thickness by intensity, with any recut drawn across it.
6. **Field mode.** Switch to Field with a node selected. The age moves to that node's `formed`,
   the map fogs to its neighbours, the panel goes dark and quotes the present tense. Switch back
   and the age returns to where it was.
7. **Compare.** Turn on the second account. Ghosts appear, a click opens the displacement note,
   and nothing is merged or adjudicated.
8. **Mediation hatch.** Turn it on and the taste island shows the locus hatching.
9. **Reduced motion.** With the system setting on, reload: no intro animation and no line boil.
10. **Dark and light.** Check both. The district washes use `multiply` in light and `screen` in
    dark, and a token defined in only one of them is the usual regression.
11. **Narrow.** At 380px the instrument stacks, the panel is readable, and the timeline scrolls
    horizontally rather than crushing.
12. **Keyboard.** Tab reaches nodes, Enter selects, Escape clears.

Then update the screenshot if anything visual changed:

```bash
node scripts/shot.mjs   # needs Playwright; PLAYWRIGHT_DIR overrides where it is
```

## The rules that are not negotiable

The specimen is synthetic. Mass is derived, never stored. Proposals are half mass. Nothing ranks
or recommends. The page works from `file://`. Nothing in this repo deploys. `docs/private/`
stays out. `AGENTS.md` has the reasons.

## Commits

Say what changed and why it mattered, in the subject. No conventional-commit prefixes.

## Features

`docs/features/NNN-slug.md`, numbered in creation order, never renumbered. Acceptance checks are
commands with expected output, not adjectives. Mark a spec `shipped` only when you ran its
checks and they passed, and put the output in the spec.
