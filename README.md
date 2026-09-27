# Boxing 🥊

A cinematic scroll-driven landing page built around the supplied AI boxing clip.

## Stack

- Next.js App Router
- React + TypeScript
- Native HTML5 video timeline scrubbing
- CSS liquid-glass surfaces inspired by `Armi64bit/liquid-glass-js`
- Responsive / reduced-motion aware layout

## Interaction

The video is pinned to the viewport while the page scroll position maps to the video's `currentTime`. Five glass information scenes crossfade and move with the scroll progress.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Design reference

Liquid Glass JS: https://github.com/Armi64bit/liquid-glass-js
