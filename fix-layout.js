
const fs = require('fs');
let c = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Fix double Suspense wrapper
c = c.replace(
  '<Suspense fallback={<div style={{width:220}}></div>}><Suspense fallback={<div style={{width:220}}></div>}><LeftSidebar /></Suspense></Suspense>',
  '<Suspense fallback={<div style={{width:220}}></div>}><LeftSidebar /></Suspense>'
);

fs.writeFileSync('src/app/layout.tsx', c, 'utf8');
console.log('OK');
