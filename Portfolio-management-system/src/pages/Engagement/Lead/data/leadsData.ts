import type { Lead } from "../types";

export const sampleLeads: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    date: "2025-03-15",
    status: "New",
    description:
      "Interested in enterprise software solutions. Referred by existing client.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    date: "2025-03-14",
    status: "Contacted",
    description:
      "Requested demo for project management tool. Follow-up scheduled for next week.",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234 567 8902",
    date: "2025-03-13",
    status: "Qualified",
    description:
      "Budget confirmed. Decision maker identified. Ready for proposal presentation.",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    phone: "+1 234 567 8903",
    date: "2025-03-12",
    status: "New",
    description:
      "Inquiry about custom development services. Needs technical consultation.",
  },
];
