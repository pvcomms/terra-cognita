# Security and privacy

This page renders the most sensitive category of data a person can hold about themselves. It is
also a static HTML file with no backend, no account, no session and no database. What follows is
the whole of it.

## What it reads

`index.html`, which contains the data. That is all. It reads no other file, no filesystem, no
clipboard, no location and no device sensor, and it asks for no permission because it needs
none.

The data it reads today is **Specimen A**, an invented life. No real person's history is in this
repository.

## What it writes

Nothing. There is no export, no `localStorage`, no `sessionStorage`, no cookie, no IndexedDB and
no cache entry of its own. Any state you change in the page — the age, the mode, the selection —
is gone on reload.

`docs/features/002-own-map-as-a-local-file.md` adds reading and writing a local file. It
deliberately stays local-file-only: no account, no cloud, no sync, and the write goes through
the browser's own file picker so that the page never chooses where your life is stored.

## What never leaves the machine

Everything. There is no analytics, no telemetry, no error reporting, no usage ping and no
beacon. Nothing in this repository sends a request to any endpoint that could receive data, and
the page has no code path that transmits anything anywhere.

## Network requests the page makes today

Four, all at load, to two third parties:

| Request                                                 | Why                       |
| -------------------------------------------------------- | ------------------------- |
| `cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js`     | the rendering library     |
| `fonts.googleapis.com/css2?family=…`                    | the `@font-face` stylesheet |
| `fonts.gstatic.com` — two font files                    | the typefaces             |

None of them carries anything from the page. Each of them tells that host an IP address, a user
agent and a time — that somebody, somewhere, opened this page. For an instrument whose entire
argument is that a person's inner life stays on their own machine, that is the wrong shape, and
removing it is `docs/features/001-zero-third-party-requests.md`, which is why that feature is
numbered first.

The links in the reading list go to Google Scholar and Wikipedia searches. They are links. They
are fetched only if a reader clicks one.

## If you put your own life in this file

The file becomes the most sensitive document on your disk. It is plain text with no encryption,
because encrypting it here would be a worse version of what your filesystem already does. Keep
it out of any directory that syncs to a service you do not control, do not commit it to a public
repository, and remember that a screenshot of the map is as disclosing as the file.

The page cannot leak it. What can leak it is where you put it.

## Reporting something

Open a private report through the repository's Security tab on GitHub, under "Report a
vulnerability". For anything that is not sensitive, a public issue is fine and is faster.

There is no release cadence and no support commitment. This is a prototype published in the
hope it is useful.
