const SECONDS_IN_YEAR = 365.25 * 24 * 60 * 60;
const MIN_LOG_DISTANCE = -8;
const MAX_LOG_DISTANCE = 6.5;

const standardObjects = {
  moon: {
    name: "Moon",
    kind: "moon",
    image: "/static/moon-galileo.jpg",
    position: "center",
    lightYears: 1.3 / SECONDS_IN_YEAR,
    note: "The Moon is close enough that the delay is tiny, but it is still not zero.",
  },
  sun: {
    name: "Sun",
    kind: "sun",
    image: "/static/sun-sdo.jpg",
    position: "center 42%",
    lightYears: (8.3 * 60) / SECONDS_IN_YEAR,
    note: "Sunlight reaches Earth after several minutes, so daylight is already a message from the recent past.",
  },
  mars: {
    name: "Mars",
    kind: "planet",
    image: "/static/mars-hubble.jpg",
    position: "center 42%",
    lightYears: (3.1 * 60) / SECONDS_IN_YEAR,
    note: "Mars changes distance from Earth. This preset uses a close-approach example.",
  },
  proxima: {
    name: "Proxima",
    kind: "star",
    image: "/static/proxima-hubble.jpg",
    position: "center",
    lightYears: 4.24,
    note: "Proxima Centauri is the nearest known star to the Sun.",
  },
  sirius: {
    name: "Sirius",
    kind: "star",
    image: "/static/proxima-hubble.jpg",
    position: "center",
    lightYears: 8.6,
    note: "Sirius is one of the brightest stars in Earth's night sky.",
  },
  milkyway: {
    name: "Galactic Center",
    kind: "star",
    image: "/static/proxima-hubble.jpg",
    position: "center",
    lightYears: 26000,
    note: "The center of the Milky Way is hidden behind dust, but its light and signals still take thousands of years to cross the distance.",
  },
  lmc: {
    name: "Nearby Galaxy",
    kind: "galaxy",
    image: "/static/andromeda-galex.jpg",
    position: "center",
    lightYears: 160000,
    note: "The Large Magellanic Cloud is a nearby companion galaxy of the Milky Way.",
  },
  andromeda: {
    name: "Andromeda",
    kind: "galaxy",
    image: "/static/andromeda-galex.jpg",
    position: "center",
    lightYears: 2537000,
    note: "The Andromeda Galaxy is the nearest large spiral galaxy to the Milky Way.",
  },
};

const distanceSlider = document.querySelector("#distanceSlider");
const distanceReadout = document.querySelector("#distanceReadout");
const selectedObject = document.querySelector("#selectedObject");
const selectedObjectLabel = document.querySelector("#selectedObjectLabel");
const spaceWindow = document.querySelector(".space-window");
const delayMeterFill = document.querySelector("#delayMeterFill");
const lookbackTime = document.querySelector("#lookbackTime");
const lookbackDescription = document.querySelector("#lookbackDescription");
const photonStatus = document.querySelector("#photonStatus");
const presetButtons = document.querySelectorAll("[data-object]");
const velocitySlider = document.querySelector("#velocitySlider");
const earthTimeSlider = document.querySelector("#earthTimeSlider");
const chapterSpeed = document.querySelector("#chapter-speed");
const velocityReadout = document.querySelector("#velocityReadout");
const earthTimeReadout = document.querySelector("#earthTimeReadout");
const earthClockReadout = document.querySelector("#earthClockReadout");
const shipClockReadout = document.querySelector("#shipClockReadout");
const gammaReadout = document.querySelector("#gammaReadout");
const speedSummary = document.querySelector("#speedSummary");
const speedWindow = document.querySelector("#speedWindow");
const lightSpeedLimit = document.querySelector("#lightSpeedLimit");
const earthClockHand = document.querySelector("#earthClockHand");
const shipClockHand = document.querySelector("#shipClockHand");
const earthHourHand = document.querySelector("#earthHourHand");
const shipHourHand = document.querySelector("#shipHourHand");
const gravityRadiusSlider = document.querySelector("#gravityRadiusSlider");
const gravityTimeSlider = document.querySelector("#gravityTimeSlider");
const chapterGravity = document.querySelector("#chapter-gravity");
const gravityObject = document.querySelector("#gravityObject");
const gravityObjectLabel = document.querySelector("#gravityObjectLabel");
const gravityProbe = document.querySelector("#gravityProbe");
const gravityPresets = document.querySelectorAll(".gravity-preset");
const gravityRadiusReadout = document.querySelector("#gravityRadiusReadout");
const gravityFarTimeReadout = document.querySelector("#gravityFarTimeReadout");
const gravityFarClock = document.querySelector("#gravityFarClock");
const gravityLocalClock = document.querySelector("#gravityLocalClock");
const gravityRateReadout = document.querySelector("#gravityRateReadout");
const gravityFormulaReadout = document.querySelector("#gravityFormulaReadout");
const gravitySummary = document.querySelector("#gravitySummary");
const gravityFarClockHand = document.querySelector("#gravityFarClockHand");
const gravityLocalClockHand = document.querySelector("#gravityLocalClockHand");
const gravityFarHourHand = document.querySelector("#gravityFarHourHand");
const gravityLocalHourHand = document.querySelector("#gravityLocalHourHand");
const foldSlider = document.querySelector("#foldSlider");
const separationSlider = document.querySelector("#separationSlider");
const foldReadout = document.querySelector("#foldReadout");
const separationReadout = document.querySelector("#separationReadout");
const normalPathReadout = document.querySelector("#normalPathReadout");
const shortcutReadout = document.querySelector("#shortcutReadout");
const stabilityReadout = document.querySelector("#stabilityReadout");
const wormholeSummary = document.querySelector("#wormholeSummary");
const wormholeWindow = document.querySelector("#wormholeWindow");
const wormholeThroat = document.querySelector("#wormholeThroat");
const leftFold = document.querySelector(".left-fold");
const rightFold = document.querySelector(".right-fold");
const paradoxWindow = document.querySelector("#paradoxWindow");
const paradoxButtons = document.querySelectorAll(".choice-button");
const paradoxLabel = document.querySelector("#paradoxLabel");
const paradoxTitle = document.querySelector("#paradoxTitle");
const paradoxDescription = document.querySelector("#paradoxDescription");

let activeObjectId = null;
let activeGravityObjectId = "earth";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

function sliderToLightYears(sliderValue) {
  const percent = Number(sliderValue) / Number(distanceSlider.max);
  const exponent = MIN_LOG_DISTANCE + percent * (MAX_LOG_DISTANCE - MIN_LOG_DISTANCE);
  return 10 ** exponent;
}

function lightYearsToSlider(lightYears) {
  const exponent = Math.log10(lightYears);
  const percent = (exponent - MIN_LOG_DISTANCE) / (MAX_LOG_DISTANCE - MIN_LOG_DISTANCE);
  return Math.round(clamp(percent, 0, 1) * Number(distanceSlider.max));
}

function formatLightDistance(lightYears) {
  const lightSeconds = lightYears * SECONDS_IN_YEAR;

  if (lightSeconds < 120) {
    return `${formatNumber(lightSeconds)} light-seconds`;
  }

  if (lightSeconds < 7200) {
    return `${formatNumber(lightSeconds / 60)} light-minutes`;
  }

  if (lightSeconds < 172800) {
    return `${formatNumber(lightSeconds / 3600)} light-hours`;
  }

  if (lightYears < 1) {
    return `${formatNumber(lightSeconds / 86400)} light-days`;
  }

  if (lightYears >= 1000000) {
    return `${formatNumber(lightYears / 1000000)} million light-years`;
  }

  return `${formatNumber(lightYears)} light-years`;
}

function formatLookback(lightYears, includeAgo = true) {
  const lightSeconds = lightYears * SECONDS_IN_YEAR;
  let text;

  if (lightSeconds < 120) {
    text = `${formatNumber(lightSeconds)} seconds`;
  } else if (lightSeconds < 7200) {
    text = `${formatNumber(lightSeconds / 60)} minutes`;
  } else if (lightSeconds < 172800) {
    text = `${formatNumber(lightSeconds / 3600)} hours`;
  } else if (lightYears < 1) {
    text = `${formatNumber(lightSeconds / 86400)} days`;
  } else if (lightYears >= 1000000) {
    text = `${formatNumber(lightYears / 1000000)} million years`;
  } else {
    text = `${formatNumber(lightYears)} years`;
  }

  return includeAgo ? `${text} ago` : text;
}

function normalizedDistance(lightYears) {
  const exponent = Math.log10(lightYears);
  return clamp((exponent - MIN_LOG_DISTANCE) / (MAX_LOG_DISTANCE - MIN_LOG_DISTANCE), 0, 1);
}

function updatePhotonDelay(lightYears) {
  const amount = normalizedDistance(lightYears);
  const animationSeconds = 0.9 + amount * 7.1;
  const delayLabel = amount < 0.28 ? "short" : amount < 0.68 ? "medium" : "long";

  spaceWindow.style.setProperty("--photon-duration", `${animationSeconds.toFixed(2)}s`);
  delayMeterFill.style.width = `${Math.max(4, amount * 100)}%`;
  photonStatus.textContent = `Photon animation delay: ${delayLabel}`;
}

function setActivePreset(objectId) {
  presetButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.object === objectId);
  });
}

function updateObjectVisual(objectId) {
  const object = standardObjects[objectId];

  if (object) {
    selectedObjectLabel.textContent = object.name;
    selectedObject.dataset.kind = object.kind;
    selectedObject.style.setProperty("--object-image", `url("${object.image}")`);
    selectedObject.style.setProperty("--object-position", object.position);
    return;
  }

  selectedObjectLabel.textContent = "Star";
  selectedObject.dataset.kind = "star";
  selectedObject.style.setProperty("--object-image", `url("/static/images/proxima-hubble.jpg")`);
  selectedObject.style.setProperty("--object-position", "center");
}

function updateLightTravel() {
  const lightYears = sliderToLightYears(distanceSlider.value);
  const distanceText = formatLightDistance(lightYears);
  const lookbackText = formatLookback(lightYears);
  const travelTimeText = formatLookback(lightYears, false);
  const activeObject = standardObjects[activeObjectId];

  distanceReadout.textContent = distanceText;
  lookbackTime.textContent = lookbackText;

  if (activeObject) {
    lookbackDescription.textContent =
      `${activeObject.note} Its light takes about ${travelTimeText} to reach Earth, ` +
      `so the view arriving now shows ${activeObject.name} as it was ${travelTimeText} earlier.`;
  } else {
    lookbackDescription.textContent =
      `At ${distanceText} away, this star's light takes about ${travelTimeText} to reach Earth. ` +
      `That means the image arriving now began its journey ${travelTimeText} earlier.`;
  }

  updateObjectVisual(activeObjectId);
  updatePhotonDelay(lightYears);
  setActivePreset(activeObjectId);
}

distanceSlider.addEventListener("input", () => {
  activeObjectId = null;
  updateLightTravel();
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeObjectId = button.dataset.object;
    const activePreset = standardObjects[activeObjectId];

    if (!activePreset) {
      return;
    }

    distanceSlider.value = lightYearsToSlider(activePreset.lightYears);
    updateLightTravel();
  });
});

activeObjectId = null;
distanceSlider.value = lightYearsToSlider(50);
updateLightTravel();

function formatYearsForSpeed(value) {
  return `${formatNumber(value, 2)} ${value === 1 ? "year" : "years"}`;
}

function formatDurationDifference(years) {
  const absYears = Math.abs(years);

  if (absYears >= 0.01) {
    return formatYearsForSpeed(years);
  }

  const days = years * 365.25;
  const absDays = Math.abs(days);

  if (absDays >= 0.01) {
    return `${formatNumber(days, 2)} ${Math.abs(days) === 1 ? "day" : "days"}`;
  }

  const hours = days * 24;
  const absHours = Math.abs(hours);

  if (absHours >= 0.01) {
    return `${formatNumber(hours, 2)} ${Math.abs(hours) === 1 ? "hour" : "hours"}`;
  }

  const minutes = hours * 60;
  return `${formatNumber(minutes, 2)} ${Math.abs(minutes) === 1 ? "minute" : "minutes"}`;
}

function updateVelocityDilation() {
  const velocityPercent = Number(velocitySlider.value) / 10;
  const velocityFraction = velocityPercent / 100;
  const earthYears = Number(earthTimeSlider.value);
  const gamma = 1 / Math.sqrt(1 - velocityFraction ** 2);
  const travelerYears = earthYears / gamma;
  const timeSaved = earthYears - travelerYears;
  const speedIntensity = velocityFraction ** 1.7;
  const warpIntensity = clamp((velocityFraction - 0.55) / 0.44, 0, 1) ** 1.25;
  const shipAnimationSeconds = 4.2 - speedIntensity * 3.4;

  velocityReadout.textContent = `${formatNumber(velocityPercent, 1)}% of light speed`;
  earthTimeReadout.textContent = formatYearsForSpeed(earthYears);
  earthClockReadout.textContent = formatYearsForSpeed(earthYears);
  shipClockReadout.textContent = formatYearsForSpeed(travelerYears);
  gammaReadout.textContent = `${formatNumber(gamma, 2)}x`;

  if (velocityFraction === 0) {
    speedSummary.textContent =
      "Same frame: the ship is moving with Earth in this simulator. Like two watches resting on the same table, both clocks measure the same time.";
  } else {
    speedSummary.textContent =
      `Earth measures ${formatYearsForSpeed(earthYears)}, but the traveler measures ` +
      `${formatYearsForSpeed(travelerYears)}. The ship's clock falls behind by about ` +
      `${formatDurationDifference(timeSaved)}. Analogy: at a fixed walking speed, turning east reduces ` +
      `your northward progress. In spacetime, more motion through space means less time accumulated ` +
      `along the traveler's path compared with Earth.`;
  }

  if (lightSpeedLimit) {
    const nearLightSpeed = velocityFraction >= 0.99;
    lightSpeedLimit.classList.toggle("warning", nearLightSpeed);
    lightSpeedLimit.innerHTML = nearLightSpeed
      ? "Boundary reached: Chrona refuses 100% <em>c</em>. For any spacecraft with mass, the energy required to reach light speed grows without bound."
      : "The slider stops below 100% because a spacecraft with mass would require infinite energy to reach the speed of light.";
  }

  speedWindow.style.setProperty("--ship-speed", `${Math.max(0.45, shipAnimationSeconds).toFixed(2)}s`);
  speedWindow.style.setProperty("--wake-opacity", String(0.22 + speedIntensity * 0.72));

  if (chapterSpeed) {
    chapterSpeed.style.setProperty("--warp-letter-spacing", `${(warpIntensity * 0.018).toFixed(3)}em`);
    chapterSpeed.style.setProperty("--ship-blur", `${(warpIntensity * 0.55).toFixed(2)}px`);
    chapterSpeed.style.setProperty("--ship-saturation", `${(1 + warpIntensity * 0.55).toFixed(2)}`);
    chapterSpeed.style.setProperty("--ship-glow", `${(26 + warpIntensity * 34).toFixed(0)}px`);
    chapterSpeed.style.setProperty("--ship-red-offset", `${(-warpIntensity * 4).toFixed(2)}px`);
    chapterSpeed.style.setProperty("--ship-blue-offset", `${(warpIntensity * 4).toFixed(2)}px`);
    chapterSpeed.style.setProperty("--ship-aberration-opacity", `${(warpIntensity * 0.72).toFixed(2)}`);
    chapterSpeed.style.setProperty("--wake-height", `${(4 + warpIntensity * 5).toFixed(1)}px`);
    chapterSpeed.style.setProperty("--wake-blur", `${(2 + warpIntensity * 3).toFixed(1)}px`);
  }

  setClockHands(earthClockHand, earthHourHand, earthYears);
  setClockHands(shipClockHand, shipHourHand, travelerYears);
}

function setClockHands(minuteHand, hourHand, years) {
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${years * 360}deg)`;
  hourHand.style.transform = `translate(-50%, -100%) rotate(${years * 30}deg)`;
}

velocitySlider.addEventListener("input", updateVelocityDilation);
earthTimeSlider.addEventListener("input", updateVelocityDilation);
updateVelocityDilation();

const GRAVITATIONAL_CONSTANT = 6.6743e-11;
const LIGHT_SPEED = 299792458;
const SOLAR_MASS = 1.98847e30;

const gravityObjects = {
  earth: {
    name: "Earth",
    kind: "earth",
    mass: 5.9722e24,
    radius: 6.371e6,
    note: "Near Earth, gravitational time dilation is real but extremely small.",
  },
  sun: {
    name: "Sun",
    kind: "sun",
    mass: SOLAR_MASS,
    radius: 6.957e8,
    note: "The Sun is much more massive than Earth, so its surface clock falls farther behind.",
  },
  whiteDwarf: {
    name: "White dwarf",
    kind: "whiteDwarf",
    mass: SOLAR_MASS,
    radius: 7.0e6,
    note: "A white dwarf packs Sun-like mass into an Earth-sized body, making gravity much stronger.",
  },
  neutronStar: {
    name: "Neutron star",
    kind: "neutronStar",
    mass: 1.4 * SOLAR_MASS,
    radius: 12000,
    note: "A neutron star is so compact that a surface clock can run dramatically slower.",
  },
  blackHole: {
    name: "Black hole",
    kind: "blackHole",
    mass: 10 * SOLAR_MASS,
    radius: null,
    minRatio: 1.05,
    note: "A stationary clock close to the event horizon slows sharply relative to a far observer.",
  },
};

function schwarzschildRadius(mass) {
  return (2 * GRAVITATIONAL_CONSTANT * mass) / LIGHT_SPEED ** 2;
}

function getGravityRange(object) {
  const rs = schwarzschildRadius(object.mass);
  const minRatio = object.minRatio || object.radius / rs;
  const maxRatio = minRatio * 1000;
  return { minRatio, maxRatio, rs };
}

function gravitySliderToRatio(sliderValue, object) {
  const { minRatio, maxRatio } = getGravityRange(object);
  const percent = Number(sliderValue) / Number(gravityRadiusSlider.max);
  const exponent = Math.log10(minRatio) + percent * (Math.log10(maxRatio) - Math.log10(minRatio));
  return 10 ** exponent;
}

function gravityRatioToSlider(ratio, object) {
  const { minRatio, maxRatio } = getGravityRange(object);
  const percent = (Math.log10(ratio) - Math.log10(minRatio)) / (Math.log10(maxRatio) - Math.log10(minRatio));
  return Math.round(clamp(percent, 0, 1) * Number(gravityRadiusSlider.max));
}

function formatRatio(value) {
  if (value >= 1000000) {
    return value.toExponential(2);
  }

  return formatNumber(value, value < 10 ? 2 : 1);
}

function formatMeters(value) {
  if (value >= 1e9 || value < 0.01) {
    return `${value.toExponential(2)} m`;
  }

  return `${formatNumber(value, value < 1000 ? 1 : 0)} m`;
}

function updateGravityPresetButtons() {
  gravityPresets.forEach((button) => {
    button.classList.toggle("active", button.dataset.gravityObject === activeGravityObjectId);
  });
}

function updateGravityDilation() {
  const object = gravityObjects[activeGravityObjectId];
  const { rs } = getGravityRange(object);
  const rRatio = gravitySliderToRatio(gravityRadiusSlider.value, object);
  const radiusMeters = rRatio * rs;
  const farYears = Number(gravityTimeSlider.value);
  const rate = Math.sqrt(Math.max(0, 1 - 1 / rRatio));
  const localYears = farYears * rate;
  const lostTime = farYears - localYears;
  const sliderPercent = Number(gravityRadiusSlider.value) / Number(gravityRadiusSlider.max);
  const probeLeft = 55 + sliderPercent * 33;

  gravityObject.dataset.gravityKind = object.kind;
  if (chapterGravity) {
    if (object.kind === "blackHole") {
      chapterGravity.dataset.redshift = "extreme";
    } else if (object.kind === "neutronStar") {
      chapterGravity.dataset.redshift = "strong";
    } else {
      chapterGravity.dataset.redshift = "normal";
    }
  }
  gravityObjectLabel.textContent = object.name;
  gravityRadiusReadout.innerHTML = `Orbital radius (r) = ${formatRatio(rRatio)} R<sub>s</sub>`;
  gravityFarTimeReadout.textContent = formatYearsForSpeed(farYears);
  gravityFarClock.textContent = formatYearsForSpeed(farYears);
  gravityLocalClock.textContent = formatYearsForSpeed(localYears);
  gravityRateReadout.textContent = `${formatNumber(rate * 100, rate > 0.999 ? 8 : 3)}%`;
  gravityFormulaReadout.innerHTML =
    `<span class="inline-equation">rate = &radic;(1 - R<sub>s</sub>/r)</span>` +
    `<span>Orbital radius = ${formatRatio(rRatio)} R<sub>s</sub> (${formatMeters(radiusMeters)} from center)</span>`;
  gravitySummary.textContent =
    `${object.note} The far clock measures ${formatYearsForSpeed(farYears)}, while the local ` +
    `clock near the mass measures ${formatYearsForSpeed(localYears)}. The difference is about ` +
    `${formatDurationDifference(lostTime)}. Analogy: light climbing out of a gravitational well loses ` +
    `energy, stretching its wave crests. That redshift makes the lower clock appear slower to a far observer.`;

  gravityProbe.style.left = `${probeLeft}%`;
  gravityProbe.style.top = `${45 + (1 - sliderPercent) * 6}%`;
  setClockHands(gravityFarClockHand, gravityFarHourHand, farYears);
  setClockHands(gravityLocalClockHand, gravityLocalHourHand, localYears);
  updateGravityPresetButtons();
}

gravityPresets.forEach((button) => {
  button.addEventListener("click", () => {
    activeGravityObjectId = button.dataset.gravityObject;
    const object = gravityObjects[activeGravityObjectId];
    const { minRatio } = getGravityRange(object);
    gravityRadiusSlider.value = gravityRatioToSlider(minRatio, object);
    updateGravityDilation();
  });
});

gravityRadiusSlider.addEventListener("input", updateGravityDilation);
gravityTimeSlider.addEventListener("input", updateGravityDilation);
gravityRadiusSlider.value = gravityRatioToSlider(getGravityRange(gravityObjects.earth).minRatio, gravityObjects.earth);
updateGravityDilation();

function updateWormhole() {
  const fold = Number(foldSlider.value);
  const separation = Number(separationSlider.value);
  const foldFraction = fold / 100;
  const shortcutYears = separation * (1 - foldFraction * 0.88);
  const savedYears = separation - shortcutYears;
  let stability = "Theoretical";

  if (fold > 75) {
    stability = "Likely unstable";
  } else if (fold > 45) {
    stability = "Exotic support";
  }

  foldReadout.textContent = `${fold}%`;
  separationReadout.textContent = `${formatNumber(separation)} light-years`;
  normalPathReadout.textContent = `${formatNumber(separation)} years`;
  shortcutReadout.textContent = `${formatNumber(shortcutYears, 1)} years`;
  stabilityReadout.textContent = stability;
  wormholeSummary.textContent =
    `In this illustration, folding space saves about ${formatNumber(savedYears, 1)} light-years of travel. ` +
    `The model is visual, not proof that a traversable wormhole can exist.`;

  wormholeWindow.style.setProperty("--fold-amount", String(foldFraction));
  wormholeThroat.style.transform = `scaleX(${0.35 + foldFraction * 1.15})`;
  wormholeThroat.style.opacity = String(0.28 + foldFraction * 0.72);
  leftFold.style.transform = `perspective(560px) rotateX(58deg) rotateY(${foldFraction * 28}deg)`;
  rightFold.style.transform = `perspective(560px) rotateX(58deg) rotateY(${-foldFraction * 28}deg)`;
}

foldSlider.addEventListener("input", updateWormhole);
separationSlider.addEventListener("input", updateWormhole);
updateWormhole();

const paradoxModes = {
  consistent: {
    label: "Self-consistent loop",
    title: "The past resists contradiction.",
    description:
      "The traveler goes back along a closed timelike curve, but every action becomes part of the history that already led to the trip. Nothing changes because the loop was always self-consistent.",
  },
  branch: {
    label: "Branching timeline",
    title: "A new history splits away.",
    description:
      "Changing the past does not rewrite the original timeline. Instead, the event is treated like a split into another branch where causality can unfold another way.",
  },
  bootstrap: {
    label: "Bootstrap paradox",
    title: "An effect loops without a clear origin.",
    description:
      "An object or idea is carried into the past and becomes the cause of itself. The closed loop is internally consistent, but the origin of the information becomes unclear.",
  },
  protection: {
    label: "Chronology protection",
    title: "Nature may block the paradox.",
    description:
      "Some ideas suggest the laws of physics prevent usable past-travel machines from forming, protecting cause and effect from contradictions.",
  },
};

function updateParadox(mode) {
  const paradox = paradoxModes[mode];

  paradoxWindow.dataset.mode = mode;
  paradoxLabel.textContent = paradox.label;
  paradoxTitle.textContent = paradox.title;
  paradoxDescription.textContent = paradox.description;

  paradoxButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.paradox === mode);
  });
}

paradoxButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateParadox(button.dataset.paradox);
  });
});

updateParadox("consistent");
