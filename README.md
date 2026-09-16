# Zop MCP landing page

Prototype of the refreshed zop.dev homepage, led by the Zop MCP server.

Single static page plus one background video, served by a zero-dependency Node
process that honours `$PORT`. Nothing to build, no Dockerfile.

```bash
npm start
```

## What is here

    public/index.html       the page
    public/assets/          hero video (1080p, 757 KB) and its poster
    server.js               static file server, path-traversal guarded
    package.json            `npm start`, node >= 18

## Page order

Hero (MCP) → what ZopDev is → three products → four best-in-class features →
KPIs + customer stories → FAQ → CTA → footer.

## Notes

The four feature illustrations and the rotating globe are the live zop.dev
renderers (`src/scripts/index-bpv-illustrations.js` plus `src/lib/canvas-engine/`),
inlined with only their ESM plumbing removed. They are not redrawn.

The connect command is the real one from the shipped setup guide and needs a
bearer token from Developer Settings.

## Open questions, deliberately unresolved here

- Tool count contradicts across internal sources (289 / 119 / 23+34), so the
  page states no number.
- Server alias drift: `zop` here, `zopnight` in ZopNight's own guide.
- The "20 MCP clients" claim elsewhere on the site is unverified; five clients
  have documentation.
