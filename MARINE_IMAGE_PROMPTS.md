# Missing Marine Images - Creation Prompts

## Page: morskie-pokrytiya.html (Морские покрытия)

### Current Status
- **Fixed:** Image extension for `marine-coating.jpg` → `marine-coating.jpeg` ✓
- **Issue:** `shipbuilding-slider.jpeg` is used twice in slider (needs unique replacement)
- **Issue:** `marine-coating.jpeg` may not be best match for "Портовые сооружения"

---

### Image Prompt 1: Port Facilities Image
**Purpose:** Replace `marine-coating.jpeg` for better visual match
**Used in:**
- Line 169: "Портовые сооружения" thumbnail
- Line 240: Article section image

**Prompt:**
"Professional high-quality photograph of a modern commercial port or harbor facility. Show large container cranes loading/unloading ships, cargo vessels docked at berths, port infrastructure including warehouses, loading equipment, and metal structures. The image should clearly show port facilities and harbor infrastructure with protective marine coatings visible on structures. Bright daylight, industrial photography style, suitable for marine coating product marketing. Focus on port terminals, shipping infrastructure, harbor operations. Horizontal orientation, web-optimized quality, 1350x900px recommended."

**Suggested filename:** `port-facilities-thumb.jpeg` (for thumbnail) or `port-facilities-slider.jpeg` (if using in slider)

---

### Image Prompt 2: Unique Marine Slider Image
**Purpose:** Replace duplicate `shipbuilding-slider.jpeg` on slide 2 right
**Current:** `shipbuilding-slider.jpeg` used on both slide 1 right AND slide 2 right (duplicate)

**Prompt:**
"Professional high-quality photograph of marine infrastructure suitable for slider display. Options include: large ship in drydock being painted/coated, underwater marine structures (piers, supports), marine vessels at dock with visible coatings, large offshore structures, or coastal marine construction projects. The image should showcase marine protective coatings and be visually distinct from shipbuilding/ship construction scenes. Bright daylight, professional photography, suitable for marine coating product showcase. Horizontal orientation (3:2 ratio), web-optimized, 1350x900px recommended."

**Suggested filename:** `marine-infrastructure-slider.jpeg` or `marine-vessel-slider.jpeg` or `marine-dock-slider.jpeg`

---

## Current Slider Configuration:

**Slide 1:**
- Left: `marine-protection-slider.jpeg` ✓
- Right: `shipbuilding-slider.jpeg` ✓

**Slide 2:**
- Left: `offshore-slider.jpeg` ✓
- Right: `shipbuilding-slider.jpeg` ⚠ **DUPLICATE** - needs unique image

---

## Summary

**Total prompts needed: 2 images**

1. **Port facilities image** - Better match for "Портовые сооружения" (replaces `marine-coating.jpeg`)
2. **Unique marine slider image** - Replaces duplicate `shipbuilding-slider.jpeg` on slide 2 right

Both images exist but need better matching alternatives for optimal visual display.
