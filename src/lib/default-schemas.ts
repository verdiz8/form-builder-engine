import type { FormSchema } from "./schema-types";

/** KPI evaluation — the real-world use case this engine was built for */
export const kpiEvaluation: FormSchema = {
  title: "Teacher KPI Evaluation",
  description:
    "Role-based performance review with weighted scoring across professional competence, personal attributes, and additional responsibilities.",
  scoring: { enabled: true, totalWeight: 100 },
  sections: [
    {
      id: "professional-competence",
      title: "Professional Competence",
      description: "Core teaching and curriculum delivery skills",
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
      description: "Professional conduct and interpersonal skills",
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
      description: "Extracurricular contributions and growth mindset",
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
          id: "professional-development",
          type: "multi-select",
          label: "Professional development activities (this year)",
          options: [
            { label: "Workshops attended", value: "workshops" },
            { label: "Courses completed", value: "courses" },
            { label: "Conference presentations", value: "conferences" },
            { label: "Peer mentoring", value: "mentoring" },
            { label: "Published research", value: "research" },
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
  description: "Help us improve. Your responses are anonymous.",
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

/** Customer satisfaction survey — demonstrates a third schema variation */
export const surveyForm: FormSchema = {
  title: "Customer Satisfaction Survey",
  description: "Quarterly NPS survey for product feedback",
  sections: [
    {
      id: "nps",
      title: "Net Promoter Score",
      fields: [
        {
          id: "nps-score",
          type: "rating",
          label: "How likely are you to recommend us?",
          required: true,
          maxRating: 10,
        },
        {
          id: "nps-reason",
          type: "text",
          label: "What's the main reason for your score?",
          placeholder: "Tell us why...",
          validation: { minLength: 10, maxLength: 500 },
        },
      ],
    },
    {
      id: "experience",
      title: "Product Experience",
      fields: [
        {
          id: "usage-frequency",
          type: "select",
          label: "How often do you use the product?",
          required: true,
          options: [
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Rarely", value: "rarely" },
          ],
        },
        {
          id: "favorite-features",
          type: "multi-select",
          label: "Which features do you use most?",
          options: [
            { label: "Dashboard", value: "dashboard" },
            { label: "Reports", value: "reports" },
            { label: "API", value: "api" },
            { label: "Integrations", value: "integrations" },
            { label: "Mobile app", value: "mobile" },
          ],
        },
        {
          id: "improvement",
          type: "text",
          label: "What should we improve?",
          placeholder: "Be honest — we can take it...",
        },
      ],
    },
  ],
};

export const defaultSchemas: Record<string, FormSchema> = {
  kpi: kpiEvaluation,
  feedback: feedbackForm,
  survey: surveyForm,
};
