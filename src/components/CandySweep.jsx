import React from "react";
import { motion } from "framer-motion";

// Sapuan gradien candy yang melintasi layar saat berpindah halaman —
// kesan "candy wipe" ala After Effects, bukan sekadar fade.
export default function CandySweep() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ x: "-130%" }}
      animate={{ x: "230%" }}
      transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1] }}
      style={{
        position: "fixed", top: "-10%", bottom: "-10%", width: "34vw", zIndex: 60, pointerEvents: "none",
        background: "linear-gradient(100deg, transparent 0%, #fbcfe8 18%, #fde047 38%, #a5f3fc 58%, #c7d2fe 78%, transparent 100%)",
        filter: "blur(28px)", opacity: 0.9, transform: "skewX(-12deg)",
      }}
    />
  );
}
