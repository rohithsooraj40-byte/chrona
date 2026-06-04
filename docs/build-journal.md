# Build Journal

Use this file to document your process for applications and portfolio review.

Suggested entries:

- What I built today
- What problem I ran into
- How I solved it
- What physics idea I learned
- What I want to improve next

## 2026-05-07

Started Chapter 1 as an interactive light-travel-time demo. The main idea is that light has a finite speed, so looking at distant objects means seeing them as they were in the past.

Design decision: replaced drawn placeholder planets/stars with sourced NASA and NASA-JPL imagery. This makes the project feel more scientifically grounded and gives me a clean attribution trail for a portfolio.

Implementation notes:

- Used a logarithmic distance slider so the same control can represent the Moon, Sun, stars, and galaxies.
- Converted distance to lookback time using light-years as the main unit.
- Slowed the photon animation as distance increases to make the delay visible.
- Added `docs/asset-credits.md` to track image sources.

Storytelling note:

- Tried a guided narration panel for Chapter 1, then removed it because it interrupted the cleaner interactive flow.
- Kept the storytelling idea in the chapter text and visual sequence instead of adding separate narration controls.

Chapter 2 update:

- Added a velocity time dilation simulator titled "The Clock That Fell Behind."
- Used the special relativity Lorentz factor to compare Earth time with traveler time.
- Added a velocity slider, an Earth-time range slider, animated star streaks, a moving spacecraft, and two clock readouts.

Chapters 3-5 first draft:

- Added Chapter 3, "Where Time Sinks," using Schwarzschild gravitational time dilation.
- Added gravity presets for Earth, Sun, white dwarf, neutron star, and black hole.
- Added Chapter 4, "The Fold That Might Hold," as a theoretical wormhole shortcut visualization.
- Added Chapter 5, "The Knot in Yesterday," with selectable paradox hypotheses.
- Added a conclusion section that links back to all chapters.

Clock and explanation touch-up:

- Added more realistic clock faces with tick marks, hour hands, minute hands, and center pins.
- Added "Chrona observes" narration cards to make the explanation feel guided by the site's own intelligence.
- Added technical notes for velocity and gravity chapters that explain formulas, assumptions, and limits.
- Reworked formula displays so abbreviations are defined and equations look like equations instead of code.
- Cleaned the live simulation explanations and added simple analogies for spacetime paths and gravity wells.
- Corrected the velocity analogy to describe direction through spacetime instead of effort.
- Corrected the gravity analogy to use gravitational redshift rather than a fluid slowing down.
- Added real-world checks for Hafele-Keating atomic clocks and GPS relativity.
- Added MathJax rendering for the relativity formulas so the equations display cleanly instead of
  as cramped fallback text.
- Replaced the gravity "nearest safe point" wording with a neutral orbital-radius readout in
  Schwarzschild radii.
- Added Closed Timelike Curves (CTCs) to Chapter 5 and a developer-notes appendix explaining the
  AI pair-programming workflow and debugging decisions.
- Added a limitation section before the conclusion covering entropy, the cosmic speed limit,
  chronology protection, and the "no earlier than the machine" constraint.
- Added progressive-disclosure "Learn the Math" expanders for special relativity and
  Schwarzschild gravity, plus hover tooltips for technical terms.
- Connected slider state to visual feedback: near-light velocity now adds mild warp/aberration
  effects, and compact gravity presets shift the chapter toward a redshifted color treatment.
- Expanded the conclusion so it clearly separates confirmed physics, speculative ideas, and the
  causality limits around travel to the past.
- Ran a pre-launch pass: disabled Flask debug mode by default, added a Gunicorn Procfile, documented
  deployment notes, and improved mobile slider touch targets.
- Added Render deployment configuration with `render.yaml` for a Python web service using
  `pip install -r requirements.txt` and `gunicorn app:app`.
