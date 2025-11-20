// src/components/Testimonials.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import starImg from "../assets/icons/star.png"; // ← adjust path if needed
import avatar1 from "../assets/tiles/t1.png";
const testimonials = [
  {
    name: "Manvendra Kaushik",
    role: "Sr. USA & Canada Counsellor, IDP",
    text: "Kamal learns fast, adapts quickly, and handles challenges with a calm, professional mindset. His design quality consistently exceeds expectations.",
    img: avatar1,

  },
  {
    name: "DR. Yash Rami",
    role: "Sr. Physiotherapist, Wellness",
    text: "Kamal’s designs elevated our platform with clean visuals, intuitive structure, and clear communication. Exactly the standard we were aiming for.",
     img: avatar1,
  },
  {
    name: "Tanveer Sandhu",
    role: "Marketing Manager, Lacasa Inc.",
    text: "Kamal has a natural eye for layout and user experience. Every project feels seamless, polished, and incredibly easy for our audience to navigate.",
     img: avatar1,
  },
  {
    name: "Vaibhav Arora",
    role: "Co-founder, IDFY",
    text: "Kamal is reliable, detail-focused, and fast. His ability to turn ideas into visually strong, functional designs is genuinely impressive.",
     img: avatar1,
  },
];

export default function Testimonials() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="testimonials"
      className="
        relative
        mt-12 sm:mt-16 lg:-mt-8
        min-h-[100vh]
        flex flex-col items-center justify-center
        overflow-hidden
        text-white
      "
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 tracking-tight leading-tight">
          {/* Line 1 – from right */}
          <motion.span
            className="block"
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Believe me
          </motion.span>

          {/* Line 2 – from left */}
          <motion.span
            className="block mt-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          >
            My mom did NOT write this.
          </motion.span>
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {testimonials.map((t, i) => {
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative rounded-2xl p-6 sm:p-8 border 
                  transition-all duration-300
                  bg-neutral-900/40
                  h-full flex flex-col justify-between
                  ${
                    hovered !== null && !isHovered
                      ? "blur-sm brightness-75 bg-white/10"
                      : "border-neutral-800 hover:border-cyan-400/60 hover:shadow-[0_0_45px_rgba(56,189,248,0.45)]"
                  }
                `}
              >
                {/* Top: avatar + name + role + stars */}
                <div className="flex items-start justify-between mb-4">
                  {/* Left: avatar + name + role */}
                  <div className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.name}
                      className={`
                        w-10 h-10 rounded-full object-cover border 
                        transition-all duration-300
                        ${
                          isHovered
                            ? "border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.9)]"
                            : "border-white/40"
                        }
                      `}
                    />
                    <div className="text-left">
                      <h4
                        className={`
                          font-bold text-lg transition-all duration-300
                          ${
                            isHovered
                              ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                              : ""
                          }
                        `}
                      >
                        {t.name}
                      </h4>
                      <p
                        className={`
                          text-sm opacity-80 transition-all
                          ${isHovered ? "text-cyan-200" : ""}
                        `}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* Right: star rating */}
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <img
                        key={n}
                        src={starImg}
                        alt="star"
                        className={`
                          w-5 h-5
                          transition-all duration-300
                          ${
                            isHovered
                              ? "scale-110 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                              : ""
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom: review text */}
                <p
                  className={`
                    text-base leading-relaxed transition-all text-left
                    ${
                      isHovered
                        ? "text-cyan-100 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                        : "text-neutral-200"
                    }
                  `}
                >
                  {t.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
