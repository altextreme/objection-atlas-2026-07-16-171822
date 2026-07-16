# Nightly app build — Objection Atlas

- **Date:** 2026-07-16 17:27:00 UTC
- **Concept:** Objection Atlas
- **Type:** small utility web app
- **Status:** built locally, verified locally, pushed to GitHub, deployed and verified live on Vercel
- **Username:** `anthony@tackettdesign.com`
- **Password:** `BYU56WL8Anm68yTTQ7uPNjdu`
- **Repo:** https://github.com/altextreme/objection-atlas-2026-07-16-171822
- **Repo HEAD:** `7ec0ef863f2fb2f1448ca335a7f5e6393a09b7aa`
- **App commit at deploy time:** `a1952ff1fed022a0f440ec8682b7b1f4bd939a86`
- **Project dir:** `/home/altextreme/projects/objection-atlas-2026-07-16-171822`
- **Inspect URL:** https://vercel.com/altextremes-projects/objection-atlas-2026-07-16-171822/8jCCWSkEFYuo1bvRhjJvxEbpPHkA
- **Deployment ID:** `dpl_8jCCWSkEFYuo1bvRhjJvxEbpPHkA`
- **Production URL:** https://objection-atlas-2026-07-16-171822.vercel.app/

## What it does
Objection Atlas is a calm single-screen decision utility for tightening a pitch before it goes out into the world. It takes an idea, current claim, audience, maturity, proof type, evidence, and underlying worry, then maps the three strongest objections, suggests safer wording, identifies the missing proof, proposes a tomorrow test, and drafts a short talk track.

## Stitch-first design step
- **Connection test:** `mcp__stitch__list_projects` succeeded.
- **Inspected design brief:** Stitch project `Launch Lens editorial enhancement` exposed a strong “tactile editorial dossier” system with sharp shapes, serif headlines, mono annotations, a paper-toned surface, and an asymmetric reading grid.
- **Strongest cues extracted before concept choice:**
  - **Hierarchy:** one dominant canvas plus a quieter proof rail
  - **Spacing:** large page margins, clear rules, and deliberate section breaks instead of many cards
  - **Typography:** expressive serif headline, neutral sans body, mono micro-labels
  - **Composition:** paper-like single surface, minimal chrome, zero decorative shadows

## Research and concept notes
- Web research reinforced that modern product tools work best when users can complete the task on one screen, with a familiar structure and a single unmistakable action.
- The strongest cue from current pattern research was to favor a single-page workflow with explicit empty-state guidance and direct task completion instead of extra navigation.
- The concept was chosen to be useful for offer-shaping, product framing, and launch preparation without repeating the previous ranking, scoping, or proof-stacking tools.

## Design brief
- **Dominant system:** editorial dossier restraint with one input surface and one compact result rail
- **Hierarchy:** one obvious action — map objections — supported by a limited set of outcome blocks
- **Spacing:** quiet 24px rhythm, rule-based separation, and minimal panel count
- **Typography:** large serif masthead, restrained sans reading text, mono labels for structure
- **Carry-forward rule:** if the claim expands faster than the proof, shrink the claim first

## Local verification
- `npm install` ✅
- `npm run lint` ✅
- `npm run build` ✅
- `npm run start -- --hostname 127.0.0.1 --port 3132` ✅
- Local auth check without credentials → `401 Unauthorized` ✅
- Local auth check with valid credentials returned HTML containing `Objection Atlas`, `Map the doubt before polishing the pitch.`, `Safer wording`, and `Top objections` ✅

## Production verification
- `vercel project add` created project `objection-atlas-2026-07-16-171822` ✅
- `vercel project update --framework nextjs --build-command 'npm run build' --install-command 'npm install'` corrected framework detection before deploy ✅
- `vercel env add` stored `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` for **Production** and **Preview** ✅
- `vercel deploy --prod --yes --logs` produced deployment `dpl_8jCCWSkEFYuo1bvRhjJvxEbpPHkA` and alias `https://objection-atlas-2026-07-16-171822.vercel.app/` ✅
- `vercel inspect https://objection-atlas-2026-07-16-171822.vercel.app` → status `● Ready` ✅
- Anonymous request to production alias returned `401` with `WWW-Authenticate: Basic realm="Objection Atlas"` ✅
- Authenticated request with the nightly credentials returned HTML containing `Objection Atlas`, `Map the doubt before polishing the pitch.`, `Safer wording`, and `Top objections` ✅

## Worth scaling?
Yes. If Anthony likes the framing, Objection Atlas could grow into reusable objection libraries by audience, saved pitch boards, import/export for launch briefs, and companion modes for sales pages, offer pages, or client proposals.