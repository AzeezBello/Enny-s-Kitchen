# Enny's Kitchen

A mobile-first Nigerian food storefront for Enny's Kitchen, Surulere, Lagos.

## Features

- Responsive Nigerian food storefront
- Real Enny's Kitchen food photography
- Kitchen video section
- Menu category filtering
- Shopping bag / cart
- Quantity controls
- Delivery or pickup selection
- Customer name collection
- Delivery address collection
- Optional order notes
- WhatsApp-first ordering
- Automatic WhatsApp order message generation
- Automatic totals when menu prices are configured
- SEO metadata
- Open Graph / social sharing metadata
- Schema.org structured data
- Instagram integration
- Responsive mobile navigation
- Next.js optimized local images
- Reduced-motion accessibility support

## Menu

Current menu categories include:

- Rice & Beans
  - Cooked Rice
  - Beans
- Sides
  - Fried Plantain
- Soups
  - Egusi Soup
  - Efo Riro
- Swallow
  - Eba
  - Amala
- Protein
  - Chicken Portion

Prices are intentionally configurable because the current price list is not stored in the repository.

## WhatsApp Ordering

Customers build their order and provide:

- Name
- Delivery or pickup
- Delivery address when applicable
- Optional order note

The website generates a WhatsApp message containing the complete order.

## Business Information

Website:

https://www.ennyskitchen.com

Instagram:

https://www.instagram.com/ennyskitchen2/

Location:

33 Nnobi Street, Opposite Ikate Baptist Church, Kilo Bus-Stop,
Surulere, Lagos, Nigeria

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=2348028171608