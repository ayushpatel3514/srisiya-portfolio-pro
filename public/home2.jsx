import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoMarquee from "../components/LogoMarquee";
import { CATEGORIES, slugify } from "../data/galleryData";
import Testimonials from "../components/Testimonials";

/* =========================
   UI PRIMITIVES
   ========================= */

const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="relative scroll-mt-24 py-16 sm:py-24 overflow-hidden">
    {/* subtle blue spotlight */}
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.20),rgba(56,189,248,0.08)_40%,transparent_70%)] blur-3xl"
    />
    <div className="max-w-6xl mx-auto px-4">
      {kicker && <p className="text-sm tracking-widest uppercase text-neutral-400 mb-2">{kicker}</p>}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm backdrop-blur border-neutral-700 bg-neutral-900/40">
    {children}
  </span>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950 p-5 shadow-sm hover:shadow-md transition-shadow">
    {children}
  </div>
);

/* =========================
   CATEGORY STRIP (linked)
   ========================= */
const DesignStrip = ({ title, items = [], icon = "★" }) => {
  const to = `/category/${slugify(title)}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5"
    >
      <Link to={to} className="flex items-center gap-2 mb-4 group">
        <span className="text-lg">{icon}</span>
        <h3 className="font-semibold group-hover:underline">{title}</h3>
      </Link>

      {/* Scrollable horizontal gallery */}
      <div
        className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory 
                   [-ms-overflow-style:none] [scrollbar-width:none]
                   [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {items.map((it, idx) => (
          <Link
            key={idx}
            to={to}
            className="flex-none snap-center group relative w-56 sm:w-64"
            aria-label={`Open ${title}`}
          >
            {it.src ? (
              <img
                src={it.src}
                alt={it.alt || title}
                className="h-36 w-full object-cover rounded-xl border border-neutral-800 bg-neutral-900/40 
                           group-hover:opacity-90 transition duration-300"
              />
            ) : (
              <div className="h-36 w-full rounded-xl border border-neutral-800 bg-neutral-900/60 grid place-content-center text-neutral-500 text-sm">
                Image
              </div>
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

/* =========================
   PAGE COMPONENT
   ========================= */

export default function Home() {
  const profile = {
    name: "Srisiya Design",
    role: "Graphic Design Studio",
    tagline:
      "Helping founders and teams translate vision into visuals that build lasting impressions.",
    location: "Vancouver, Canada",
    email: "hello@srisiya.design",
    socials: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Dribbble", href: "https://dribbble.com/" },
    ],
  };

  const partnerLogos = [
    { src: "/src/assets/logos/1.png", alt: "Company 1" },
    { src: "/src/assets/logos/2.png", alt: "Company 2" },
    { src: "/src/assets/logos/3.png", alt: "Company 3" },
    { src: "/src/assets/logos/4.jpg", alt: "Company 4" },
  ];

  const featured = CATEGORIES;

  const projects = [
    {
      title: "Watch Store – E-commerce UI",
      year: "2025",
      type: "Web • UI/UX",
      blurb: "Responsive storefront with product cards, filters, and cart drawer.",
      tags: ["React", "Tailwind", "Stripe (mock)"],
    },
    {
      title: "Green Earth – Sustainability Blog",
      year: "2025",
      type: "Web • Blog",
      blurb: "Clean editorial layout with category chips, reading progress and search.",
      tags: ["Next.js", "MDX"],
    },
    {
      title: "Guardian Vets – Clinic Site",
      year: "2024",
      type: "Web • Corporate",
      blurb: "Multi-section marketing page with FAQ accordions and contact form.",
      tags: ["React", "Framer Motion"],
    },
  ];

  const services = [
    {
      title: "Website Design",
      copy: "Landing pages, portfolios, and blogs that are fast, responsive and easy to edit.",
      bullets: ["Wix / WordPress / Webflow", "Next.js / React", "SEO basics"],
    },
    {
      title: "Brand & Graphics",
      copy: "Logos, posters, pitch decks, and social templates that feel on-brand.",
      bullets: ["Figma systems", "A4 posters", "Social kits"],
    },
    {
      title: "Video & 3D",
      copy: "Short promos, explainers, and lightweight 3D visuals for campaigns.",
      bullets: ["Motion basics", "Product visuals", "Clips for socials"],
    },
  ];

  const experiences = [
    {
      org: "Freelance / Studio",
      role: "Product Designer & Front-end",
      period: "2023 – Present",
      points: [
        "Designed & shipped 10+ marketing sites (Wix/WordPress/Webflow/React)",
        "Established design tokens and component libraries",
        "Improved Lighthouse scores 90+ for performance & a11y",
      ],
    },
    {
      org: "University Projects",
      role: "Data & Visualisation",
      period: "2024 – 2025",
      points: [
        "Built dashboards for CX and finance coursework",
        "Applied CRISP-DM across analytics projects",
      ],
    },
  ];

  const [activeYear, setActiveYear] = useState("All");
  const years = ["All", ...Array.from(new Set(projects.map((p) => p.year)))];
  const filtered = projects.filter((p) => activeYear === "All" || p.year === activeYear);

  return (
  <div className="relative min-h-screen text-neutral-100 selection:bg-white selection:text-black overflow-hidden">
    {/* 🎥 Global full-page video background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10"
    >
      <source src="/bg3.mp4" type="video/mp4" />
    </video>

    {/* 🖤 Optional overlay for readability */}
    <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Top nav */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-neutral-900/60 bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
  <img
    src="/src/assets/tiles/profile-pic.png" // replace with your actual image path
    alt="Srisiya Design Logo"
    className="w-8 h-8 rounded-full object-cover border border-neutral-700 shadow-sm hover:scale-105 transition-transform duration-300"
  />
  {profile.name}
</Link>

          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#featured" className="hover:opacity-80">Featured</a>
            <a href="#work" className="hover:opacity-80">Work</a>
            <a href="#services" className="hover:opacity-80">Services</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <a
            href="#contact"
            className="text-sm rounded-full border px-3 py-1 hover:bg-white hover:text-black transition"
          >
            Let’s talk
          </a>
        </div>
      </header>

    {/* Hero */}
{/* Hero */}
<section id="home" className="relative overflow-hidden min-h-screen flex items-center">
  {/* 🎥 Fullscreen video background */}
  <div className="absolute inset-0 -z-10">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      {/* ✅ correct path, video is in public/background.mp4 */}
      <source src="/bg-footer.mp4" type="video/mp4" />
    </video>
  </div>

  {/* 🖤 Optional overlay for readability */}
  <div className="absolute inset-0 bg-black/60 -z-10" />

  {/* 🌟 Hero content */}
  <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 sm:py-32 grid items-center gap-10 sm:grid-cols-2">
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white"
      >
        <span>AN </span>
        <motion.span
          className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-[length:200%_auto] text-transparent bg-clip-text"
          animate={{ backgroundPosition: ["0% center", "100% center"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          ULTIMATE DESIGN PARTNER
        </motion.span>
        <br />
        <span>FOR WINNING STARTUPS & BRANDS</span>
      </motion.h1>

      <p className="mt-5 text-neutral-200 leading-relaxed max-w-prose">
        {profile.tagline}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Pill>{profile.location}</Pill>
        <Pill>On-time delivery</Pill>
        <Pill>Print-ready files</Pill>
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href="#featured"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-white hover:text-black transition"
        >
          View work
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium"
        >
          Email us
        </a>
      </div>
    </div>

    {/* Avatar image */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center md:justify-end items-center md:ml-10"
    >
      <img
        src="/src/assets/tiles/avatar.png"
        alt="Srisiya Designer Avatar"
        className="w-[380px] md:w-[480px] h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
      />
    </motion.div>
  </div>
</section>
{/* Hero section ends here */}

{/* Featured Designs (category cards) */}
<Section id="featured" title="Featured Designs" kicker="Showcase">
  <div className="flex items-center justify-between mb-4">
    <p className="text-sm text-neutral-400">
      Curated categories from recent work
    </p>
    <a
      href="#work"
      className="text-sm inline-flex items-center gap-1 underline decoration-neutral-700 underline-offset-4 hover:decoration-neutral-400"
    >
      All Designs →
    </a>
  </div>

  {/* Responsive: stacked on mobile, grid on tablet+ */}
  <div
    className="grid gap-5 sm:gap-6 
               grid-cols-1 sm:grid-cols-2
               overflow-x-visible overflow-y-visible"
  >
    {featured.map((cat) => (
      <DesignStrip
        key={cat.title}
        title={cat.title}
        items={cat.items}
        icon={cat.icon}
      />
    ))}
  </div>
</Section>



      {/* Services */}
      <Section id="services" title="Services" kicker="What we do">
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title}>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{s.copy}</p>
              <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-neutral-300">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      {/* <Section id="experience" title="Experience" kicker="Journey">
        <div className="space-y-6">
          {experiences.map((e) => (
            <div key={e.org} className="relative pl-6">
              <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-white" />
              <h3 className="font-medium">
                {e.role} · <span className="text-neutral-300">{e.org}</span>
              </h3>
              <p className="text-sm text-neutral-400">{e.period}</p>
              <ul className="mt-2 space-y-1 text-sm text-neutral-300 list-disc list-inside">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section> */}
      
      {/* Work */}
      {/* <Section id="work" title="Selected Work" kicker="Portfolio">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-sm text-neutral-400">Filter by year</span>
          <div className="flex gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  activeYear === y ? "bg-white text-black" : "border-neutral-800 hover:bg-neutral-900"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card>
                <div className="aspect-[4/3] w-full rounded-xl border border-neutral-800 bg-neutral-900/60 grid place-content-center text-neutral-500 text-sm">
                  Thumbnail
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{p.title}</h3>
                    <span className="text-xs text-neutral-400">{p.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-300">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
      </Section> */}
{/* Testimonials */}
<Testimonials />

      {/* Contact */}
<Section id="contact" title="Let’s Connect" kicker="Contact">
  <div className="grid gap-6 sm:grid-cols-2">
    {/* Left: Contact Form */}
    <Card>
      <h3 className="font-semibold">Start your project</h3>
      <p className="mt-2 text-sm text-neutral-300">
        Tell us the goal, audience and deadline — we’ll reply with a plan and estimate.
      </p>
      <form
        action="https://formspree.io/f/mknldvge"
        method="POST"
        className="mt-4 grid gap-3"
      >
        <input
          name="name"
          required
          placeholder="Your name"
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2"
        />
        <textarea
          name="brief"
          rows={5}
          placeholder="Tell us about the project (sizes, deadline, goal)"
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2"
        />
        <button className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium">
          Start your brief — 2 minutes
        </button>
      </form>
    </Card>

    {/* Right: Elsewhere with video background */}
    <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-md p-5">
      {/* 🎥 Background video inside card */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* 👇 make sure this file is inside /public */}
          <source src="src/assets/tiles/bg2.mp4" type="video/mp4" />
        </video>

        {/* 🖤 Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </div>

      {/* ✨ Foreground content */}
      <div className="relative z-10">
        <h3 className="font-semibold text-lg">Elsewhere</h3>
        <ul className="mt-2 space-y-2 text-sm">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                className="underline decoration-neutral-700 underline-offset-4 hover:decoration-neutral-400"
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-sm text-neutral-300">
          Prefer chat? Message us on WhatsApp.
        </div>
      </div>
    </div>
  </div>
</Section>

      {/* Footer */}
      <footer className="border-t border-neutral-900/60 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built with React + Tailwind + Framer Motion</span>
        </div>
      </footer>
    </div>
  );
}
