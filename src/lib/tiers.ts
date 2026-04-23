import type { Tier } from "@/components/tier-card";

export const TIERS: Tier[] = [
  {
    id: "apprentice",
    name: "Apprentice",
    tagline: "For students and early-career engineers",
    amount: 5,
    cadence: "month",
    perks: [
      "Funds 1 hour of bridge support per month",
      "Trust newsletter & impact report",
      "Name in the Contributors ledger",
    ],
  },
  {
    id: "engineer",
    name: "Engineer",
    tagline: "Standard tax for working professionals",
    amount: 25,
    cadence: "month",
    perks: [
      "Funds ~1 day of bridge support per month",
      "Quarterly beneficiary stories",
      "Vote on association partnerships",
      "Paul Allen and Alan Turing digital member badge",
    ],
    featured: true,
  },
  {
    id: "architect",
    name: "Architect",
    tagline: "For senior staff & leadership",
    amount: 100,
    cadence: "month",
    perks: [
      "Funds a full week of bridge support",
      "Direct line to trust governance updates",
      "Co-sponsor IEEE / ACM scholarships",
      "Invitation to annual benefactors gathering",
    ],
  },
  {
    id: "patron",
    name: "Patron",
    tagline: "Honoring the legacy in full",
    amount: 500,
    cadence: "month",
    perks: [
      "Underwrites an entire month of recovery for one engineer",
      "Named patronage in our annual report",
      "Advisory seat on grant committee (optional)",
      "All Architect benefits included",
    ],
  },
];
