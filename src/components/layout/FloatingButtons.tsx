"use client";

import { useState, useEffect } from "react";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="tel:063224651"
        className="fab fab--phone"
        aria-label="Pozovite nas"
      >
        📞
      </a>

      {showTop && (
        <button
          className="fab fab--top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Nazad na vrh"
        >
          ↑
        </button>
      )}

      <style>{`
        .fab {
          position: fixed;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          z-index: 999;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          border: none;
        }
        .fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        .fab--phone {
          bottom: 24px;
          right: 24px;
          background: #25d366;
          color: #fff;
        }
        .fab--top {
          bottom: 24px;
          left: 24px;
          background: var(--brand);
          color: #fff;
          font-size: 20px;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
