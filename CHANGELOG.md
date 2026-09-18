# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-09-19

The first tagged release, and the first time this page exists as a repository rather than as a
deployment. The instrument itself is unchanged.

### Added

- `LICENSE`: MIT
- `AGENTS.md`, with the repo's stack, invariants and traps, plus the vendored constellation
  kernel, and `CLAUDE.md` pointing at it
- `docs/ARCHITECTURE.md`: the four surfaces, the `SPECIMEN` shape, the `state` object, the
  render functions and the sharp edges
- `docs/DECISIONS.md`: why d3, why a static single file, why the specimen is synthetic, why the
  elevation thresholds are frozen at boot, and why the plan document is not published
- `docs/PLAN.md`: a two-page summary of the v0.1 design, with its unverified citations flagged
- `docs/TEMPLATE.md`: what is the specimen and what is the instrument
- `docs/features/`, with an index and four numbered specs
- `CONTRIBUTING.md`, with the twelve-item by-hand check list that stands in for CI
- `SECURITY.md`, stating what the page reads, writes and requests
- `scripts/shot.mjs` and `docs/img/terra-cognita.png`, a 1400×900 screenshot from headless
  Chromium
- `.editorconfig`

### Changed

- The README said "self-contained" of a page that fetches d3 from one CDN and fonts from
  another. It now says what the page is, what the data is, and what it fetches.
- The masthead pointed at a plan document by a path on one machine. It points at `docs/PLAN.md`.

### Removed

- The 70 KB source plan document is not in this repository and never was: it is written as a
  letter to one named person about his own brief and his own life. It is held outside the
  repository at the gitignored `docs/private/`, and `docs/PLAN.md` is the published summary.

[unreleased]: https://github.com/pvcomms/terra-cognita/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/pvcomms/terra-cognita/releases/tag/v0.1.0
