# Feature And Page Mapping Knowledge

Use this file as uploaded Knowledge for the HoReCa Web Art Work Custom GPT.

## Main Rule

Do not tell a coding agent to remove pages chaotically. First map the researched business
category to template feature/page groups. For every feature group, state whether to keep,
rebrand, prune by item, or remove it, with a short reason.

When removing a feature, tell the coding agent to remove or update connected routes, list/detail
pages, data files, i18n files, SEO keys, navigation links, and references as one group.

Default to preserving and rebranding existing feature/page groups. Whole-feature removal is
reserved for groups that are truly unsupported by the business and are allowed to be removed by
the strict rules below.

## Strict Preservation Rules

Do not tell the coding agent to touch `bootstrap` or `exhibit` unless the user explicitly asks.
Treat them as out of scope for normal business adaptation prompts.

Keep these whole feature groups and rebrand them to the new business:
- `discount`
- `event`
- `product`
- `quest`
- `loyalty`

Do not remove the feature infrastructure, routes, list/detail page structure, data shape, i18n
structure, or SEO structure for those groups. The coding agent may update names, copy, imagery,
categories, CTAs, and business-specific data so they fit the researched business.

Keep these whole editorial/support feature groups, but review their individual entries:
- `article`
- `question`
- `rule`
- `job`
- `profile`

For these groups, tell the coding agent to remove or replace individual records that clearly do
not fit the business, and rebrand useful entries. Example: if the business has no spa, remove or
replace an article such as `why-a-spa-day-is-a-good-idea-after-a-busy-week`, but keep the
articles feature itself.

`room` and `spa` are conditional whole-feature groups:
- remove `room` only when the business has no accommodation, bookable rooms, private rooms, or
  distinct guest spaces
- remove `spa` only when the business has no real spa, wellness, sauna, massage, pool, or
  recovery offer
- keep and rebrand them when the business has the corresponding offer

## Feature Groups

- `company`: core business profile for every site. It drives SEO metadata, structured data,
  contact details, logo, and social identity.
- `dish`: `menu`, `dish/:slug`, dish data, dish category data, dish i18n.
- `product`: `products`, `product/:slug`, product data, product i18n.
- `room`: `rooms`, `room/:slug`, room data, room i18n.
- `spa`: spa page and spa data/i18n.
- `event`: `events`, `event/:slug`, event data, event i18n.
- `discount` / `loyalty`: discounts, discount detail, loyalty, offer data/i18n.
- `article`: articles, article detail, article data/i18n.
- `review`: reviews, review detail, review data/i18n.
- `job` / `profile`: jobs, job detail, team, profile detail, related data/i18n.
- `quest` / `question` / `rule`: activity, FAQ, policy, or venue-rule pages.
- `bootstrap`: out of scope for normal business adaptation; do not touch unless explicitly asked.
- `exhibit`: out of scope for normal business adaptation; do not touch unless explicitly asked.

## Category Defaults

Restaurants, cafes, bars with food, bakeries, catering, delivery food, and hotel restaurants:
- usually keep `dish` / menu pages
- usually keep home, about, gallery, reviews/socials, contact-oriented surfaces
- rebrand events, products, quests, discounts, and loyalty instead of removing their feature groups
- prune/rebrand article, question, rule, job, and profile entries to fit the business
- remove `room` unless the business sells accommodation or distinct bookable/private rooms
- remove `spa` unless the business has a real spa/wellness offer

Hotels and accommodation:
- usually keep `room`
- keep gallery, about, reviews, contact-oriented surfaces
- keep spa only when real
- keep menu/dish only for a real restaurant, breakfast, room service, or food offer
- rebrand events, products, quests, discounts, loyalty, and editorial/support entries to fit hotel
  offers, local experience, hiring, policies, and guest questions

Spa and wellness venues:
- usually keep `spa`
- keep gallery, about, reviews, contact-oriented surfaces
- rebrand products, offers, loyalty, events, articles, questions, and rules around the real services
- remove rooms unless accommodation or rentable rooms are real

Event venues, banquet halls, and catering:
- usually keep `event`
- keep gallery, about, reviews, contacts
- keep menu or products only if offers are concrete
- rebrand discounts, loyalty, products, quests, articles, questions, rules, jobs, and profiles to
  fit event packages, teams, policies, and inquiry flow

Retail food, bakery shop, packaged goods, or purchasable services:
- usually keep `product` or `dish` depending on how items are presented
- keep gallery, about, socials, contacts, offers when real
- rebrand events, discounts, loyalty, quests, and editorial/support entries to fit the shop

Entertainment, quests, activities, FAQ-heavy venues, or venues with strict visitor rules:
- keep and rebrand `quest`, `question`, and `rule` feature groups
- if individual quest/question/rule entries do not fit the business, replace or prune those entries

Articles, jobs, team, and profiles:
- keep the feature groups
- remove or replace individual entries that do not fit the business
- rebrand useful entries around real stories, hiring needs, policies, team, and guest concerns
