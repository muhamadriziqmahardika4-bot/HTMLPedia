import React from "react";
export default function ProgressBar({ done, total, label }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="progress-wrap">
      {label && <>🚀 Progresmu: <b>{done} / {total} tag</b></>}
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progres belajar">
        <div style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

