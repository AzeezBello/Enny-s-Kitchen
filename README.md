# Enny's Kitchen

Mobile-first Nigerian food storefront inspired by the KAF Eatables ordering experience.

## Included
- Hero / brand introduction
- Menu with category filters
- Product cards and quantity controls
- Cart drawer with automatic totals when prices are supplied
- WhatsApp-first order handoff
- Instagram link: https://www.instagram.com/ennyskitchen2/
- Responsive mobile layout
- Local SVG placeholders ready to replace with Enny's real food photos

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the business WhatsApp number in international digits-only format.

## Add real menu photos
Replace the files in `public/images/` while keeping the same filenames, or update the `image` paths in `app/page.tsx`.

## Add prices
Update each product's `price` value in `app/page.tsx`. Prices are intentionally left as `null` because no current Enny's Kitchen price list was supplied or reliably retrieved.
# Enny-s-Kitchen
