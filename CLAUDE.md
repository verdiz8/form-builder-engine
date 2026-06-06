# CLAUDE.md — form-builder-engine

Schema-driven form builder demo. Paste a JSON config and get a fully functional multi-section form with conditional logic, validation, and weighted scoring. Built for the SDET portfolio at [verdigris.site](https://verdigris.site) / [github.com/verdiz8](https://github.com/verdiz8).

## What this proves

- Schema-driven rendering (JSON → fully functional form, zero hardcoded inputs)
- Advanced state management (multi-step, conditional fields, cross-field validation)
- Mobile-first design (responsive field layouts, touch-friendly)
- Accessibility (keyboard nav, ARIA labels, focus management)
- Performance (memoised field renderers, lazy sections)
- Production patterns (submission state, error recovery, unsaved-change warnings)

## Why a form builder

Every recruiter has wrestled with forms. This demo shows you understand the hard parts: schema-driven rendering, conditional logic, state at scale, accessibility, mobile UX. It also maps directly to your KPI evaluation work — this isn't a toy, it's the reusable engine behind real production modules.

## Commands

```bash
npm install
npm run dev           # Start on port 7200
npm run build         # Production build
npm test              # Playwright E2E tests
npm run test:ui       # Playwright interactive mode
```

## Architecture

```
src/
  app/
    page.tsx              ← Playground: paste JSON, render form
  components/
    fields/               ← One component per field type
      text.tsx
      number.tsx
      select.tsx
      date.tsx
      file-upload.tsx
      rating.tsx
    layout/
      form-section.tsx    ← Single section (heading + fields grid)
      form-renderer.tsx   ← Top-level: iterates sections, handles state
      score-summary.tsx   ← Weighted scoring breakdown
    preview/
      json-editor.tsx     ← Inline JSON editor with error highlighting
  lib/
    schema-types.ts       ← TypeScript types for the form schema
    default-schemas.ts    ← 3 built-in demo schemas (KPI, feedback, survey)
    validation.ts         ← Runtime validation with typed errors
    scoring.ts            ← Weighted scoring engine
tests/
  form-renderer.spec.ts   ← E2E: render forms, fill fields, submit
  conditional.spec.ts     ← E2E: conditional field visibility
  scoring.spec.ts         ← E2E: weighted score calculation
  mobile.spec.ts          ← E2E: responsive layout at mobile viewport
playwright.config.ts
DECISIONS.md              ← Architecture decision log
```

## The schema format

```typescript
interface FormSchema {
  title: string;
  scoring?: { enabled: boolean; totalWeight: number };
  sections: FormSection[];
}

interface FormSection {
  id: string;
  title: string;
  weight?: number;        // for scoring mode
  fields: FormField[];
}

interface FormField {
  id: string;
  type: "text" | "number" | "select" | "multi-select" | "date" | "file" | "rating";
  label: string;
  required?: boolean;
  condition?: { field: string; value: any };  // show only when
  options?: { label: string; value: string }[];
  validation?: { min?: number; max?: number; pattern?: string };
  placeholder?: string;
}
```

## Where to extend

- Drag-to-reorder sections and fields
- Form versioning and diff
- Export submissions as CSV/JSON
- Multi-language field labels
- Undo/redo on the JSON editor
- Visual form builder (drag fields from palette, not just paste JSON)
