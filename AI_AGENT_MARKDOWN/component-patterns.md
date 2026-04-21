# component-patterns

## button
### variants
- primary
- secondary
- ghost
- text
- danger
- success

### sizes
- sm
- md
- lg

### padding
- sm: `space.2 space.3`
- md: `space.3 space.4`
- lg: `space.4 space.6`

### states
- default
- hover
- active
- disabled
- loading

### rules
- primary uses `color.base.primary.5`
- hover/active deepen within the same family
- disabled uses neutral tokens and reduced contrast
- radius SHOULD use `radius.md` or `radius.lg`

## input
### variants
- default
- filled
- error
- success
- disabled

### sizes
- sm
- md
- lg

### padding
- horizontal: `space.3` to `space.4`
- vertical: `space.2` to `space.3`

### states
- default
- focus
- error
- disabled
- read-only

### rules
- border uses neutral scale by default
- focus ring SHOULD use brand or info opacity token
- error uses `color.base.negative.5`
- helper text uses body small/base styles

## card
### variants
- default
- elevated
- outlined
- status

### padding
- compact: `space.4`
- default: `space.6`
- spacious: `space.8`

### states
- default
- hover
- selected
- disabled

### rules
- surface uses white or neutral-0
- border uses neutral scale
- shadow uses `shadow.sm` to `shadow.md`
- radius SHOULD use `radius.lg`

## modal
### parts
- overlay
- container
- header
- body
- footer

### rules
- overlay MUST use opacity black tokens
- container SHOULD use `radius.xl`
- internal spacing SHOULD use `space.6` to `space.8`
- title uses heading token
- body uses body token

## badge / tag
### variants
- brand
- success
- warning
- error
- info
- neutral

### rules
- use semantic family fill + readable foreground
- compact spacing only
- radius SHOULD use `radius.round` or `radius.sm`

## table
### parts
- header
- row
- cell
- status cell
- board cell

### rules
- board colors only for table board use cases
- text alignment and spacing must stay consistent row-to-row
- row padding SHOULD map to spacing scale
