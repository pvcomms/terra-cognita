---
title: Make zero third-party requests
status: next
created: 2026-09-19
---

# 001 — Make zero third-party requests

## Why

This page is an instrument for the most sensitive data a person owns, and it tells two
companies every time someone opens it. `index.html` fetches d3 from `cdnjs.cloudflare.com` and
a stylesheet plus three typefaces from Google's two font hosts. Neither request carries anything
from the page, and both are still a third party learning the IP address, the user agent and the
timing of a person looking at a map of their inner life.

It is also false advertising in the repo's own terms. The page is described as self-contained
and is not: open it on a plane and d3 never arrives, so the map, the timeline and the panel are
all blank. A file whose central claim is local-first cannot have a CDN in its critical path.

## What changes

- Before: four requests to two third-party origins at load, and a blank instrument without a
  network.
- After: `vendor/d3.v7.min.js` and `fonts/` in the repo, and zero requests to any host. The page
  renders identically with the machine offline.

## Where

| File                     | Change                                                             |
| ------------------------ | -------------------------------------------------------------------- |
| `vendor/d3.v7.min.js`    | new. d3 7.9.0, committed, with its SHA-256 recorded in DECISIONS    |
| `fonts/*.woff2`          | new. the three families as woff2 subsets                            |
| `index.html` lines 3–4   | delete the preconnect and the Google Fonts stylesheet link          |
| `index.html` line 609    | `<script src="vendor/d3.v7.min.js">`                                |
| `index.html` `<style>`   | `@font-face` blocks at the top, before `:root`                      |
| `README.md`, `SECURITY.md` | the network-requests sections stop being true and become "none"   |
| `docs/DECISIONS.md`      | the vendoring entry, with the hash and the font licences            |

Take d3 from `https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js` once, check the hash,
commit it, and never fetch it again. `chronology` has already vendored the same file; its
`docs/DECISIONS.md` records the SHA-256, and the two copies should agree.

Fonts are the harder half. The page asks for Bricolage Grotesque, Newsreader and JetBrains Mono.
Subsets for Newsreader already exist in `~/Code/paramvaswani-site/fonts/` and can be copied.
Bricolage Grotesque and JetBrains Mono have no subset in that set and need subsetting from the
upstream files — latin only, and the variable axes the page actually uses, which for Bricolage
is `opsz` and `wght` at 400, 500 and 700. All three families are SIL Open Font License 1.1, so
`fonts/OFL.txt` ships with them and the README says the fonts are OFL while the code is MIT.

## Out of scope

No change to which typefaces or which d3 version the page uses. No switch to d3 submodules or a
custom build. No subresource integrity attributes, which solve tampering rather than disclosure
and are moot once the file is local.

## Acceptance checks

```bash
grep -c 'https://' index.html   # only the bibliography links remain
```

- [ ] With the machine offline, `open index.html` draws the map, the timeline and the panel
- [ ] Chromium devtools, network tab, reloaded from `file://`: every request is `file://`
- [ ] `shasum -a 256 vendor/d3.v7.min.js` matches the hash in `docs/DECISIONS.md`
- [ ] The three families render, checked against a screenshot taken before the change
- [ ] `fonts/OFL.txt` is present and the licence split is stated in the README

## Notes

The bibliography in the plan prose links to Google Scholar and Wikipedia searches. Those are
links a reader clicks, not resources the page fetches, and they stay. The acceptance check
counts lines rather than requests for that reason.
