const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const TEMPLATES = require("./templates");

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || "gda-visuals";
const PUBLIC_URL = process.env.R2_PUBLIC_URL;

const VALID_TEMPLATES = [
  "dark-quote", "warm-quote",
  "dark-cta", "warm-cta",
  "dark-carousel", "warm-carousel",
  "dark-tutorial",
  "bold-stat",
  "dark-list",
  "bold-question"
];

function autoFontSize(text, baseSize, maxChars) {
  if (!text) return baseSize;
  const len = text.length;
  if (len <= maxChars) return baseSize;
  return Math.round(Math.max(baseSize * 0.55, baseSize * (maxChars / len)));
}

function hydrateTemplate(html, data) {
  html = html.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
    if (!data[key]) return "";
    if (Array.isArray(data[key])) {
      return data[key].map(item => {
        let block = content;
        Object.keys(item).forEach(k => {
          block = block.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), item[k]);
        });
        return block;
      }).join("");
    }
    return content;
  });
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : "";
  });
}

function buildTemplateData(template, data) {
  const defaults = {
    "dark-quote": {
      fontSize: autoFontSize(data.quoteText, 42, 120),
      attribution: "Glow District Aesthetics"
    },
    "warm-quote": {
      fontSize: autoFontSize(data.quoteText, 42, 120),
      attribution: "Glow District Aesthetics"
    },
    "dark-cta": {
      headlineFontSize: autoFontSize(data.headline, 56, 50),
      eyebrow: "Your Skin Deserves Better",
      ctaText: "Book Your Consultation"
    },
    "warm-cta": {
      headlineFontSize: autoFontSize(data.headline, 56, 50),
      eyebrow: "Your Skin Deserves Better",
      ctaText: "Book Your Consultation"
    },
    "dark-carousel": {
      titleFontSize: autoFontSize(data.title, 48, 50),
      bodyFontSize: autoFontSize(data.bodyText, 22, 250),
      slideNumber: "01",
      totalSlides: "05"
    },
    "warm-carousel": {
      titleFontSize: autoFontSize(data.title, 48, 50),
      bodyFontSize: autoFontSize(data.bodyText, 22, 250),
      slideNumber: "01",
      totalSlides: "05"
    },
    "dark-tutorial": {
      titleFontSize: autoFontSize(data.stepTitle, 44, 50),
      bodyFontSize: autoFontSize(data.stepBody, 20, 250),
      stepNumber: "1",
      totalSteps: "5"
    },
    "bold-stat": {
      eyebrow: "Did You Know",
      statNumber: "73%",
      statUnit: "",
      source: ""
    },
    "dark-list": {
      titleFontSize: autoFontSize(data.title, 44, 50),
      eyebrow: "What You Need to Know"
    },
    "bold-question": {
      questionFontSize: autoFontSize(data.question, 52, 60),
      eyebrow: "Let's Talk About It"
    }
  };

  return { ...(defaults[template] || {}), ...data };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "POST only" }) };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const expectedToken = process.env.RENDER_API_KEY;
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { template, data, filename } = body;

  if (!template || !VALID_TEMPLATES.includes(template)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `Invalid template. Valid: ${VALID_TEMPLATES.join(", ")}`,
        available: VALID_TEMPLATES
      })
    };
  }

  if (!data || typeof data !== "object") {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing data object" }) };
  }

  let browser;
  try {
    const htmlSource = TEMPLATES[template];
    if (!htmlSource) {
      return { statusCode: 500, body: JSON.stringify({ error: "Template not found in bundle" }) };
    }
    let html = htmlSource;
    const templateData = buildTemplateData(template, data);
    html = hydrateTemplate(html, templateData);

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1080, height: 1350 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 15000 });
    await page.evaluateHandle("document.fonts.ready");

    const pngBuffer = await page.screenshot({
      type: "png",
      fullPage: false,
      clip: { x: 0, y: 0, width: 1080, height: 1350 },
    });

    await browser.close();
    browser = null;

    const ts = Date.now();
    const hash = crypto.randomBytes(4).toString("hex");
    const key = filename || `${template}/${ts}-${hash}.png`;

    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: pngBuffer,
        ContentType: "image/png",
      })
    );

    const publicUrl = `${PUBLIC_URL}/${key}`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        url: publicUrl,
        key: key,
        template: template,
        rendered_at: new Date().toISOString(),
      }),
    };
  } catch (err) {
    if (browser) await browser.close();
    console.error("Render error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Render failed", message: err.message }),
    };
  }
};
