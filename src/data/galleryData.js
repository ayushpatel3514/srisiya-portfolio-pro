// Utility to slugify titles like "Brochures & Flyers" -> "brochures-and-flyers"
export const slugify = (str) =>
  str.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Reuse your featured arrays and expand later as needed
export const CATEGORIES = [
  {
    title: "Future Foreign",
    icon: "",
    items: [
      { src: "/src/assets/tiles/f1.jpg" },
      { src: "/src/assets/tiles/f2.jpg" },
      { src: "/src/assets/tiles/f3.jpg" },
      { src: "/src/assets/tiles/f4.jpg" },
      { src: "/src/assets/tiles/f5.jpg" },
      { src: "/src/assets/tiles/f6.jpg" },
    ],
  },
  {
    title: "Kathiyawadi Darbar",
    icon: "",
    items: [
      { src: "/src/assets/tiles/k1.jpg" },
      { src: "/src/assets/tiles/k2.jpg" },
      { src: "/src/assets/tiles/k3.jpg" },
      { src: "/src/assets/tiles/k4.jpg" },
      { src: "/src/assets/tiles/k5.jpg" },
      { src: "/src/assets/tiles/k6.jpg" },
    ],
  },
  {
    title: "La Casita",
    icon: "",
    items: [
      { src: "/src/assets/tiles/l1.jpg" },
      { src: "/src/assets/tiles/l2.jpg" },
      { src: "/src/assets/tiles/l3.jpg" },
      { src: "/src/assets/tiles/l4.jpg" },
      { src: "/src/assets/tiles/l5.jpg" },
      { src: "/src/assets/tiles/l6.jpg" },
    ],
  },
  {
    title: "Concept Health",
    icon: "",
    items: [
      { src: "/src/assets/tiles/c1.jpg" },
      { src: "/src/assets/tiles/c2.jpg" },
      { src: "/src/assets/tiles/c3.jpg" },
      { src: "/src/assets/tiles/c4.jpg" },
      { src: "/src/assets/tiles/c5.jpg" },
      { src: "/src/assets/tiles/c6.jpg" },
    ],
  },
  {
    title: "Wellness physiotheraphy",
    icon: "",
    items: [
      { src: "/src/assets/tiles/w1.jpg" },
      { src: "/src/assets/tiles/w2.jpg" },
      { src: "/src/assets/tiles/w3.jpg" },
      { src: "/src/assets/tiles/w4.jpg" },
      { src: "/src/assets/tiles/w5.jpg" },
      { src: "/src/assets/tiles/w6.png" },
    ],
  },
  {
    title: "Brand Storytelling Videos",
    icon: "",
    items: [
      { src: "/src/assets/tiles/v1.mp4" },
      { src: "/src/assets/tiles/v2.mp4" },
      
    ],
  },
  {
    title: "Concept Designs for a Past Client",
    icon: "",
    items: [
      { src: "/src/assets/tiles/i1.jpg" },
      { src: "/src/assets/tiles/i4.jpg" },
      { src: "/src/assets/tiles/i2.jpg" },
      { src: "/src/assets/tiles/i5.jpg" },
      { src: "/src/assets/tiles/i3.jpg" },
     
    ],
  },
];

// Build a map: slug -> category
export const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => {
  acc[slugify(c.title)] = c;
  return acc;
}, {});
