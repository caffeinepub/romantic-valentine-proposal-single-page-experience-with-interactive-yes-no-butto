# Specification

## Summary
**Goal:** Update the No modal copy and swap the angry cat image for a cute angry panda.

**Planned changes:**
- Remove the line “That cat is giving you the side-eye right now...” from the `LastChanceNoModal` description with no leftover blank spacing.
- Replace the No modal image asset to use a new panda image under `/assets/generated/` instead of the current cat image.
- Update the image alt text and any other user-facing references in the No modal to refer to a panda (not a cat), keeping layout and button behavior unchanged.

**User-visible outcome:** Opening the No modal no longer shows the removed cat line and displays a cute angry panda image with panda-appropriate text.
