---
name: Verix Civic Verification System
colors:
  surface: '#f8faf9'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f3'
  surface-container: '#eceeed'
  surface-container-high: '#e6e9e8'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#3e4a3f'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#eff1f0'
  outline: '#6e7a6e'
  outline-variant: '#bdcabc'
  surface-tint: '#006d37'
  primary: '#006a36'
  on-primary: '#ffffff'
  primary-container: '#008646'
  on-primary-container: '#f6fff4'
  inverse-primary: '#70dc91'
  secondary: '#02629e'
  on-secondary: '#ffffff'
  secondary-container: '#7cbeff'
  on-secondary-container: '#004c7c'
  tertiary: '#495e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#62778e'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8cf9ab'
  primary-fixed-dim: '#70dc91'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#9acbff'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#004a78'
  tertiary-fixed: '#cfe5ff'
  tertiary-fixed-dim: '#b3c9e3'
  on-tertiary-fixed: '#051d30'
  on-tertiary-fixed-variant: '#34495e'
  background: '#f8faf9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for "Verix," an AI-powered platform dedicated to impact verification. The brand personality is rooted in institutional credibility, transparency, and civic duty. It balances the high-tech nature of AI with the grounded, reliable presence of an environmental or governmental body.

The visual style is **Corporate / Modern** with a lean toward **Minimalism**. It prioritizes clarity over decoration, using a flat design language to minimize visual noise. The goal is to evoke a sense of "objective truth" through structured layouts, intentional whitespace, and a high-contrast color palette that guides users through complex verification data.

## Colors
The color palette is functionally driven, mapping specific hues to levels of verification and trust. 

- **Primary (Forest Green):** Represents nature, growth, and the core "Verified" state.
- **Deep Navy:** Used for headers and primary navigation to provide a solid, authoritative anchor.
- **Ocean Blue:** Reserved for interactive links and secondary actions.
- **Backgrounds:** A pure white base is paired with soft gray surfaces to create subtle hierarchical depth without using shadows.
- **Verification Tiers:** A semantic scale (Gold, Green, Yellow, Red) is used to immediately communicate the "Impact Score" or verification status of a project.

## Typography
This design system utilizes **Inter** exclusively to ensure a systematic, utilitarian aesthetic that remains highly legible across all data densities.

- **Headlines:** Use Bold and Semi-Bold weights in Deep Navy (#13293D) to establish a clear information hierarchy.
- **Body Text:** Standardized at 16px for optimal readability. 
- **Labels:** Small caps and increased letter spacing are used for metadata and category labels to distinguish them from actionable text.
- **Contrast:** High contrast between headers and body copy is essential for maintaining a civic, authoritative tone.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain a structured, report-like appearance. On smaller screens, the system transitions to a fluid model.

- **Grid:** A 12-column grid is used for desktop (1280px max-width), while a 4-column grid is used for mobile.
- **Rhythm:** An 8px spatial scale governs all padding and margins (e.g., 8, 16, 24, 32, 48, 64).
- **Reflow:** Complex data tables and "Before/After" side-by-side containers must stack vertically on mobile breakpoints (< 768px).

## Elevation & Depth
In alignment with the "flat and credible" requirement, this design system eschews heavy drop shadows. Depth is communicated through **Tonal Layers** and **Low-contrast Outlines**.

- **Surfaces:** Use the "Soft Gray" (#F4F6F5) for secondary containers and cards.
- **Borders:** Elements are defined by 1px solid borders in a slightly darker gray (#E0E0E0) rather than shadows.
- **Active State:** Elements may use a subtle 2px inner-border of the Primary Green to indicate focus or selection, reinforcing the tactile but flat aesthetic.

## Shapes
The shape language is "Soft" yet structured. 

- **Corner Radius:** A consistent 12px (0.75rem) radius is applied to cards, input fields, and primary containers to soften the technical nature of the data.
- **Verification Badges:** Use a fully rounded (pill-shaped) radius to distinguish them as distinct status markers within the UI.

## Components
Consistent styling across the verification ecosystem:

- **Verification Badges:** Small pill-shaped tags. The background should be a 10% opacity version of the tier color, with a 1px solid border and text in the full-saturation tier color. Each badge must include a status icon (e.g., checkmark for Green, shield for Gold).
- **Impact Cards:** Use a white background, 12px rounded corners, and a 1px soft gray border. Use "Soft Gray" (#F4F6F5) for the card header or footer to create internal structure.
- **Before/After Containers:** A specialized component for showing impact. Two identical containers placed side-by-side with a "Comparison" label. On mobile, these stack with the "Before" state always on top.
- **Buttons:** 
  - *Primary:* Solid Forest Green (#219653) with white text. 
  - *Secondary:* Ghost style with Ocean Blue (#1B6CA8) borders and text.
- **Input Fields:** 12px rounded corners, white background, with a 1px gray border that transitions to Primary Green on focus.
- **Data Lists:** Clean, border-bottom separated rows with no alternating zebra stripes, maintaining a professional, white-paper aesthetic.