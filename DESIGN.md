# DESIGN — ENG HAZEM (`hazem.my`)

## Direction: Cinematic Portrait & Studio Desk Story
- **Visual Character:** Built directly around Hazem's supplied studio photography and video transitions — matte studio charcoal (`#131315`), plaster wall slate (`#1C1B1E`), dark walnut warmth (`#5C3B28` / `#9C6A4A`), restrained royal-purple window louver accents (`#6D28D9` / `#A778FF`), and warm chalk linen typography (`#F5F2EC`).
- **Scroll Choreography:** Single `Lenis` instance synced strictly with `gsap.ticker` and `ScrollTrigger` (disabled cleanly under `prefers-reduced-motion`).
- **Media Renderer Choice (Measured Prototype):** Chose a **trimmed, bounded-LRU Canvas WebP image sequence** over dense-keyframe MP4 seeking:
  - `intro-seq` (`81` frames @ `12fps`, trimmed `0.00s..6.75s`, `2.27 MB` vs `3.79 MB` seek-MP4)
  - `contact-seq` (`56` frames @ `12fps`, trimmed `1.10s..5.75s`, `1.53 MB` vs `2.46 MB` seek-MP4)
  - `36`-frame hard decode cache cap + sliding `±14`-frame preload window + nearest-frame fallback, handing off seamlessly to full-resolution static stills (`portrait-closeup.webp`, `portrait-desk.webp`, `portrait-welcoming.webp`).
- **Laptop Perspective Layer:** Normalized corners `(558,321)`, `(697,325)`, `(654,481)`, `(525,454)` on `1024×576` desk photo aligned dynamically via CSS `matrix3d` inside an aspect-locked `16:9` coordinate container.
