"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cursor-pointer rounded-full bg-fg px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-white"
    >
      PDF 저장 / Save as PDF
    </button>
  );
}
