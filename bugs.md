# Browser-Based QA Bug Report

This report outlines bugs discovered during live browser interaction and code inspection.

## 1. Navbar
**Bug 1.1: Home Link Indicator Inconsistency**  
*   **Status:** [✓] Fixed  
*   **Fix:** Added `data-nav-id="home"` to the logo and updated `updateIndicator` logic to correctly handle the 'home' state by hiding the pill when the logo is the active section (maintaining design intent of the center links being the primary "pill" navigators).

**Bug 1.2: Z-Index Conflict with Mobile Menu**  
*   **Status:** [✓] Fixed  
*   **Fix:** Increased Mobile Menu z-index to `z-[110]` to ensure it always layers over the Navbar and other fixed elements.

## 2. Hero Section
**Bug 2.1: Scroll Indicator Overlap**  
*   **Status:** [✓] Fixed  
*   **Fix:** Added responsive visibility to the scroll indicator (`hidden min-[800px]:block`), preventing overlap with the Search Widget on short viewports.

**Bug 2.2: Sticker Drag Bounds**  
*   **Status:** [✓] Fixed  
*   **Fix:** Added `dragConstraints={containerRef}` to all stickers and lowered their interaction z-index (`zIndex: 40` while dragging) to stay below the Navbar.

## 3. Interaction & Logic
**Bug 3.1: Mobile Sticky CTA active on Hero**  
*   **Status:** [✓] Fixed  
*   **Fix:** Increased ScrollTrigger threshold to `120vh top` to ensure the sticky CTA only appears once the Hero section (and its own CTA) is fully cleared.

**Bug 3.2: Post-it CTA Scroll Logic**  
*   **Status:** [✓] Fixed  
*   **Fix:** Increased scroll threshold to `65%` to ensure the Post-it appears after the primary services content has been consumed.

## 4. Footer
**Bug 4.1: Broken Internal Links**  
*   **Status:** [✓] Fixed  
*   **Fix:** Redirected non-existent legal and journey links to `#` to prevent 404s and improved interactivity by adding `onClick` handlers for Mail and Phone links.

**Bug 4.2: Plane Animation Reset**  
*   **Status:** [✓] Fixed  
*   **Fix:** Verified `overwrite: true` in GSAP and added `power2.inOut` for smoother transitions during rapid interaction.
