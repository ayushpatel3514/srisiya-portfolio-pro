import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoMarquee from "../components/LogoMarquee";
import { CATEGORIES, slugify } from "../data/galleryData";
import Testimonials from "../components/Testimonials";
import ImageTrail from "../components/ImageTrail";
import Ballpit from "../components/Ballpit"; // adjust path if needed
import ContactForm from "../components/ContactForm";

// --- Trail Images (local assets) ---
import p1 from "../assets/pimages/p1.jpg";
import p2 from "../assets/pimages/p2.jpg";
import p3 from "../assets/pimages/p3.jpg";
import p4 from "../assets/pimages/p4.jpg";
import p5 from "../assets/pimages/p5.jpg";
import p6 from "../assets/pimages/p6.jpg";
import p7 from "../assets/pimages/p7.jpg";
import p8 from "../assets/pimages/p8.jpg";
import p9 from "../assets/pimages/p9.jpg";
import p10 from "../assets/pimages/p10.jpg";
import p11 from "../assets/pimages/p11.jpg";
import p12 from "../assets/pimages/p12.jpg";
import p13 from "../assets/pimages/p13.jpg";

// --- Partner logos (for marquee) ---
import logo1 from "../assets/logos/1.png";
import logo2 from "../assets/logos/2.png";
import logo3 from "../assets/logos/3.png";
import logo4 from "../assets/logos/4.png";
import logo5 from "../assets/logos/5.png";
import logo6 from "../assets/logos/6.png";
// --- Main brand assets ---
import srisiyaLogo from "../assets/logos/srisiya_logo.png";
import heroAvatar from "../assets/tiles/avtar_try2.png";

/* =========================
   UI PRIMITIVES
   ========================= */

const Section = ({ id, title, kicker, children }) => (
  <section
    id={id}
    className="relative scroll-mt-24 py-16 sm:py-24 overflow-hidden"
  >
    {/* subtle blue spotlight */}
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[36rem] w-[36rem] 
                 -translate-x-1/2 rounded-full 
                 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.20),
                 rgba(56,189,248,0.08)_40%,transparent_70%)] blur-3xl"
    />

    <div className="max-w-6xl mx-auto px-4">
      {/* 🔹 kicker: “What we do” */}
      {kicker && (
        <motion.p
          className="text-sm tracking-widest uppercase text-sky-300 mb-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {kicker}
        </motion.p>
      )}

      {/* 🔸 title: “Services” – sky blue gradient + slow animation */}
      <motion.h2
        className="
          text-3xl sm:text-4xl font-extrabold mb-6
          bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 
          text-transparent bg-clip-text
        "
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

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
  <div className="relative group">
    {/* Glow layer */}
    <div
      className="
        pointer-events-none
        absolute inset-0
        rounded-2xl
        opacity-0
        scale-95
        blur-xl
        bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.55),rgba(168,85,247,0.45),transparent_70%)]
        transition-all
        duration-300
        group-hover:opacity-100
        group-hover:scale-105
      "
    />

    {/* Actual card */}
    <div
      className="
        relative
        rounded-2xl
        border border-neutral-800
        bg-gradient-to-b from-neutral-900/60 to-neutral-950
        p-5
        shadow-sm
        transition-all
        duration-300
        group-hover:shadow-[0_0_40px_rgba(56,189,248,0.55)]
        group-hover:border-cyan-400/70
      "
    >
      {children}
    </div>
  </div>
);

const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = 80; // height of navbar
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
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
    whatsapp: "+1 7786833148",// ← your WhatsApp number
    socials: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kamal-gohel/" },
      { label: "Dribbble", href: "https://dribbble.com/" },
    ],
  };

 const partnerLogos = [
    { src: logo1, alt: "Company 1" },
    { src: logo2, alt: "Company 2" },
    { src: logo3, alt: "Company 3" },
    { src: logo4, alt: "Company 4" },
    { src: logo5, alt: "Company 5" },
    { src: logo6, alt: "Company 6" },
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
      blurb:
        "Clean editorial layout with category chips, reading progress and search.",
      tags: ["Next.js", "MDX"],
    },
    {
      title: "Guardian Vets – Clinic Site",
      year: "2024",
      type: "Web • Corporate",
      blurb:
        "Multi-section marketing page with FAQ accordions and contact form.",
      tags: ["React", "Framer Motion"],
    },
  ];

  const trailImages = [
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11,
    p12,
    p13,
  ];

  const services = [
    {
      title: "Website Design & Development",
      copy:
        "Modern, creative websites that look premium and work perfectly on every device.",
      bullets: ["Custom landing pages & multi-page websites", "Creative UI design tailored to your brand", "Fully functional builds (forms, booking, enquiries, etc.)","Fast, responsive and SEO-friendly structure"],
    },
    {
      title: "Brand & Content Design",
      copy:
        "Visuals that keep your brand consistent across print, digital, and social media.",
      bullets: ["Social media posts, stories & carousels", "Brochures, flyers & posters for campaigns", "Business cards and basic brand collateral","Brand storytelling videos for social channels","Concept layouts for marketing and promotions"],
    },
    {
      title: "Social Media Marketing & SEO",
      copy:
        "Done-for-you marketing support to grow your online presence and reach the right audience.",
      bullets: ["Social media page setup & ongoing handling", "Content planning and posting strategy","Basic SEO (keywords, meta tags, on-page tweaks)","Paid ads management & ad-budget optimization"],
    },
  ];

  // 🧑‍🎨 Dynamic team data
  const teamMembers = [
    {
      name: "Ayush Patel",
      role: "Founder & Creative Director",
      photo: "/src/assets/team/ayush.jpg", // update with real path
      bio:
        "Leads brand strategy, visual direction and high-impact interfaces for startups and studios.",
    },
    {
      name: "Priya Sharma",
      role: "Brand & Visual Designer",
      photo: "/src/assets/team/priya.jpg",
      bio:
        "Specialises in logo systems, visual identities and social media kits that stay on-brand.",
    },
    {
      name: "Rahul Mehta",
      role: "Front-end Developer",
      photo: "/src/assets/team/rahul.jpg",
      bio:
        "Builds smooth, performant React & Webflow sites that stay pixel-perfect to design.",
    },
    {
      name: "Ananya Verma",
      role: "Motion & 3D Designer",
      photo: "/src/assets/team/ananya.jpg",
      bio:
        "Creates cinematic logo reveals, micro-animations and lightweight 3D scenes for the web.",
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
  const filtered = projects.filter(
    (p) => activeYear === "All" || p.year === activeYear
  );

  // ===== WhatsApp link (sanitised number) =====
  const phoneDigits = useMemo(
    () => (profile.whatsapp ? profile.whatsapp.replace(/\D/g, "") : ""),
    [profile.whatsapp]
  );

  const whatsappLink = phoneDigits
  ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
      "Hi! I need a design so good it makes my competitors question their life choices. Can we talk?"
    )}`
  : null;

  return (
    <div className="relative min-h-screen text-neutral-100 selection:bg-white selection:text-black overflow-x-hidden">
      {/* 🌍 Global background video for the whole page (below hero too) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-40"
      >
        <source src="/bg3.mp4" type="video/mp4" />
      </video>

      {/* Global dark overlay */}
      <div className="fixed inset-0 bg-black/60 -z-30" />

      {/* Top nav (fixed so it always stays visible) */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur border-b border-neutral-900/60 bg-neutral-950/60">
  <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">

    <Link to="/" className="flex items-center">
      <img
  src={srisiyaLogo}
  alt="Srisiya Design"
  className="
    h-16 md:h-20
    w-auto 
    object-contain 
    hover:scale-105 
    transition-transform 
    duration-300
    drop-shadow-[0_0_18px_rgba(56,189,248,0.75)]
  "
/>
    </Link>

    {/* UPDATED NAVBAR WITH SMOOTH SCROLL */}
    <nav className="hidden sm:flex gap-6 text-sm">
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
        className="hover:opacity-80 cursor-pointer"
      >
        Home
      </a>

      <a
        href="#featured"
        onClick={(e) => { e.preventDefault(); scrollToSection("featured"); }}
        className="hover:opacity-80 cursor-pointer"
      >
        Feature
      </a>

      <a
        href="#services"
        onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}
        className="hover:opacity-80 cursor-pointer"
      >
        Services
      </a>

      
      <a
        href="#contact"
        onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
        className="hover:opacity-80 cursor-pointer"
      >
        Contact
      </a>
    </nav>

    {/* BUTTON WITH SMOOTH SCROLL */}
    <a
      href="#contact"
      onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
      className="text-sm rounded-full border px-3 py-1 hover:bg-white hover:text-black transition cursor-pointer"
    >
      Let’s talk
    </a>
  </div>
</header>

      {/* Spacer so content isn't hidden behind fixed header */}
      <div className="h-20" />

      {/* Hero with Ballpit background ONLY */}
      <section
  id="home"
  className="relative min-h-[calc(100svh-5rem)] sm:min-h-[calc(100vh-5rem)] flex items-center py-8 sm:py-12"
>
        <div className="absolute inset-0 bg-black -z-20" />
        <div className="absolute inset-0 -z-10">
          <Ballpit
            count={120}
            gravity={0.7}
            friction={0.9}
            wallBounce={0.95}
            followCursor={true}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 sm:py-8 grid items-center gap-10 grid-cols-1 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-extrabold tracking-tight leading-[1.05] text-white text-[clamp(28px,6vw,64px)]"
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
              <span>FOR WINNING STARTUPS &amp; BRANDS</span>
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

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center md:justify-end items-center md:ml-10"
          >
            <img
  src={heroAvatar}
  alt="Srisiya Designer Avatar"
  className="w-full max-w-[420px] md:max-w-[540px] h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
/>
          </motion.div>
        </div>
      </section>

      {/* Trusted by (Logo Marquee) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-10">
        <p className="text-sm uppercase tracking-widest text-neutral-400 mb-3 text-center sm:text-left">
          Trusted by teams
        </p>
        <LogoMarquee
          logos={partnerLogos}
          speed={30}
          gap="gap-08 sm:gap-12 md:gap-16"
        />
      </div>

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
      {/* Services */}
{/* Services */}
<Section id="services" title="Services" kicker="What we do">
  <div className="grid gap-6 sm:grid-cols-3">
    {services.map((s, index) => {
      // Different direction per card
      const configs = [
        { initial: { opacity: 0, x: -80 }, whileInView: { opacity: 1, x: 0 } }, // left
        { initial: { opacity: 0, y: 80 },  whileInView: { opacity: 1, y: 0 } }, // middle
        { initial: { opacity: 0, x: 80 },  whileInView: { opacity: 1, x: 0 } }, // right
      ];

      const cfg = configs[index] || configs[1];

      return (
        <motion.div
          key={s.title}
          initial={cfg.initial}
          whileInView={cfg.whileInView}
          viewport={{ once: false, amount: 0.6 }}   // 👈 replays on scroll
          transition={{
            duration: 1.4,                         // smoother & not too fast
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.15,                   // light stagger
          }}
        >
          {/* constant, subtle float while visible */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <Card>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{s.copy}</p>
              <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-neutral-300">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</Section>


      {/* Testimonials */}
      <Testimonials />

      {/* Image Trail (after testimonials) */}
     <section id="image-trail" className="relative py-20">
  <div className="max-w-6xl mx-auto px-4">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.7 }}   // 👈 replays on scroll
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-transparent bg-clip-text inline-block"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      >
        Behind the pixels: the real me.
      </motion.span>
    </motion.h2>

    <motion.p
      className="text-sm text-neutral-400 mb-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      Hover to see what happens when I’m not designing.
    </motion.p>

  <div
  className="
    relative overflow-hidden rounded-2xl
    bg-neutral-900/40 border border-neutral-800 shadow-inner
    h-[160px] sm:h-[220px] md:h-[300px] lg:h-[480px]
  "
>

      <ImageTrail items={trailImages} variant={1} />
    </div>
  </div>
</section>


      {/* 👥 Our Team (new dynamic section) */}
      
      {/* Contact */}
      {/* Contact */}
<Section id="contact" title="Let’s Connect" kicker="Contact">
  <div className="grid gap-6 sm:grid-cols-2">
    {/* Left: Contact Form */}
    <Card>
      <h3 className="font-semibold text-xl">Start your project</h3>
      <p className="mt-2 text-sm text-neutral-300">
        Tell us the goal, audience and deadline — we’ll reply with a plan
        and estimate.
      </p>
      <ContactForm />
    </Card>

    {/* Right: Social media with animated buttons */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-md p-5"
    >
      {/* 🎥 Background video */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="src/assets/tiles/bg2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </div>

      {/* ✨ Foreground content */}
      <div className="relative z-10">
        {/* Title */}
        <motion.h3
          className="font-semibold text-xl sm:text-2xl bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Social media
        </motion.h3>

        <p className="mt-1 text-sm text-neutral-300">
          Follow the studio and see more behind-the-scenes work.
        </p>

        {/* Social buttons */}
        <div className="mt-4 flex flex-col gap-3">
          {profile.socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-full border border-neutral-700/70 bg-black/40 px-4 py-2 text-sm text-neutral-100 backdrop-blur-sm"
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: "0 0 18px rgba(56,189,248,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <span>{s.label}</span>
              <span className="text-xs text-sky-300">Visit ↗</span>
            </motion.a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-6 text-sm text-neutral-300 space-y-1">
          <p className="text-neutral-200">Prefer chat?</p>

          {whatsappLink && (
  <motion.a
    href={whatsappLink}
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-2
      rounded-full border border-neutral-700
      bg-black/40 px-4 py-2
      text-sm font-medium text-neutral-100
      hover:bg-neutral-100 hover:text-black hover:border-neutral-100
      transition-colors duration-200
    "
    whileHover={{ scale: 1.03, y: -1 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
  >
    <span className="text-base">Chat on WhatsApp</span>
    <span
      aria-hidden
      className="text-lg"
    >
      💬
    </span>
  </motion.a>
)}


          <p className="text-xs text-neutral-400">
            WhatsApp: {profile.whatsapp}
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</Section>


      {/* Footer */}
      <footer className="py-10">

        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          
        </div>
      </footer>
    </div>
  );
}
