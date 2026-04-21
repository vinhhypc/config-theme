# ai-rules

## mandatory
- MUST use tokens from `design-tokens.md`
- MUST use typography tokens exactly
- MUST use spacing tokens exactly
- MUST use provided base64 logos directly
- MUST NOT reference external image URLs
- MUST reuse documented component patterns
- MUST keep semantic color families intact
- MUST use opacity tokens for overlays and emphasis layers
- MUST keep heading at 120% line-height and body at 140%

## prohibited
- MUST NOT hardcode random hex values
- MUST NOT invent missing tokens
- MUST NOT use inline styles outside the token system
- MUST NOT use arbitrary spacing values
- MUST NOT replace provided logos with text placeholders
- MUST NOT fetch brand assets from CDN or third-party URLs
- MUST NOT mix unrelated semantic colors for status feedback

## anti-patterns
- Using `#F7941D` directly instead of `color.base.primary.5`
- Using custom `border-radius: 10px` if no token maps to it
- Using text styles without matching heading/body token
- Using image URLs instead of embedded base64 assets
- Creating duplicate button variants with slightly different paddings
- Using board colors outside table/board scenarios
