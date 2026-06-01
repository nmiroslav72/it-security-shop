// @ts-nocheck
"use client";

import { useState } from "react";
import { faqs } from "@/lib/faqs";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition hover:bg-slate-50"
            >
              <span>{faq.q}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 px-5 py-4 text-ink-muted">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
