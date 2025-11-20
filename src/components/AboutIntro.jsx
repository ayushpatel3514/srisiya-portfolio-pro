import { motion } from "framer-motion";

const AboutIntro = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-y border-neutral-900 bg-gradient-to-b from-[#0a0f1a] via-[#090d13] to-[#080a0e]"
    >
      {/* Background grid of thumbnails */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-6 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[16/10] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900"
            >
              <img
                src={`https://dummyimage.com/640x480/0b0b0b/777.png&text=Design+${i + 1}`}
                alt=""
                className="h-full w-full object-cover opacity-40"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/90 via-[#090d13]/95 to-[#080a0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.35),transparent_55%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-widest text-sky-300/80"
        >
          About Me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Hi There!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-3xl text-neutral-200 leading-relaxed"
        >
          I’m <strong>Devansh Prakash</strong>, a passionate graphic designer with
          expertise in visual storytelling and a sharp eye for detail. Since 2018,
          I’ve honed my skills in crafting designs that balance creativity and precision,
          mastering design principles like{" "}
          <span className="text-sky-300 font-medium">Typography</span>,{" "}
          <span className="text-teal-300 font-medium">Composition</span>, and{" "}
          <span className="text-emerald-300 font-medium">Color</span> theory while
          staying adept with the latest tools and trends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 inline-flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur"
        >
          <a
            href="#contact"
            className="underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            Let’s Connect
          </a>
          <span className="mx-1">|</span>
          <a
            href="#blog"
            className="underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            Blog
          </a>
        </motion.div>
      </div>

      <div className="pointer-events-none h-24 bg-gradient-to-b from-transparent to-neutral-950" />
    </section>
  );
};

export default AboutIntro;
