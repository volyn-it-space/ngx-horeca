# Feature Preservation For Business Adaptation

- Status: accepted
- Date: 2026-05-15
- Area: content
- Owners: team
- Related tasks: external Custom GPT prompts for adapting this HoReCa template
- Related files: .ai/content-pages.md, .ai/custom-gpt.md, .ai/custom-gpt/feature-page-map.md
- Supersedes:
- Superseded by:

## Context

The external Custom GPT generates implementation prompts for adapting this Angular HoReCa
template to real businesses. Earlier guidance allowed broad feature removal based on business
category. That can produce prompts that remove useful template structure too aggressively.

The template should preserve most public feature/page groups and rebrand them to the target
business, while only removing content or whole features when the business clearly cannot support
them.

## Decision

During normal business adaptation prompts:

- do not touch `bootstrap` or `exhibit` unless the user explicitly asks
- keep `discount`, `event`, `product`, `quest`, and `loyalty` as feature groups and rebrand them
- keep `article`, `question`, `rule`, `job`, and `profile` as feature groups
- for `article`, `question`, `rule`, `job`, and `profile`, remove or replace individual entries
  that clearly do not fit the business, but preserve the route/list/detail/data/i18n/SEO structure
- remove `room` only when the business has no accommodation, bookable rooms, private rooms, or
  distinct guest spaces
- remove `spa` only when the business has no real spa, wellness, sauna, massage, pool, or
  recovery offer

When any whole feature is removed, remove or update connected routes, page components, data,
i18n, SEO keys, footer links, Navigation page links, and references together.

Protected feature/page groups should remain discoverable from the Navigation page even when they
are not high-priority footer links. If an individual protected entry is pruned, remove links to
that entry without removing the whole feature's list page link.

## Consequences

- generated prompts should be stricter about feature preservation
- most projects should receive rebranded events, offers, products, loyalty, quests, and editorial
  support content rather than losing those sections
- irrelevant individual content can still be pruned, such as a spa article for a business with
  no spa offer
- `room` and `spa` remain the main whole-feature removal candidates because unsupported generic
  rooms or spa pages are misleading

## Alternatives Considered

Removing every feature that is not obviously core to the researched business was rejected
because it weakens the reusable template and removes pages that can often be rebranded into
useful marketing content.
