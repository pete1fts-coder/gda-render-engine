// GDA Render Engine — templates_v2.js
// v2.1 — Drop A logo PNG, Canva-matched layouts
// Changes from v1: full-width gold rules, centered text, GDA Drop A logo image,
// @handle badge, background image support, gold body text, bolder type scale,
// "Book at Glowdistrictskin.com" + "Link in Bio" footer on CTA templates

// Shared CSS fragments
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@200;300;400;500;600;700&display=swap');`;

const RESET = `*{margin:0;padding:0;box-sizing:border-box}`;

const GRAIN = `body::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");background-size:256px 256px;pointer-events:none;z-index:10}`;

// Full-width gold rule — the signature element
const GOLD_RULE_CSS = `.gold-rule{width:88%;height:2px;background:linear-gradient(90deg,transparent 0%,#C9A84C 15%,#C9A84C 85%,transparent 100%);margin:0 auto}`;

// GDA logo lockup — Drop A PNG + wordmark text
const GDA_LOGO_URL = 'https://pub-f8e34d58aecc49a8a1052985a6651845.r2.dev/GD_Drop_A_Transparent.png';
const LOGO_LOCKUP_HTML = `<div class="logo-lockup"><img class="logo-img" src="${GDA_LOGO_URL}" alt="GDA"><div class="logo-words">GLOW DISTRICT<br>AESTHETICS</div></div>`;
const LOGO_LOCKUP_CSS = `.logo-lockup{text-align:center;margin-bottom:8px}.logo-img{width:220px;height:auto;display:block;margin:0 auto 4px}.logo-words{font-family:'Montserrat',sans-serif;font-weight:400;font-size:11px;color:#C9A84C;letter-spacing:0.45em;text-transform:uppercase;line-height:1.6}`;

// Handle badge
const HANDLE_HTML = `<div class="handle-badge">@glowdistrictaesthetics</div>`;
const HANDLE_CSS = `.handle-badge{display:inline-block;font-family:'Montserrat',sans-serif;font-weight:500;font-size:16px;color:#0D0D0D;background:#C9A84C;padding:12px 32px;letter-spacing:0.06em;margin:0 auto}`;

// Handle plain (no badge, just gold text)
const HANDLE_PLAIN_HTML = `<div class="handle-plain">@glowdistrictaesthetics</div>`;
const HANDLE_PLAIN_CSS = `.handle-plain{font-family:'Montserrat',sans-serif;font-weight:400;font-size:16px;color:#C9A84C;letter-spacing:0.08em;text-align:center}`;

// Footer with booking CTA
const FOOTER_CTA_HTML = `<div class="footer-cta"><div class="footer-book">Book at Glowdistrictskin.com</div><div class="footer-link">Link in Bio</div></div>`;
const FOOTER_CTA_CSS = `.footer-cta{text-align:center}.footer-book{font-family:'Montserrat',sans-serif;font-weight:400;font-size:16px;color:#C9A84C;letter-spacing:0.06em;margin-bottom:8px}.footer-link{font-family:'Montserrat',sans-serif;font-weight:300;font-size:14px;color:rgba(201,168,76,0.6);letter-spacing:0.1em}`;

// Background image layer with dark scrim
const BG_IMAGE_CSS = `.bg-image{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0}.bg-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0.55) 40%,rgba(0,0,0,0.7) 70%,rgba(0,0,0,0.85) 100%);z-index:1}`;


const TEMPLATES = {

  // ═══════════════════════════════════════════════════════
  // DARK-QUOTE — Founder quotes, authority statements
  // ═══════════════════════════════════════════════════════
  "dark-quote": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${BG_IMAGE_CSS}
  ${GOLD_RULE_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .content{position:absolute;inset:0;padding:100px 72px 120px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .quote{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{fontSize}}px;color:#FFFFFF;line-height:1.22;max-width:920px;margin-bottom:40px}
  .attribution{font-family:'Montserrat',sans-serif;font-weight:400;font-size:16px;color:#C9A84C;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:56px}
  .body-text{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:30px;color:rgba(255,255,255,0.85);line-height:1.55;max-width:820px;margin-bottom:0}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_CSS}
</style>
</head>
<body>
  {{#backgroundImage}}<div class="bg-image" style="background-image:url('{{backgroundImage}}')"></div><div class="bg-scrim"></div>{{/backgroundImage}}
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="content">
    <div class="quote">\u201C{{quoteText}}\u201D</div>
    <div class="attribution">{{attribution}}</div>
    {{#bodyText}}<div class="body-text">{{bodyText}}</div>{{/bodyText}}
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_HTML}
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // DARK-CTA — Call to action with booking push
  // ═══════════════════════════════════════════════════════
  "dark-cta": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${BG_IMAGE_CSS}
  ${GOLD_RULE_CSS}
  ${LOGO_LOCKUP_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .top-section{position:absolute;top:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;z-index:5;padding-top:20px}
  .content{position:absolute;inset:0;padding:100px 72px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .eyebrow{font-family:'Montserrat',sans-serif;font-weight:500;font-size:14px;color:#C9A84C;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:44px}
  .headline{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{headlineFontSize}}px;color:#FFFFFF;line-height:1.18;max-width:920px;margin-bottom:48px}
  .subtext{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:28px;color:#C9A84C;line-height:1.55;max-width:780px;margin-bottom:56px}
  .cta{display:inline-block;font-family:'Montserrat',sans-serif;font-weight:600;font-size:14px;color:#0D0D0D;background:#C9A84C;padding:20px 56px;letter-spacing:0.25em;text-transform:uppercase}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_CSS}
</style>
</head>
<body>
  {{#backgroundImage}}<div class="bg-image" style="background-image:url('{{backgroundImage}}')"></div><div class="bg-scrim"></div>{{/backgroundImage}}
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="top-section">
    ${LOGO_LOCKUP_HTML}
  </div>
  <div class="content">
    {{#eyebrow}}<div class="eyebrow">{{eyebrow}}</div>{{/eyebrow}}
    <div class="headline">{{headline}}</div>
    {{#subtext}}<div class="subtext">{{subtext}}</div>{{/subtext}}
    <div class="cta">{{ctaText}}</div>
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_HTML}
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // DARK-CAROUSEL — Educational slide content
  // ═══════════════════════════════════════════════════════
  "dark-carousel": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${BG_IMAGE_CSS}
  ${GOLD_RULE_CSS}
  ${LOGO_LOCKUP_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .top-section{position:absolute;top:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;z-index:5;padding-top:20px}
  .content{position:absolute;inset:0;padding:280px 72px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .slide-indicator{font-family:'Montserrat',sans-serif;font-weight:400;font-size:13px;color:#C9A84C;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:44px}
  .title{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{titleFontSize}}px;color:#FFFFFF;line-height:1.2;max-width:880px;margin-bottom:52px}
  .body-text{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:28px;color:rgba(255,255,255,0.82);line-height:1.55;max-width:800px}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_PLAIN_CSS}
</style>
</head>
<body>
  {{#backgroundImage}}<div class="bg-image" style="background-image:url('{{backgroundImage}}')"></div><div class="bg-scrim"></div>{{/backgroundImage}}
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="top-section">
    ${LOGO_LOCKUP_HTML}
  </div>
  <div class="content">
    <div class="slide-indicator">{{slideNumber}} of {{totalSlides}}</div>
    <div class="title">{{title}}</div>
    <div class="body-text">{{bodyText}}</div>
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_PLAIN_HTML}
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // DARK-TUTORIAL — Step-by-step instructional
  // ═══════════════════════════════════════════════════════
  "dark-tutorial": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${BG_IMAGE_CSS}
  ${GOLD_RULE_CSS}
  ${LOGO_LOCKUP_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .top-section{position:absolute;top:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;z-index:5;padding-top:20px}
  .content{position:absolute;inset:0;padding:280px 72px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .step-label{font-family:'Montserrat',sans-serif;font-weight:500;font-size:14px;color:#C9A84C;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:40px}
  .step-title{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{titleFontSize}}px;color:#FFFFFF;line-height:1.2;max-width:880px;margin-bottom:44px}
  .step-body{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:28px;color:rgba(255,255,255,0.82);line-height:1.55;max-width:800px;margin-bottom:48px}
  .pro-tip{padding:28px 48px;border:1px solid rgba(201,168,76,0.35);max-width:780px}
  .pro-tip-label{font-family:'Montserrat',sans-serif;font-weight:600;font-size:11px;color:#C9A84C;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:12px}
  .pro-tip-text{font-family:'Montserrat',sans-serif;font-weight:400;font-size:20px;color:rgba(255,255,255,0.65);line-height:1.7}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_PLAIN_CSS}
</style>
</head>
<body>
  {{#backgroundImage}}<div class="bg-image" style="background-image:url('{{backgroundImage}}')"></div><div class="bg-scrim"></div>{{/backgroundImage}}
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="top-section">
    ${LOGO_LOCKUP_HTML}
  </div>
  <div class="content">
    <div class="step-label">Step {{stepNumber}} of {{totalSteps}}</div>
    <div class="step-title">{{stepTitle}}</div>
    <div class="step-body">{{stepBody}}</div>
    {{#proTip}}
    <div class="pro-tip">
      <div class="pro-tip-label">Pro Tip</div>
      <div class="pro-tip-text">{{proTip}}</div>
    </div>
    {{/proTip}}
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_PLAIN_HTML}
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // DARK-LIST — Numbered tips / listicle
  // ═══════════════════════════════════════════════════════
  "dark-list": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${BG_IMAGE_CSS}
  ${GOLD_RULE_CSS}
  ${LOGO_LOCKUP_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .top-section{position:absolute;top:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;z-index:5;padding-top:20px}
  .content{position:absolute;inset:0;padding:280px 80px 240px;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;text-align:center;z-index:5}
  .eyebrow{font-family:'Montserrat',sans-serif;font-weight:500;font-size:13px;color:#C9A84C;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:36px}
  .title{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{titleFontSize}}px;color:#FFFFFF;line-height:1.2;max-width:880px;margin-bottom:44px}
  .list-items{width:100%;max-width:820px;text-align:left}
  .list-item{display:flex;align-items:baseline;gap:20px;margin-bottom:28px}
  .item-num{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:36px;color:#C9A84C;line-height:1;min-width:36px}
  .item-text{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:28px;color:rgba(255,255,255,0.85);line-height:1.45}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_PLAIN_CSS}
</style>
</head>
<body>
  {{#backgroundImage}}<div class="bg-image" style="background-image:url('{{backgroundImage}}')"></div><div class="bg-scrim"></div>{{/backgroundImage}}
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="top-section">
    ${LOGO_LOCKUP_HTML}
  </div>
  <div class="content">
    {{#eyebrow}}<div class="eyebrow">{{eyebrow}}</div>{{/eyebrow}}
    <div class="title">{{title}}</div>
    <div class="list-items">
      {{#items}}
      <div class="list-item">
        <div class="item-num">{{num}}</div>
        <div class="item-text">{{text}}</div>
      </div>
      {{/items}}
    </div>
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_PLAIN_HTML}
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // WARM-QUOTE — Testimonials, soft tone
  // ═══════════════════════════════════════════════════════
  "warm-quote": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#F5EFE0;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${GOLD_RULE_CSS}
  .gold-rule{background:linear-gradient(90deg,transparent 0%,rgba(161,130,60,0.5) 15%,rgba(161,130,60,0.5) 85%,transparent 100%)}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .content{position:absolute;inset:0;padding:120px 80px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .quote{font-family:'Cormorant Garamond',serif;font-weight:400;font-style:italic;font-size:{{fontSize}}px;color:rgba(13,13,13,0.88);line-height:1.35;max-width:860px;margin-bottom:48px}
  .attribution{font-family:'Montserrat',sans-serif;font-weight:500;font-size:15px;color:rgba(161,130,60,0.9);letter-spacing:0.3em;text-transform:uppercase;margin-bottom:56px}
  .body-text{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:26px;color:rgba(13,13,13,0.65);line-height:1.55;max-width:780px}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  .handle-badge{display:inline-block;font-family:'Montserrat',sans-serif;font-weight:500;font-size:16px;color:#F5EFE0;background:#0D0D0D;padding:12px 32px;letter-spacing:0.06em}
</style>
</head>
<body>
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="content">
    <div class="quote">\u201C{{quoteText}}\u201D</div>
    <div class="attribution">{{attribution}}</div>
    {{#bodyText}}<div class="body-text">{{bodyText}}</div>{{/bodyText}}
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    <div class="handle-badge">@glowdistrictaesthetics</div>
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // WARM-CTA — Soft booking push
  // ═══════════════════════════════════════════════════════
  "warm-cta": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#F5EFE0;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${GOLD_RULE_CSS}
  .gold-rule{background:linear-gradient(90deg,transparent 0%,rgba(161,130,60,0.5) 15%,rgba(161,130,60,0.5) 85%,transparent 100%)}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:240px;left:6%;right:6%;z-index:5}
  .content{position:absolute;inset:0;padding:120px 80px 280px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .eyebrow{font-family:'Montserrat',sans-serif;font-weight:500;font-size:13px;color:rgba(161,130,60,0.9);letter-spacing:0.35em;text-transform:uppercase;margin-bottom:44px}
  .headline{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{headlineFontSize}}px;color:rgba(13,13,13,0.9);line-height:1.18;max-width:880px;margin-bottom:44px}
  .subtext{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:26px;color:rgba(13,13,13,0.6);line-height:1.55;max-width:760px;margin-bottom:56px}
  .cta{display:inline-block;font-family:'Montserrat',sans-serif;font-weight:600;font-size:14px;color:#F5EFE0;background:#0D0D0D;padding:20px 56px;letter-spacing:0.25em;text-transform:uppercase}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:16px;z-index:5}
  .footer-book{font-family:'Montserrat',sans-serif;font-weight:400;font-size:15px;color:rgba(161,130,60,0.8);letter-spacing:0.08em}
  .footer-link{font-family:'Montserrat',sans-serif;font-weight:300;font-size:13px;color:rgba(13,13,13,0.35);letter-spacing:0.1em}
</style>
</head>
<body>
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="content">
    {{#eyebrow}}<div class="eyebrow">{{eyebrow}}</div>{{/eyebrow}}
    <div class="headline">{{headline}}</div>
    {{#subtext}}<div class="subtext">{{subtext}}</div>{{/subtext}}
    <div class="cta">{{ctaText}}</div>
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    <div class="footer-book">Book at Glowdistrictskin.com</div>
    <div class="footer-link">Link in Bio</div>
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // WARM-CAROUSEL — Educational slide, warm palette
  // ═══════════════════════════════════════════════════════
  "warm-carousel": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#F5EFE0;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${GOLD_RULE_CSS}
  .gold-rule{background:linear-gradient(90deg,transparent 0%,rgba(161,130,60,0.5) 15%,rgba(161,130,60,0.5) 85%,transparent 100%)}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .content{position:absolute;inset:0;padding:120px 80px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .slide-indicator{font-family:'Montserrat',sans-serif;font-weight:500;font-size:13px;color:rgba(161,130,60,0.8);letter-spacing:0.4em;text-transform:uppercase;margin-bottom:44px}
  .title{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{titleFontSize}}px;color:rgba(13,13,13,0.9);line-height:1.2;max-width:860px;margin-bottom:48px}
  .body-text{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:26px;color:rgba(13,13,13,0.6);line-height:1.55;max-width:780px}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  .handle-badge{display:inline-block;font-family:'Montserrat',sans-serif;font-weight:500;font-size:16px;color:#F5EFE0;background:#0D0D0D;padding:12px 32px;letter-spacing:0.06em}
</style>
</head>
<body>
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="content">
    <div class="slide-indicator">{{slideNumber}} of {{totalSlides}}</div>
    <div class="title">{{title}}</div>
    <div class="body-text">{{bodyText}}</div>
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    <div class="handle-badge">@glowdistrictaesthetics</div>
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // BOLD-STAT — Data highlight / scroll-stopper
  // ═══════════════════════════════════════════════════════
  "bold-stat": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${GOLD_RULE_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .content{position:absolute;inset:0;padding:120px 72px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .eyebrow{font-family:'Montserrat',sans-serif;font-weight:500;font-size:14px;color:#C9A84C;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:48px}
  .stat-row{display:flex;align-items:baseline;justify-content:center;gap:8px;margin-bottom:24px}
  .stat-number{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:220px;color:#C9A84C;line-height:1;letter-spacing:-0.03em}
  .stat-unit{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:100px;color:rgba(201,168,76,0.7);line-height:1}
  .context{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:32px;color:rgba(255,255,255,0.82);line-height:1.5;max-width:740px;margin-bottom:48px}
  .source{font-family:'Montserrat',sans-serif;font-weight:400;font-size:12px;color:rgba(255,255,255,0.3);letter-spacing:0.3em;text-transform:uppercase}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_CSS}
</style>
</head>
<body>
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="content">
    {{#eyebrow}}<div class="eyebrow">{{eyebrow}}</div>{{/eyebrow}}
    <div class="stat-row">
      <div class="stat-number">{{statNumber}}</div>
      {{#statUnit}}<div class="stat-unit">{{statUnit}}</div>{{/statUnit}}
    </div>
    <div class="context">{{contextText}}</div>
    {{#source}}<div class="source">{{source}}</div>{{/source}}
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_HTML}
  </div>
</body>
</html>
`,

  // ═══════════════════════════════════════════════════════
  // BOLD-QUESTION — Engagement hook / conversation starter
  // ═══════════════════════════════════════════════════════
  "bold-question": `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${FONTS}
  ${RESET}
  body{width:1080px;height:1350px;background:#0D0D0D;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
  ${GRAIN}
  ${BG_IMAGE_CSS}
  ${GOLD_RULE_CSS}
  ${LOGO_LOCKUP_CSS}
  .rule-top{position:absolute;top:60px;left:6%;right:6%;z-index:5}
  .rule-bottom{position:absolute;bottom:200px;left:6%;right:6%;z-index:5}
  .top-section{position:absolute;top:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;z-index:5;padding-top:20px}
  .content{position:absolute;inset:0;padding:280px 72px 240px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:5}
  .eyebrow{font-family:'Montserrat',sans-serif;font-weight:600;font-size:14px;color:#C9A84C;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:48px}
  .question{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:{{questionFontSize}}px;color:#FFFFFF;line-height:1.2;max-width:920px;margin-bottom:52px}
  .teaser{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:28px;color:#C9A84C;line-height:1.55;max-width:780px}
  .footer{position:absolute;bottom:80px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:5}
  ${HANDLE_CSS}
</style>
</head>
<body>
  {{#backgroundImage}}<div class="bg-image" style="background-image:url('{{backgroundImage}}')"></div><div class="bg-scrim"></div>{{/backgroundImage}}
  <div class="rule-top"><div class="gold-rule"></div></div>
  <div class="top-section">
    ${LOGO_LOCKUP_HTML}
  </div>
  <div class="content">
    {{#eyebrow}}<div class="eyebrow">{{eyebrow}}</div>{{/eyebrow}}
    <div class="question">{{question}}</div>
    {{#teaser}}<div class="teaser">{{teaser}}</div>{{/teaser}}
  </div>
  <div class="rule-bottom"><div class="gold-rule"></div></div>
  <div class="footer">
    ${HANDLE_HTML}
  </div>
</body>
</html>
`

};

module.exports = TEMPLATES;
