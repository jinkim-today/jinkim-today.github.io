"use client";

export function PrintButton() {
  return (
    <button type="button" className="pf-btn" onClick={() => window.print()}>
      PDF 저장 / Save as PDF
    </button>
  );
}
