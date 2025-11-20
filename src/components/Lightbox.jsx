import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative max-w-5xl w-full px-4">
            <motion.img
              key={image}
              src={image}
              alt="Expanded"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-6 text-white text-3xl font-light hover:text-red-400 transition"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
