# Features

One feature, one file, `NNN-slug.md`. Numbers are allocated in creation order and never reused
or renumbered — the number is the permanent name of that work, so `terra-cognita 002` still
means something in a year.

Frontmatter carries `title` and `status`. Status is one of `draft`, `next`, `building`,
`shipped`, `parked`. `~/Code/cfap/bin/scan.py` reads only the frontmatter, and the first feature
in `building` → `next` → `draft` order becomes this project's next action on the front door.

A feature is marked `shipped` only when its acceptance checks were actually run and passed.

The shape to copy: `~/Code/cfap/docs/templates/feature.template.md`.

| #   | Title                                | Status |
| --- | ------------------------------------ | ------ |
| 001 | Make zero third-party requests       | next   |
| 002 | A person's own map as a local file   | next   |
| 003 | Import life events from markdown     | draft  |
| 004 | Link to chronology by event id       | draft  |
