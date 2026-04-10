# GDA Render Engine v1.1

Serverless visual rendering engine for Glow District Aesthetics.
HTML/CSS → PNG via Puppeteer → Cloudflare R2 → public URL.

Phase 1 of TheWzrd visual system.

## API

**POST** `/.netlify/functions/render`

### Headers
- `Content-Type: application/json`
- `Authorization: Bearer <RENDER_API_KEY>`

### Request Body
```json
{
  "template": "dark-quote",
  "data": {
    "quoteText": "Your skin tells a story. Let's make sure it's one you're proud of.",
    "attribution": "Brenda Aguirre, L.E."
  }
}
```

### Response
```json
{
  "success": true,
  "url": "https://pub-xxxx.r2.dev/dark-quote/1712345678-a1b2c3d4.png",
  "key": "dark-quote/1712345678-a1b2c3d4.png",
  "template": "dark-quote",
  "rendered_at": "2026-04-10T12:00:00.000Z"
}
```

## Templates (10)

### Dark Mood (editorial authority)
| Template | Purpose | Required Fields | Optional |
|----------|---------|----------------|----------|
| `dark-quote` | Quote/insight | `quoteText` | `attribution`, `fontSize` |
| `dark-cta` | Call to action | `headline` | `eyebrow`, `subtext`, `ctaText`, `headlineFontSize` |
| `dark-carousel` | Carousel slide | `title`, `bodyText` | `slideNumber`, `totalSlides`, `titleFontSize`, `bodyFontSize` |
| `dark-tutorial` | Step-by-step | `stepTitle`, `stepBody`, `stepNumber` | `totalSteps`, `proTip`, `titleFontSize`, `bodyFontSize` |
| `dark-list` | Numbered tips | `title`, `items[]` | `eyebrow`, `titleFontSize` |

### Warm Mood (approachable, inviting)
| Template | Purpose | Required Fields | Optional |
|----------|---------|----------------|----------|
| `warm-quote` | Quote/testimonial | `quoteText` | `attribution`, `fontSize` |
| `warm-cta` | Soft booking CTA | `headline` | `eyebrow`, `subtext`, `ctaText`, `headlineFontSize` |
| `warm-carousel` | Educational slide | `title`, `bodyText` | `slideNumber`, `totalSlides`, `titleFontSize`, `bodyFontSize` |

### Bold Mood (scroll-stoppers)
| Template | Purpose | Required Fields | Optional |
|----------|---------|----------------|----------|
| `bold-stat` | Data/stat highlight | `statNumber`, `contextText` | `eyebrow`, `statUnit`, `source` |
| `bold-question` | Engagement hook | `question` | `eyebrow`, `teaser`, `questionFontSize` |

### List items format (dark-list)
```json
{
  "template": "dark-list",
  "data": {
    "title": "5 Things Your Esthetician Wishes You Knew",
    "eyebrow": "Skin Science",
    "items": [
      { "num": "1", "text": "SPF isn't optional — it's the foundation of every protocol." },
      { "num": "2", "text": "Your skin barrier needs repair before active treatments begin." }
    ]
  }
}
```

## Environment Variables (Netlify)

| Variable | Description |
|----------|-------------|
| `R2_ENDPOINT` | `https://ACCOUNT_ID.r2.cloudflarestorage.com` |
| `R2_ACCESS_KEY_ID` | R2 API token Access Key ID |
| `R2_SECRET_ACCESS_KEY` | R2 API token Secret Access Key |
| `R2_BUCKET_NAME` | `gda-visuals` |
| `R2_PUBLIC_URL` | `https://pub-xxxx.r2.dev` |
| `RENDER_API_KEY` | Bearer token for API auth |

## Design System

- Dark bg: #0D0D0D | Cream bg: #F5EFE0
- Gold accent: #C9A84C
- Headlines: Cormorant Garamond 300/400
- Body: Montserrat 200/300/400
- Canvas: 1080x1350px (Instagram portrait)
- Film grain overlay on all templates
- Asymmetric left-aligned composition
- GDA monogram at 25% opacity

## Roadmap

- Phase 1: Static PNG rendering (this engine) ✅
- Phase 2: AI image generation (Flux) + branded overlay compositing
- Phase 3: Animated posts via Remotion (MP4 from React)
- Phase 4: AI video generation (self-hosted)
- Phase 5: AI avatar evaluation
