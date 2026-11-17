// Shared data store & helper arrow functions
const DEFAULT_MEDIA_ITEMS = [
  {
    id: 101,
    title: "Technocracy",
    creator: "Sybreed (Antares)",
    category: "Music",
    year: 2007,
    rating: 5,
    featured: true,
    image: "images/albums/Antares.jpg",
    tags: ["industrial metal", "deathwave", "sci-fi"],
    description: "A futuristic industrial metal track that critiques a society governed by cold logic, automation, and mechanized control."
  },
  {
    id: 102,
    title: "Equilibrium",
    creator: "Kurt Wimmer",
    category: "Movie",
    year: 2002,
    rating: 5,
    featured: true,
    image: "images/movies/equilibrium.jpg",
    tags: ["dystopian", "action", "gun kata"],
    description: "In a dystopian future, a totalitarian regime maintains peace by suppressing emotions until Cleric John Preston questions the system."
  },
  {
    id: 103,
    title: "SPI BIOS Chip Flashing & Modding",
    creator: "Dmytro Isaiev (H3ADROOM)",
    category: "Hardware Mod",
    year: 2023,
    rating: 4,
    featured: false,
    image: "images/tech/BIOS_CHIPS.jpg",
    tags: ["ch341a", "uefi", "firmware"],
    description: "Bypassing manufacturer whitelist restrictions by dumping, patching, and flashing custom firmware directly onto SOIC8 SPI chips."
  },
  {
    id: 104,
    title: "Quadro T1000 Workstation Upgrade",
    creator: "NVIDIA / Dell",
    category: "Hardware Mod",
    year: 2024,
    rating: 4,
    featured: false,
    image: "images/tech/QUADRO_T1000_GPU.jpg",
    tags: ["turing", "mxm", "workstation"],
    description: "Mid-life Turing architecture GPU upgrade that gave the M4800 chassis modern efficiency before the RTX 4060 leap."
  },
  {
    id: 105,
    title: "Dell Precision M4800 + RTX 4060 Mod",
    creator: "Dmytro Isaiev (H3ADROOM)",
    category: "Hardware Mod",
    year: 2025,
    rating: 5,
    featured: true,
    image: "images/tech/INSIDE_OF_THE_LAPTOP.jpg",
    tags: ["mxm-a", "coreboot", "rtx 4060"],
    description: "Custom workstation build featuring an Intel Core i7-4930MX, 32GB RAM, and NVIDIA RTX 4060 MXM-A graphics."
  },
  {
    id: 106,
    title: "Time has not been kind",
    creator: "Life (Seriously)",
    category: "IRL",
    year: 2025,
    rating: 0,
    featured: false,
    image: "images/WORK.jpg",
    tags: ["life"],
    description: "At some point, back in 2025, during second semester of my first year at Creative Computing course, some seriously bad stuff happened. Not able to handle the situation on my premises, I was forced to leave, fleeing all the way to Leitrim. This is where I spent my time from 2025 to 2026. I have hit my rock bottom, but thanks to the close ones, I managed to stay alive and will probably move to Waterford soon (fingers crossed!!). Stay strong, folks, love you!"
  }
];

const CREATOR_PROFILE = {
  fullName: "Dmytro Isaiev",
  aliases: ["H3ADROOM", "MELOCODI"],
  studentId: "20113262",
  domain: "20113262-personal-2.netlify.app",
  location: "Waterford (hopefully)",
  course: "BSc in Software Systems Development (Year 2)",
  primaryRig: "Ryzen 9 5950X | RTX 4070 Ti Super | 32GB DDR4",
  skills: [
    "Low-level Hardware Modding",
    "BIOS / Coreboot Firmware Modification & SPI Flashing",
    "Linux Kernel Bring-up, Docker & Self-Hosted Infrastructure"
  ],
  achievements: [
    { year: 2022, event: "Acquired Dell Precision M4800 workstation on DoneDeal and performed full teardown." },
    { year: 2023, event: "Upgraded to Quadro T1000 GPU, i7-4980HQ CPU, 32GB RAM, and unlocked SPI BIOS." },
    { year: 2024, event: "Sourced an MXM-A NVIDIA GeForce RTX 4060 mobile module for experimentation." },
    { year: 2025, event: "Successfully engineered firmware patches to run RTX 4060 inside M4800." }
  ]
};

// arrow function returning a value: loads collection from localstorage or falls back to defaults if something bad happens
const getMediaCollection = () => {
  const saved = localStorage.getItem("h3adroom_media_v2");
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem("h3adroom_media_v2", JSON.stringify(DEFAULT_MEDIA_ITEMS));
  return [...DEFAULT_MEDIA_ITEMS];
};

// arrow function saving collection
const saveMediaCollection = (items) => {
  localStorage.setItem("h3adroom_media_v2", JSON.stringify(items));
};

// arrow function returning formatted date & live clock string (uses date & string manipulation)
const getFormattedTimestamp = () => {
  const now = new Date();
  const datePart = now.toLocaleDateString("en-IE", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const timePart = now.toTimeString().slice(0, 8);
  return `${datePart} | ${timePart}`;
};

// clock updater
function initHeaderClock() {
  const clockEl = document.querySelector("#live-clock");
  if (!clockEl) return;
  const update = () => {
    clockEl.textContent = getFormattedTimestamp();
  };
  update();
  setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", initHeaderClock);
