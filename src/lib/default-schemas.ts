import type { FormSchema } from "./schema-types";

/** KPI evaluation — the real-world use case this engine was built for */
export const kpiEvaluation: FormSchema = {
  title: "Teacher KPI Evaluation",
  scoring: { enabled: true, totalWeight: 100 },
  sections: [
    {
      id: "professional-competence",
      title: "Professional Competence",
      weight: 50,
      fields: [
        {
          id: "lesson-planning",
          type: "rating",
          label: "Quality of lesson planning and preparation",
          required: true,
          maxRating: 5,
        },
        {
          id: "classroom-delivery",
          type: "rating",
          label: "Classroom delivery and student engagement",
          required: true,
          maxRating: 5,
        },
        {
          id: "assessment-practices",
          type: "rating",
          label: "Assessment and feedback practices",
          required: true,
          maxRating: 5,
        },
        {
          id: "curriculum-knowledge",
          type: "rating",
          label: "Subject matter and curriculum knowledge",
          required: true,
          maxRating: 5,
        },
        {
          id: "observations",
          type: "text",
          label: "Observer notes",
          placeholder: "Specific examples from classroom observation...",
        },
      ],
    },
    {
      id: "personal-attributes",
      title: "Personal Attributes",
      weight: 30,
      fields: [
        {
          id: "punctuality",
          type: "rating",
          label: "Punctuality and attendance",
          required: true,
          maxRating: 5,
        },
        {
          id: "collegiality",
          type: "rating",
          label: "Collaboration with colleagues and management",
          required: true,
          maxRating: 5,
        },
        {
          id: "communication",
          type: "rating",
          label: "Communication with parents and stakeholders",
          required: true,
          maxRating: 5,
        },
      ],
    },
    {
      id: "additional-qualities",
      title: "Additional Qualities",
      weight: 20,
      fields: [
        {
          id: "extracurricular",
          type: "select",
          label: "Extracurricular involvement",
          required: true,
          options: [
            { label: "None", value: "none" },
            { label: "Club advisor", value: "club" },
            { label: "Sports coach", value: "sports" },
            { label: "Event organiser", value: "events" },
            { label: "Multiple roles", value: "multiple" },
          ],
        },
        {
          id: "digital-literacy",
          type: "select",
          label: "Technology adoption in classroom",
          condition: { field: "extracurricular", value: "multiple" },
          options: [
            { label: "Basic", value: "basic" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
          ],
        },
      ],
    },
  ],
};

/** Simple feedback form — shows the engine works for lightweight use cases too */
export const feedbackForm: FormSchema = {
  title: "Session Feedback",
  sections: [
    {
      id: "feedback",
      title: "Workshop Feedback",
      fields: [
        {
          id: "satisfaction",
          type: "rating",
          label: "Overall satisfaction",
          required: true,
          maxRating: 5,
        },
        {
          id: "pace",
          type: "select",
          label: "How was the pace?",
          required: true,
          options: [
            { label: "Too slow", value: "slow" },
            { label: "Just right", value: "right" },
            { label: "Too fast", value: "fast" },
          ],
        },
        {
          id: "topics",
          type: "multi-select",
          label: "Which topics interested you most?",
          options: [
            { label: "Architecture", value: "architecture" },
            { label: "Testing", value: "testing" },
            { label: "Performance", value: "performance" },
            { label: "Tooling", value: "tooling" },
          ],
        },
        {
          id: "comments",
          type: "text",
          label: "Any other feedback?",
          placeholder: "Tell us what worked or what didn't...",
          validation: { maxLength: 500 },
        },
      ],
    },
  ],
};

export const defaultSchemas: Record<string, FormSchema> = {
  kpi: kpiEvaluation,
  feedback: feedbackForm,
};
