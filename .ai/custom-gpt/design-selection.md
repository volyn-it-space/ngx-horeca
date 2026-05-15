# Design Selection Knowledge

Use this file as uploaded Knowledge for the HoReCa Web Art Work Custom GPT.

## Default Design Catalog

If the user does not provide a design link, use this catalog as the default source for
choosing a visual direction:

`https://design.itkamianets.com/assets/design/index.md`

The catalog is a selector, not the final design brief. Read the catalog, choose one primary
design direction based on the researched business type and market position, then read the
selected design's detailed markdown brief from the same origin.

Examples:
- `https://design.itkamianets.com/assets/design/boutique-hotel.md`
- `https://design.itkamianets.com/assets/design/cozy-family.md`

## User-Provided Design Links

If the user provides a direct design brief link, read that brief and use it as the selected
design direction.

If the user provides a design catalog or index link, read the index first, choose one primary
design direction, then read the selected design's detailed brief.

Do not merge several directions unless the user explicitly asks for a hybrid. A single clear
direction usually produces a stronger implementation prompt.

## Selection Rules

Choose the design after researching the business enough to understand:
- real business type
- market position
- audience
- atmosphere and service model
- whether the site primarily sells meals, rooms, events, wellness, products, or local hospitality

Use the design catalog's own recommendations when available. For example:
- boutique hotel, city stay, guesthouse: usually `boutique-hotel`
- wellness hotel, spa, retreat, resort: usually `resort-spa`
- family restaurant, casual cafe, guest house: usually `cozy-family`
- bakery, coffee, pastry, brunch: usually `cafe-bakery`
- weddings, banquets, conferences: usually `event-banquet`
- national cuisine, heritage, local tradition: usually `traditional-local`
- rural inn, countryside stay, farm-to-table: usually `rustic-farmhouse`
- chef-led premium restaurant: usually `fine-dining`
- formal traditional premium venue: usually `classic-elegant`
- design-led restrained hospitality brand: usually `modern-minimal`
- exclusive lounge or luxury nightlife venue: usually `luxury-dark`

## Prompt Requirements

The final coding-agent prompt must include:
- selected design name or slug
- design source link
- short reason the design was selected
- visual direction from the detailed brief
- suggested sections from the detailed brief, adapted to the actual business
- content rules and avoid rules from the detailed brief

The design brief is design direction only. It must not override:
- confirmed researched business facts
- feature/page mapping decisions
- navigation and footer rules
- SEO, company data, domain, or `CNAME` rules
- Angular, Tailwind, prerender, asset path, or i18n constraints

Do not tell the coding agent to recreate a demo page exactly. Tell it to adapt the selected
design direction to the existing Angular HoReCa template and the researched business.
