# Specification

## Summary
**Goal:** Reveal a long-form love letter and progressively display additional romantic notes after “Yes,” while keeping love notes visible throughout the entire experience.

**Planned changes:**
- Ensure an initial set of love notes is visible on the pre-Yes proposal view.
- Keep love notes visible after clicking/tapping “Yes” (confirmation state should not replace/remove them; they remain readable on mobile).
- Add the provided long-form love letter to centralized content (`frontend/src/content/valentineCopy.ts`) and display it only after “Yes,” preserving paragraphs/line breaks and the exact signature (“Yours, Aditya ❤️”).
- Add a new post-Yes set of short love notes to centralized content and progressively reveal them after “Yes” with gentle fade/float-style animations (no external libraries), ensuring they don’t overlap key content on mobile.
- Update the post-Yes confirmation line to: “I knew it 💕 I love you forever, my baby.” and ensure all user-visible text is in English.

**User-visible outcome:** Before answering, the user sees the proposal and some love notes. After tapping “Yes,” they see the updated confirmation message, the full formatted love letter, and additional small love notes that appear progressively with soft animations—while love notes remain visible and readable throughout, including on mobile.
