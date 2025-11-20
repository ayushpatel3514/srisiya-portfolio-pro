// src/components/ImageTrail.jsx
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ImageTrail.css";

/* ------------------ Utilities ------------------ */
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e, rect) {
  let clientX = 0,
    clientY = 0;

  if (e.touches?.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

/* ------------------ Detect Desktop Pointer ------------------ */
function useFinePointer() {
  const [isFine, setIsFine] = useState(true);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFine(mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else if (mq.addListener) {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  return isFine;
}

/* ------------------ Image Item ------------------ */
class ImageItem {
  constructor(el) {
    this.DOM = {
      el,
      inner: el.querySelector(".content__img-inner"),
    };

    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    this.getRect();

    this.onResize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };

    window.addEventListener("resize", this.onResize);
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
  }
}

/* ------------------ Desktop GSAP Trail ------------------ */
class ImageTrailVariant1 {
  constructor(container) {
    this.container = container;
    this.images = [...container.querySelectorAll(".content__img")].map(
      (el) => new ImageItem(el)
    );

    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };

    this.initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());

      this.container.removeEventListener("mousemove", this.initRender);
      this.container.removeEventListener("touchmove", this.initRender);
    };

    container.addEventListener("mousemove", this.handlePointerMove);
    container.addEventListener("touchmove", this.handlePointerMove, {
      passive: true,
    });

    container.addEventListener("mousemove", this.initRender);
    container.addEventListener("touchmove", this.initRender, { passive: true });
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);

    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }

    this.raf = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!this.imagesTotal) return;

    ++this.zIndexVal;

    this.imgPosition =
      this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap
      .timeline()
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        }
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: "power3",
          opacity: 0,
          scale: 0.2,
        },
        0.4
      );
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.container.removeEventListener("mousemove", this.handlePointerMove);
    this.container.removeEventListener("touchmove", this.handlePointerMove);
    this.images.forEach((img) => img.destroy());
  }
}

const variantMap = { 1: ImageTrailVariant1 };

/* ------------------ MAIN COMPONENT ------------------ */
export default function ImageTrail({ items = [], variant = 1 }) {
  const containerRef = useRef(null);
  const isFinePointer = useFinePointer();

  // Run hooks on every render; only init GSAP on desktop
  useEffect(() => {
    if (!isFinePointer) return;                // 👈 mobile: skip GSAP
    if (!containerRef.current || items.length === 0) return;

    const TrailClass = variantMap[variant] || variantMap[1];
    const instance = new TrailClass(containerRef.current);

    return () => instance?.destroy?.();
  }, [items, variant, isFinePointer]);

  // JSX can branch safely; hooks above always run in same order
  if (!isFinePointer) {
    // Mobile fallback: simple horizontal strip
    return (
      <div className="flex gap-3 overflow-x-auto py-3 px-2">
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-36 w-auto rounded-xl border border-neutral-800 object-cover flex-shrink-0"
          />
        ))}
      </div>
    );
  }

  // Desktop: GSAP trail area
  return (
    <div className="content" ref={containerRef}>
      {items.map((src, i) => (
        <div className="content__img" key={i}>
          <div
            className="content__img-inner"
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}
    </div>
  );
}
