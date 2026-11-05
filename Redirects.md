# Homepage routes

## 1 November 2026 - dark homepage default

Harry requested the matching dark variant as the actual homepage.

| Route | Current purpose |
| --- | --- |
| `/` and `/index.html` | Default matching dark homepage |
| `/home-v2.html` | Retained matching dark option, identical content to index |
| `/home-white.html` | Preserved white homepage alternative |
| `/home-v2-alt.html` | Retained earlier dark exploration, unchanged route |

No HTTP redirects were added. Existing gate and noindex remain on every route. Changes are on the draft PR only; main is unchanged.

## 1 November 2026 - Step & Pay screen option

Harry clarified that 34-inch is a larger-screen Step & Pay configuration. `/step-pay.html` is the local product page for both configurations. Existing Step & Pay links now use this route. No standalone 34-inch product route exists and no HTTP redirect was added. Existing gate/noindex remain.

## 1 November 2026 - full-site continuation

Harry requested redesign of the entire current site, including About, projects, products, systems, integrations and articles. All 52 captured source routes now have local preview pages. `content/route-coverage.json` is the complete route/file map.

`/products/express-pay/` aliases the approved `/express-pay.html`; `/products/step-and-pay/` aliases `/step-pay.html`. The server supports extensionless directory URLs with or without a trailing slash. No HTTP redirects were added. Source system-menu anchors now open the corresponding paid-parking, two-way and one-way pages. The menu groups, five-family products and icon treatment remain.

`/success/newsletter/` is an informational updates page in this unconnected preview, not a successful-subscription confirmation. `/products/info-board/` remains a legacy information-display enquiry page and is not the 34-inch Step & Pay option.

Every page remains gated and noindex. Main/production are unchanged. Responsive and browser checks remain unverified; the existing independent review cap is exhausted.
