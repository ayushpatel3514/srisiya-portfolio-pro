import React, { useMemo, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function LogoMarquee({
  logos = [],
  speed = 30,
  gap = "gap-10",
  grayscale = true,
}) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // treat <768px as mobile/tablet
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // duplicate list for infinite loop
  const track = useMemo(() => [...logos, ...logos], [logos]);
  const controls = useAnimation();

  // animate marquee on desktop only
  useEffect(() => {
    if (hovered && !isMobile) {
      controls.stop();
    } else if (!isMobile) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [hovered, controls, speed, isMobile]);

  return (
    <div
      className="relative w-full overflow-hidden border border-neutral-800/60 rounded-2xl bg-neutral-950/40 py-3 sm:py-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Companies we've worked with"
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

      <motion.div
        animate={!isMobile ? controls : undefined}
        className={`flex ${gap} items-center whitespace-nowrap will-change-transform px-4 sm:px-6`}
        style={{
          width: isMobile ? "max-content" : "200%",
          overflowX: isMobile ? "auto" : "hidden",
        }}
        role="list"
      >
        {track.map((logo, i) => (
          <div
            key={i}
            role="listitem"
            className="flex-shrink-0 inline-flex items-center justify-center"
          >
            <img
              src={logo.src}
              alt={logo.alt || ""}
              className={[
                // ✅ Larger logo sizes across all devices
                "object-contain w-auto transition-all duration-300 ease-out",
                "h-16 sm:h-20 md:h-24", // bigger logos everywhere
                grayscale ? "grayscale hover:grayscale-0" : "",
              ].join(" ")}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
