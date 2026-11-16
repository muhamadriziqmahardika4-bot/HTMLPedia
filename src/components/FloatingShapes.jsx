import React from "react";
// Shapes — dekorasi background ala candy (lingkaran, ring, rounded-rect, plus).
// Diletakkan DI LUAR .app (bukan fixed di dalam ancestor ber-zoom).

export default function FloatingShapes() {
  return (
    <div className="shapes" aria-hidden="true">
      <div className="shape ring" style={{ width: 170, height: 170, top: -50, left: -50 }} />
      <div className="shape ring indigo" style={{ width: 110, height: 110, bottom: 90, right: -35, animationDelay: "-3s" }} />
      <div className="shape ring cyan" style={{ width: 70, height: 70, top: "38%", left: "-20px", animationDelay: "-5s" }} />
      <div className="shape dot" style={{ width: 34, height: 34, background: "rgba(165,243,252,.8)", top: 120, left: "14%", animationDelay: "-1.5s" }} />
      <div className="shape dot" style={{ width: 18, height: 18, background: "rgba(199,210,254,.9)", top: 240, right: "16%", animationDelay: "-4s" }} />
      <div className="shape dot outline" style={{ width: 26, height: 26, top: "60%", right: "28%", animationDelay: "-2.5s" }} />
      <div className="shape dot" style={{ width: 14, height: 14, background: "rgba(125,211,252,.9)", bottom: 220, left: "30%", animationDelay: "-6s" }} />
      <div className="shape rrect" style={{ width: 115, height: 42, top: 80, right: "8%", "--rot": "-10deg", animationDelay: "-2s" }} />
      <div className="shape rrect ind" style={{ width: 82, height: 32, bottom: 150, left: "7%", "--rot": "12deg", animationDelay: "-5s" }} />
      <div className="shape rrect cyan alt" style={{ width: 60, height: 24, top: "30%", right: "22%", "--rot": "8deg", animationDelay: "-1s" }} />
      <div className="shape plus" style={{ top: 170, left: "44%", fontSize: "1.6rem" }}>✚</div>
      <div className="shape plus" style={{ bottom: 190, right: "32%", fontSize: "1.1rem", animationDelay: "-3.5s" }}>✚</div>
      <div className="shape cross alt" style={{ top: "48%", left: "20%", animationDelay: "-2s" }}>✕</div>
      <div className="shape cross" style={{ top: "18%", right: "30%", animationDelay: "-4.5s" }}>✕</div>
      <div className="shape squiggle" style={{ bottom: 120, left: "42%" }}>〰</div>
      <div className="shape dots-line" style={{ top: 34, left: "34%" }}>••••••</div>
      <div className="shape dots-line alt" style={{ bottom: 26, left: "28%", animationDelay: "-3s" }}>••••••</div>
    </div>
  );
}

