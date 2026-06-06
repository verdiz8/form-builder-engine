# Decisions

Architecture choices behind the form builder engine.

---

## 1. Schema-driven, not hardcoded forms

**Options considered:**
- Hardcode a KPI form with specific fields
- Build a configurable form engine

**Chosen: Schema-driven engine.**

A hardcoded KPI form proves I can build one form. A schema-driven engine proves I understand the abstraction: separate the form definition from the rendering layer, and you get a reusable system that works for KPI evaluations, feedback forms, surveys, and anything else without touching component code. This is the same pattern behind Verdex's dynamic KPI module.

---

## 2. One component per field type

**Options considered:**
- Single `FormField` component with a big switch statement
- One component per field type

**Chosen: One component per field type.**

A switch statement grows linearly with field types and makes each type harder to test in isolation. Separate components mean:
- Each field type has its own test surface
- Adding a new type = adding a file, not editing a switch
- Memoisation works naturally at the component boundary

---

## 3. Multi-step with per-section validation gates

**Options considered:**
- Single-page form (scroll through all sections)
- Multi-step wizard with validation at each step

**Chosen: Multi-step with per-section validation gates.**

Real evaluation forms (like the KPI system) have 3+ sections with 4-8 fields each. Scrolling through all of them is overwhelming. Section-by-section with validation gates means:
- Users see manageable chunks
- Required fields are validated before moving on
- Progress is visible (step indicator)
- Partial data is preserved when going back

---

## 4. JSON editor as the configuration interface

**Options considered:**
- Visual drag-and-drop builder
- Form-based schema editor
- Raw JSON editor

**Chosen: Raw JSON editor with live preview.**

A visual builder is a full product in itself — week of work, not a weekend. A form-based editor hides the schema structure. The raw JSON editor:
- Shows the schema format directly (the thing being demonstrated)
- Gives instant feedback (valid/invalid)
- Has zero abstraction between the config and the rendered form
- Can be replaced with a visual builder later without changing the rendering engine

---

## 5. Weighted scoring as a separate module

**Options considered:**
- Scoring logic inside FormRenderer
- Separate scoring library

**Chosen: Separate `lib/scoring.ts`.**

Scoring is a distinct concern from form rendering. Separating it means:
- The scoring engine can be tested independently with pure functions
- Forms without scoring don't pay the bundle cost (tree-shakeable in theory)
- The scoring algorithm maps directly to the real KPI use case (weight × percentage contribution)

---

## 6. Playwright over Jest for tests

**Options considered:**
- Jest + React Testing Library for component tests
- Playwright for E2E only

**Chosen: Playwright E2E as the primary test layer.**

This is a demo where user-visible behavior matters most. Playwright tests validate what a recruiter would actually see: the form renders, conditional fields work, scores calculate correctly. Component-level tests would add maintenance burden without adding signal for a demo of this size. The tests also prove CI integration.

---

## 7. Two built-in presets: KPI + Feedback

**Options considered:**
- One preset
- Multiple presets

**Chosen: Two presets showing the range.**

The KPI preset demonstrates the full feature set: 3 sections, weighted scoring, 6 field types, conditional logic. The Feedback preset shows the engine handles simple use cases too — one section, no scoring, lightweight. Together they prove the engine is genuinely configurable, not just a KPI form in disguise.

---

## What I'd add at scale

- Drag-and-drop form builder UI (replace JSON editor)
- Form versioning and submission history
- Export to CSV/PDF
- Role-based form visibility
- Multi-language field labels
- Real-time collaboration (multiple evaluators on the same form)
