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
