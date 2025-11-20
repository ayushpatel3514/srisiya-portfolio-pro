import React from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORY_MAP } from "../data/galleryData";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = CATEGORY_MAP[slug];

  if (!category) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold">Not found</h1>
          <p className="mt-3 text-neutral-400">We couldn't find that category.</p>
          <Link to="/" className="mt-6 inline-block underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-neutral-900/60 bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">Srisiya Design</Link>
          <Link to="/" className="text-sm underline decoration-neutral-700 underline-offset-4 hover:decoration-neutral-400">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <p className="text-sm tracking-widest uppercase text-neutral-400 mb-2">Category</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-3">
          <span>{category.icon}</span> {category.title}
        </h1>

        {/* Grid of large images */}
        {/* Grid of large images */}
<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {category.items.map((it, idx) => (
    <figure
      key={idx}
      className="
        group relative rounded-xl border border-neutral-800 bg-neutral-900/40
        flex items-center justify-center
        sm:aspect-[4/5] sm:overflow-hidden
      "
    >
      <img
        src={it.src}
        alt={it.alt || category.title}
        className="
          w-full h-auto              /* mobile: free height, no cropping   */
          sm:w-auto sm:h-full        /* bigger screens: fit inside frame  */
          sm:max-h-full sm:max-w-full
          object-contain rounded-lg
          group-hover:opacity-90 transition
        "
        loading="lazy"
      />

      {it.caption && (
        <figcaption
          className="absolute bottom-2 left-2 right-2 text-xs
                     text-neutral-300 bg-black/40 px-2 py-1 rounded-md"
        >
          {it.caption}
        </figcaption>
      )}
    </figure>
  ))}
</div>

      </main>

      <footer className="border-t border-neutral-900/60 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-400">
          © {new Date().getFullYear()} Srisiya Design
        </div>
      </footer>
    </div>
  );
}
