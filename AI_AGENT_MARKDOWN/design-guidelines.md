# design-guidelines

## color usage

- Brand/default actions MUST use `color.base.primary.5`.
- Primary hover/active MUST move deeper in the same scale: `primary.6` to `primary.8`.
- Neutral text MUST use neutral scale only.
- Success, warning, error, info states MUST use their semantic families only.
- Table board colors MUST be used only for table/board visualization.
- White and black opacity tokens MUST be used for overlays, scrims, and inverse surfaces.
- Do not mix `other.*` and `board.*` into core UI actions unless a feature explicitly requires categorical color coding.

## typography hierarchy

- Headings MUST use `font.heading.h1` to `font.heading.h10`.
- Long-form body copy MUST use body styles only, not heading tokens.
- Default body text SHOULD use `font.body.base.regular`.
- Emphasis in body copy SHOULD use `font.body.*.medium` or `font.body.*.bold`, not larger size.
- Heading line-height is fixed at `120%`.
- Body line-height is fixed at `140%`.

## spacing rules

- All internal spacing MUST use the spacing scale in `space.*`.
- MUST 4px-based increments.
- Use `space.4` or `space.6` for compact component padding.
- Use `space.6`, `space.8`, `space.10`, `space.12` for section spacing.
- Avoid arbitrary one-off spacing values.

## layout rules

- Use generous section spacing for dashboards and marketing surfaces.
- Keep content aligned to a single spacing rhythm.
- Cards, panels, modals, and inputs SHOULD use consistent radius tiers.
- Maintain strong contrast between content and surface.
- Use semantic colors for status communication, not decorative substitution.
