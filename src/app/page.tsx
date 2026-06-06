"use client";
import { useState } from "react";
import type { FormSchema } from "@/lib/schema-types";
import { defaultSchemas } from "@/lib/default-schemas";
import { FormRenderer } from "@/components/layout/form-renderer";
import { JsonEditor } from "@/components/preview/json-editor";

const initialJson = JSON.stringify(defaultSchemas.kpi, null, 2);

export default function Home() {
  const [jsonText, setJsonText] = useState(initialJson);
  const [schema, setSchema] = useState<FormSchema | null>(defaultSchemas.kpi);
  const [jsonValid, setJsonValid] = useState(true);
  const [activePreset, setActivePreset] = useState<string>("kpi");

  const handleJsonChange = (
    json: string,
    valid: boolean,
    parsed?: FormSchema
  ) => {
    setJsonText(json);
    setJsonValid(valid);
    if (valid && parsed) setSchema(parsed);
  };

  const loadPreset = (key: string) => {
    const preset = defaultSchemas[key];
    if (!preset) return;
    const text = JSON.stringify(preset, null, 2);
    setJsonText(text);
    setSchema(preset);
    setJsonValid(true);
    setActivePreset(key);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-stone-900">
              Form Builder Engine
            </h1>
            <p className="text-xs text-stone-500">
              Schema-driven · Conditional logic · Weighted scoring
            </p>
          </div>
          <a
            href="https://github.com/verdiz8/form-builder-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-400 transition-colors hover:text-stone-600"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: JSON Editor + Presets */}
          <div className="space-y-4">
            <div className="flex gap-2">
              {Object.keys(defaultSchemas).map((key) => (
                <button
                  key={key}
                  onClick={() => loadPreset(key)}
                  data-testid={`preset-${key}`}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    activePreset === key
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
                  }`}
                >
                  {key === "kpi" ? "KPI Evaluation" : "Feedback Form"}
                </button>
              ))}
            </div>

            <JsonEditor json={jsonText} onChange={handleJsonChange} />

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-500">
                <strong className="text-stone-700">How it works:</strong> Edit
                the JSON on the left — the form renders live on the right. Try
                changing a field type, adding a section, or toggling{" "}
                <code className="rounded bg-stone-200 px-1 text-[11px]">
                  scoring.enabled
                </code>
                . The KPI preset demonstrates conditional fields: set
                Extracurricular to &ldquo;Multiple roles&rdquo; to reveal the
                Technology adoption field.
              </p>
            </div>
          </div>

          {/* Right: Rendered Form */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            {schema && jsonValid ? (
              <div>
                <div className="mb-6">
                  <h2
                    className="text-xl font-semibold text-stone-900"
                    data-testid="form-title"
                  >
                    {schema.title}
                  </h2>
                  {schema.scoring?.enabled && (
                    <span className="mt-2 inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700">
                      Weighted scoring enabled
                    </span>
                  )}
                </div>
                <FormRenderer schema={schema} />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-stone-400">
                {!jsonValid
                  ? "Fix the JSON to preview the form"
                  : "Loading..."}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
