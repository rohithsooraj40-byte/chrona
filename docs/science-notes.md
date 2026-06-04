# Science Notes

Use this file to collect accurate explanations, formulas, and sources.

Important accuracy rules:

- Say light carries information from the past, not that photons store data like computer files.
- Say massive objects cannot reach the speed of light.
- Treat wormholes as speculative, not proven.
- Separate real effects, like time dilation, from hypotheses, like usable wormhole time machines.

## Chapter 2 Reference Frame Note

The velocity slider uses Earth as the reference frame. A value of `0% of light speed` means the
spacecraft is at rest relative to Earth, not absolutely motionless in the universe.

Earth does move relative to the Sun, the galaxy, and other frames, but special relativity compares
relative motion between observers. If the ship shares Earth's motion, their special-relativistic
time difference is zero in this simplified model.

Real clocks can still differ slightly because of Earth's rotation, orbital motion, altitude, gravity,
and acceleration. Those effects are deliberately left for later chapters or advanced notes.

Analogy rule:

- Use direction, not effort. A good analogy is walking north at fixed speed, then veering east. The
  eastward component reduces northward progress. In spacetime, spatial motion changes how much time
  accumulates along the traveler's path relative to Earth.

## Chapter 3 Gravity Formula

The gravity chapter uses the Schwarzschild gravitational time dilation formula:

`t_local = t_far * square root(1 - Rs / r)`

Where:

- `Rs = 2GM / c^2`
- `Rs` means Schwarzschild radius
- `G` is the gravitational constant
- `M` is the mass of the object
- `c` is the speed of light
- `r` is the clock's distance from the center of mass

Accuracy limits:

- This formula applies outside a non-rotating, spherical mass.
- For Earth, Sun, white dwarf, and neutron star presets, the closest slider position is the object's surface.
- For the black hole preset, the closest slider position is just outside the Schwarzschild radius.
- The simulator does not model rotation, charge, tides, acceleration, or whether a location is physically survivable.
- The live radius label should stay neutral: use "orbital radius (r)" or "radius from center,"
  not "nearest safe point." For compact stars, the limit is the physical surface and tidal forces,
  not an event-horizon boundary.

Analogy rule:

- Avoid fluid-flow analogies that imply time slows because something pools or loses kinetic energy.
- Prefer gravitational-redshift language: light climbing out of a gravitational well loses energy,
  so wave crests arrive farther apart to a distant observer. A lower clock therefore appears slower
  from far away.

## Real-World Checks

- NASA notes that GPS relies on Einstein's relativity for accuracy:
  https://science.nasa.gov/solar-system/10-things-einstein-got-right/
- Hafele and Keating's around-the-world atomic-clock experiment is indexed here:
  https://pubmed.ncbi.nlm.nih.gov/17779918/

## Chapter 4 Wormhole Accuracy Note

The wormhole chapter is illustrative. It does not claim that traversable wormholes exist.
The shortcut calculation is a visual comparison between a normal route and a hypothetical shorter
throat. Real traversable wormholes would require unresolved physics, possibly including exotic
negative energy.

## Chapter 5 Paradox Accuracy Note

The paradox chapter presents hypotheses, not confirmed mechanisms:

- Self-consistent loop
- Branching timeline
- Bootstrap paradox
- Chronology protection

These are ways to reason about causality, not demonstrated time-travel technologies.

General relativity sometimes discusses past-directed travel through Closed Timelike Curves (CTCs),
worldlines that loop through spacetime and intersect their own past. CTCs are mathematical objects
in certain solutions, not evidence that a usable time machine exists.

## Limitations Section

- The second law of thermodynamics gives a macroscopic arrow of time: entropy in a closed system
  overwhelmingly tends to increase. Avoid saying it is a simple mechanical barrier; it is a
  statistical law about the direction of ordinary processes.
- The speed of light is a hard limit for objects with mass. As velocity approaches `c`, the Lorentz
  factor grows without bound, and so do the energy and momentum requirements.
- Chronology protection is a conjecture, not a proven theorem. Present it as a serious proposal
  associated with Stephen Hawking, not as confirmed physics.
- Wormhole time-machine ideas generally cannot access times before the time-machine configuration
  exists, because the shortcut requires the connected throat to already be present.

## Interaction Design Notes

- Keep default prose readable first. Put heavier derivations behind "Learn the Math" expanders so
  casual readers are not forced into the full notation.
- Tooltips should define jargon in one sentence. They are reminders, not mini-lectures.
- Velocity warp and gravitational redshift visuals are illustrative UI feedback. They should support
  the concept without implying that the page is rendering a full optical relativity simulation.
