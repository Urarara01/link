```markdown
# Design System Document: The Ethereal Productivity Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Midnight Architect"**

This design system rejects the "flat and boxy" status quo of traditional productivity tools. Instead of a rigid grid of outlines, we embrace **Atmospheric Density**. The interface should feel like a high-end instrument—a precision tool that exists within a deep, three-dimensional space. 

By leveraging **Layered Depth** and **Vibrant Accents**, we break the "template" look. We prioritize intentional asymmetry; for instance, using wide gutters on one side of a container and tight information clusters on the other to guide the eye. Overlapping elements and glassmorphism create a sense of digital "fine paper" floating in a void, ensuring that even high-density data feels breathable and curated rather than cluttered.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Pure Dark" foundation, using purples not just as colors, but as sources of light.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning content. Boundaries must be defined through:
1.  **Background Color Shifts:** Placing a `surface_container_low` card against a `surface` background.
2.  **Tonal Transitions:** Using soft gradients to suggest where one zone ends and another begins.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack. The deeper the element is in the workflow, the "lower" its surface token:
*   **Base Layer:** `background` (#0e0e0e) – The infinite void.
*   **Primary Workspaces:** `surface_container` (#1a1a1a) – Large layout blocks.
*   **Interactive Cards:** `surface_container_high` (#20201f) – Floating units.
*   **Popovers/Modals:** `surface_bright` (#2c2c2c) – Elements closest to the user.

### The "Glass & Gradient" Rule
To achieve a premium feel, use **Glassmorphism** for all floating panels. Apply `surface_variant` at 60% opacity with a `20px` backdrop blur. 
*   **Signature Textures:** Primary CTAs should not be flat. Use a linear gradient from `primary_dim` (#9c42f4) to `primary` (#ca98ff) at a 135° angle to give buttons a "lit from within" soul.

---

## 3. Typography: The Editorial Scale
We use **Inter** as a precision typeface. The hierarchy is designed to feel like a high-end technical journal.

*   **Display (lg/md/sm):** Used for "Big Moments"—daily goals or focus timers. Tracking should be set to `-0.02em` to feel tighter and more intentional.
*   **Headline & Title:** Use `headline-sm` for section headers. These should always be `on_surface` (White) to provide high-contrast anchors in the dark UI.
*   **Body (lg/md/sm):** Use `body-md` for primary task descriptions. For secondary metadata, use `on_surface_variant` (#adaaaa) to reduce visual noise.
*   **Label (md/sm):** Reserved for "Click to Copy" indicators and micro-tags. These are often rendered in `primary` (#ca98ff) to signal interactivity.

---

## 4. Elevation & Depth
In this system, elevation is an optical illusion created by light, not structure.

*   **The Layering Principle:** Stack `surface_container_lowest` (#000000) inside a `surface_container_high` (#20201f) to create a "recessed" input field effect.
*   **Ambient Shadows:** For floating elements, use a shadow with a `32px` blur, 0px offset, and 8% opacity. The shadow color should be tinted with `primary` (#8523dd) to simulate light refracting through purple glass.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline_variant` at **15% opacity**. It should be felt, not seen.
*   **Interaction States:** When a user hovers over a card, transition the background from `surface_container_high` to `surface_bright` and increase the backdrop-blur by 10%.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary_dim` to `primary`), `xl` (0.75rem) rounded corners. Text is `on_primary` (Deep Purple).
*   **Secondary/Ghost:** No background. Text in `primary`. On hover, apply a `surface_variant` background at 30% opacity.

### Interactive "Click to Copy" Elements
*   **Visual Indicator:** Use a `label-sm` tag with a subtle `surface_container_highest` background. Upon hover, the text shifts to `secondary` (#b390fe) with a "Copy" icon fading in at 50% opacity.
*   **Feedback:** On click, a brief "Pulse" animation using the `surface_tint` (#ca98ff) should ripple from the cursor.

### Cards & Lists
*   **Constraint:** Zero divider lines. 
*   **Separation:** Use `8px` of vertical whitespace between list items. If items need distinct grouping, use a subtle shift from `surface_container_low` to `surface_container`.
*   **Density:** For productivity views, use `body-sm` for list items to maximize data on screen, but maintain a `1.5` line-height for readability.

### Contextual Inputs
*   **Text Fields:** Use `surface_container_lowest` (Pure Black) for the input well to create a "hole" in the `surface_container` UI. The cursor and active focus state must use `primary`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `primary_fixed_dim` for active states in navbars to provide a soft glow.
*   **Do** embrace negative space. High density doesn't mean lack of margins; it means efficient use of the typography scale.
*   **Do** use asymmetrical layouts (e.g., a left-aligned headline with a right-aligned action chip) to break the "web-template" feel.

### Don’t:
*   **Don’t** use pure white (#FFFFFF) for long-form body text; use `on_surface_variant` (#adaaaa) to prevent eye strain in dark mode.
*   **Don’t** use a shadow on a button that is already a bright purple; the color provides the prominence.
*   **Don’t** use `DEFAULT` (0.25rem) rounding for large containers; use `xl` (0.75rem) to maintain the "soft-modern" aesthetic. `DEFAULT` is reserved for small chips and checkboxes.

---

## 7. Signature Interaction: The Purple Pulse
Every primary action in the system should feel "electric." When a task is completed or a button is pressed, use a subtle `0.4s` ease-out transition where the element's `primary` accent glows slightly (increase `surface_tint` intensity) before settling. This reinforces the "Modern Productivity" theme through tactile, high-end feedback.```