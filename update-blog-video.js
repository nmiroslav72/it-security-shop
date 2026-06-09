const fs=require('fs');
const p='src/app/blog/video-nadzor-preko-mobilnog-telefona/page.tsx';
let c=fs.readFileSync(p,'utf8');
const video="\n      <div className=\"blog-video\">\n        <h2>Video: Kako podesiti video nadzor na mobilnom telefonu</h2>\n        <div className=\"blog-video__wrap\">\n          <iframe\n            src=\"https://www.youtube.com/embed/Pm0dwGIg8S0\"\n            title=\"Video nadzor preko mobilnog telefona\"\n            frameBorder=\"0\"\n            allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n            allowFullScreen\n          />\n        </div>\n      </div>\n";
const css=".blog-video { margin: 32px 0; }\n        .blog-video h2 { font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }\n        .blog-video__wrap { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; }\n        .blog-video__wrap iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }\n        ";
c=c.replace('<div className="blog-post__cta">',video+'      <div className="blog-post__cta">');
c=c.replace('.blog-post__btn--outline',css+'.blog-post__btn--outline');
fs.writeFileSync(p,c,'utf8');
console.log('OK');
