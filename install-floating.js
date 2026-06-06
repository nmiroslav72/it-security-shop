const fs=require('fs');
fs.mkdirSync('src/components/layout',{recursive:true});
fs.writeFileSync('src/components/layout/FloatingButtons.tsx',"\"use client\";\n\nimport { useState, useEffect } from \"react\";\n\nexport function FloatingButtons() {\n  const [showTop, setShowTop] = useState(false);\n\n  useEffect(() => {\n    const onScroll = () => setShowTop(window.scrollY > 300);\n    window.addEventListener(\"scroll\", onScroll);\n    return () => window.removeEventListener(\"scroll\", onScroll);\n  }, []);\n\n  return (\n    <>\n      <a\n        href=\"tel:063224651\"\n        className=\"fab fab--phone\"\n        aria-label=\"Pozovite nas\"\n      >\n        \ud83d\udcde\n      </a>\n\n      {showTop && (\n        <button\n          className=\"fab fab--top\"\n          onClick={() => window.scrollTo({ top: 0, behavior: \"smooth\" })}\n          aria-label=\"Nazad na vrh\"\n        >\n          \u2191\n        </button>\n      )}\n\n      <style>{`\n        .fab {\n          position: fixed;\n          width: 52px;\n          height: 52px;\n          border-radius: 50%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          font-size: 22px;\n          cursor: pointer;\n          box-shadow: 0 4px 12px rgba(0,0,0,0.2);\n          z-index: 999;\n          transition: transform 0.2s, box-shadow 0.2s;\n          text-decoration: none;\n          border: none;\n        }\n        .fab:hover {\n          transform: scale(1.1);\n          box-shadow: 0 6px 16px rgba(0,0,0,0.3);\n        }\n        .fab--phone {\n          bottom: 24px;\n          right: 24px;\n          background: #25d366;\n          color: #fff;\n        }\n        .fab--top {\n          bottom: 24px;\n          left: 24px;\n          background: var(--brand);\n          color: #fff;\n          font-size: 20px;\n          font-weight: 700;\n        }\n      `}</style>\n    </>\n  );\n}\n",'utf8');

// Add to layout.tsx
let layout = fs.readFileSync('src/app/layout.tsx','utf8');
if(!layout.includes('FloatingButtons')){
  layout = layout.replace(
    'import { RightSidebar }',
    'import { FloatingButtons } from "@/components/layout/FloatingButtons";\nimport { RightSidebar }'
  );
  layout = layout.replace('<Footer />', '<FloatingButtons />\n          <Footer />');
  fs.writeFileSync('src/app/layout.tsx', layout, 'utf8');
  console.log('OK: layout updated');
}
console.log('OK: FloatingButtons created');
