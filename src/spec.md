# Specification

## Summary
**Goal:** Update the page’s HTML head metadata so the browser title and Open Graph preview match the provided screenshot guidance.

**Planned changes:**
- Change `frontend/index.html` `<title>` to exactly `For You ❤️` and remove the existing long title text.
- Add Open Graph meta tags in `frontend/index.html` for `og:title`, `og:description`, and `og:type` with the specified values.

**User-visible outcome:** The page shows the new tab/title text “For You ❤️”, and shared links generate an Open Graph preview using the new title, description, and type.
