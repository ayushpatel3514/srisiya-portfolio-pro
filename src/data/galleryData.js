// Import gallery images so Vite/Vercel can bundle them correctly
import f1 from "../assets/tiles/f1.jpg";
import f2 from "../assets/tiles/f2.jpg";
import f3 from "../assets/tiles/f3.jpg";
import f4 from "../assets/tiles/f4.jpg";
import f5 from "../assets/tiles/f5.jpg";
import f6 from "../assets/tiles/f6.jpg";

import k1 from "../assets/tiles/k1.jpg";
import k2 from "../assets/tiles/k2.jpg";
import k3 from "../assets/tiles/k3.jpg";
import k4 from "../assets/tiles/k4.jpg";
import k5 from "../assets/tiles/k5.jpg";
import k6 from "../assets/tiles/k6.jpg";

import c1 from "../assets/tiles/c1.jpg";
import c2 from "../assets/tiles/c2.jpg";
import c3 from "../assets/tiles/c3.jpg";
import c4 from "../assets/tiles/c4.jpg";
import c5 from "../assets/tiles/c5.jpg";
import c6 from "../assets/tiles/c6.jpg";

import w1 from "../assets/tiles/w1.jpg";
import w2 from "../assets/tiles/w2.jpg";
import w3 from "../assets/tiles/w3.jpg";
import w4 from "../assets/tiles/w4.jpg";
import w5 from "../assets/tiles/w5.jpg";
import w6 from "../assets/tiles/w6.png";

import i1 from "../assets/tiles/i1.jpg";
import i2 from "../assets/tiles/i2.jpg";
import i3 from "../assets/tiles/i3.jpg";
import i4 from "../assets/tiles/i4.jpg";
import i5 from "../assets/tiles/i5.jpg";

import l1 from "../assets/tiles/l1.jpg";
import l2 from "../assets/tiles/l2.jpg";
import l3 from "../assets/tiles/l3.jpg";
import l4 from "../assets/tiles/l4.jpg";
import l5 from "../assets/tiles/l5.jpg";
import l6 from "../assets/tiles/l6.jpg";

import v1Video from "../assets/tiles/v1.mp4";
import v2Video from "../assets/tiles/v2.mp4";

// Utility to slugify titles like "Brochures & Flyers" -> "brochures-and-flyers"
export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Categories that feed the gallery + category pages
export const CATEGORIES = [
  {
    title: "Future Foreign",
    icon: "",
    items: [
      { src: f1 },
      { src: f2 },
      { src: f3 },
      { src: f4 },
      { src: f5 },
      { src: f6 },
    ],
  },
  {
    title: "Kathiyawadi Darbar",
    icon: "",
    items: [
      { src: k1 },
      { src: k2 },
      { src: k3 },
      { src: k4 },
      { src: k5 },
      { src: k6 },
    ],
  },
  {
    title: "Concept Health",
    icon: "",
    items: [
      { src: c1 },
      { src: c2 },
      { src: c3 },
      { src: c4 },
      { src: c5 },
      { src: c6 },
    ],
  },
  {
    title: "Brand Storytelling Videos",
    icon: "",
    items: [
      { src: w1 },
      { src: w2 },
      { src: w3 },
      { src: w4 },
      { src: w5 },
      { src: w6 },
      { src: v1Video },
      { src: v2Video },
    ],
  },
  {
    title: "Concept Designs for a Past Client",
    icon: "",
    items: [
      { src: i1 },
      { src: i2 },
      { src: i3 },
      { src: i4 },
      { src: i5 },
      { src: l1 },
      { src: l2 },
      { src: l3 },
      { src: l4 },
      { src: l5 },
      { src: l6 },
    ],
  },
];

// Build a map: slug -> category
export const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => {
  acc[slugify(c.title)] = c;
  return acc;
}, {});
