# Enny's Kitchen

A mobile-first, multi-page storefront for Enny's Kitchen, a home-style Nigerian kitchen in Surulere, Lagos. Customers browse the menu, build an order bag and send it as a ready-made WhatsApp message.

Built with Next.js 16 (App Router), React 19 and TypeScript. Ships as a small Docker image.

## Pages

| Route           | What it does                                                                 |
| --------------- | ---------------------------------------------------------------------------- |
| `/`             | Hero, favourites you can add to the bag, categories, kitchen teaser, how to order |
| `/menu`         | Full menu with category filters, search and `?category=` deep links           |
| `/about`        | The story, values, photo gallery and kitchen videos                           |
| `/how-to-order` | Four steps, delivery vs pickup, FAQs                                          |
| `/contact`      | WhatsApp, phone, map link, Instagram and one-tap message templates            |

The order bag lives in the root layout, so it follows the customer across pages and is saved in the browser between visits.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build       # production build (standalone output)
npm run start       # serve the production build
npm run typecheck   # generate route types, then tsc --noEmit
```

## Run with Docker

The Dockerfile is a three-stage build that uses Next.js `output: 'standalone'`, so the final image contains only the compiled server, its traced dependencies and static assets. It runs as a non-root user and has a health check.

```bash
# build and start in the background
docker compose up -d --build

# follow logs
docker compose logs -f web

# stop
docker compose down
```

The site is served on http://localhost:3000. If that port is busy, set `HOST_PORT`:

```bash
HOST_PORT=8080 docker compose up -d --build
```

Without Compose:

```bash
docker build -t ennys-kitchen .
docker run --rm -p 3000:3000 ennys-kitchen
```

## Configuration

Copy `.env.example` to `.env` (Compose reads it automatically) or `.env.local` (for `npm run dev`).

| Variable                      | Purpose                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional override for the WhatsApp number, digits only. Inlined at build time, so it is passed to Docker as a build argument. |
| `HOST_PORT`                   | Host port published by Compose. Defaults to `3000`.                                           |

Business details (name, address, phone, Instagram) live in `lib/site.ts`. Menu items, categories and prices live in `lib/menu.ts`. A `price` of `null` shows "Price on request".

## Project structure

```
app/                 routes, layout, metadata, sitemap, robots, icons
components/          header, footer, dish card, menu explorer, page hero, CTA band
components/cart/     cart provider (localStorage), drawer, floating button, toast
lib/site.ts          business facts and schema.org helpers
lib/menu.ts          menu data
public/images        food photography and logo
public/videos        kitchen videos
Dockerfile           multi-stage production image
compose.yaml         one-service Compose file
```

## Business information

- Website: https://www.ennyskitchen.com
- Instagram: https://www.instagram.com/ennyskitchen2/
- Location: 33 Nnobi Street, Opposite Ikate Baptist Church, Kilo Bus-Stop, Surulere, Lagos, Nigeria
