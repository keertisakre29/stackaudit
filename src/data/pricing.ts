import type { ToolId, PlanId } from "@/types/audit";

// ─── Pricing Data ─────────────────────────────────────────────────────────────
// All prices in USD/month per seat unless noted.
// Sources documented in PRICING_DATA.md at repo root.
// Last verified: submission week (add exact date before submitting)

export interface PlanInfo {
  id: PlanId;
  label: string;
  pricePerSeat: number; // USD/month
  minSeats: number;
  maxSeats?: number;
  notes?: string;
}

export interface ToolInfo {
  id: ToolId;
  name: string;
  category: "coding" | "general_ai" | "api";
  plans: PlanInfo[];
  officialPricingUrl: string;
}

export const TOOLS: Record<ToolId, ToolInfo> = {
  cursor: {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    officialPricingUrl: "https://cursor.sh/pricing",
    plans: [
      { id: "hobby", label: "Hobby (Free)", pricePerSeat: 0, minSeats: 1 },
      {
        id: "pro",
        label: "Pro",
        pricePerSeat: 20,
        minSeats: 1,
        notes: "Includes $20/month in model credits",
      },
      {
        id: "pro_plus",
        label: "Pro+",
        pricePerSeat: 60,
        minSeats: 1,
        notes: "3× model credits vs Pro",
      },
      {
        id: "ultra",
        label: "Ultra",
        pricePerSeat: 200,
        minSeats: 1,
        notes: "20× model credits vs Pro, priority access",
      },
      {
        id: "business",
        label: "Business",
        pricePerSeat: 40,
        minSeats: 2,
        notes: "Pro-equivalent AI + admin controls, centralized billing",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricePerSeat: 0,
        minSeats: 10,
        notes: "Custom pricing",
      },
    ],
  },

  github_copilot: {
    id: "github_copilot",
    name: "GitHub Copilot",
    category: "coding",
    officialPricingUrl: "https://github.com/features/copilot/plans",
    plans: [
      // NOTE: GitHub Copilot is transitioning to usage-based billing June 1, 2026.
      // Seat prices below reflect the subscription base cost (includes equivalent AI Credits).
      // Actual cost may vary based on model usage. Document this in PRICING_DATA.md.
      {
        id: "free",
        label: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Limited completions, no premium models",
      },
      {
        id: "pro",
        label: "Pro",
        pricePerSeat: 10,
        minSeats: 1,
        notes: "Includes $10/mo AI Credits. New sign-ups paused as of Apr 2026",
      },
      {
        id: "pro_plus",
        label: "Pro+",
        pricePerSeat: 39,
        minSeats: 1,
        notes: "Includes $39/mo AI Credits. New sign-ups paused as of Apr 2026",
      },
      {
        id: "business",
        label: "Business",
        pricePerSeat: 19,
        minSeats: 2,
        notes:
          "Includes $19/mo AI Credits per seat, admin controls, no training on code",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Custom pricing, advanced security, SAML SSO",
      },
    ],
  },

  claude: {
    id: "claude",
    name: "Claude (Anthropic)",
    category: "general_ai",
    officialPricingUrl: "https://anthropic.com/pricing",
    plans: [
      { id: "free", label: "Free", pricePerSeat: 0, minSeats: 1 },
      {
        id: "pro",
        label: "Pro",
        pricePerSeat: 20,
        minSeats: 1,
        notes: "~5× usage vs Free, Opus + Sonnet access",
      },
      {
        id: "max_5x",
        label: "Max ($100)",
        pricePerSeat: 100,
        minSeats: 1,
        notes: "~5× usage vs Pro, for heavy daily users",
      },
      {
        id: "max_20x",
        label: "Max ($200)",
        pricePerSeat: 200,
        minSeats: 1,
        notes: "~20× usage vs Pro, for all-day agentic workflows",
      },
      {
        id: "team",
        label: "Team",
        pricePerSeat: 30,
        minSeats: 5,
        notes: "Min 5 seats, shared Projects, admin controls",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Custom pricing, SSO, expanded context",
      },
      {
        id: "api",
        label: "API Direct",
        pricePerSeat: 0,
        minSeats: 1,
        notes:
          "Pay-per-token: Haiku $1/$5, Sonnet $3/$15, Opus $5/$25 per MTok",
      },
    ],
  },

  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT (OpenAI)",
    category: "general_ai",
    officialPricingUrl: "https://openai.com/business/chatgpt-pricing/",
    plans: [
      {
        id: "free",
        label: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Ad-supported in US. Limited to GPT-5.3 Instant",
      },
      {
        id: "go",
        label: "Go",
        pricePerSeat: 8,
        minSeats: 1,
        notes: "Ad-supported. Limited premium features",
      },
      {
        id: "plus",
        label: "Plus",
        pricePerSeat: 20,
        minSeats: 1,
        notes: "No ads. GPT-5.5, advanced voice, image gen",
      },
      {
        id: "pro",
        label: "Pro",
        pricePerSeat: 200,
        minSeats: 1,
        notes: "Unlimited access to all models, o1 Pro mode",
      },
      {
        id: "business",
        label: "Business",
        pricePerSeat: 30,
        minSeats: 2,
        notes:
          "$25/seat billed annually. Formerly ChatGPT Team (renamed Aug 2025). Min 2 seats. No data training, SOC 2",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricePerSeat: 0,
        minSeats: 150,
        notes: "Custom pricing. Min ~150 users, data residency options",
      },
      {
        id: "api",
        label: "API Direct",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Pay-per-token via platform.openai.com",
      },
    ],
  },

  anthropic_api: {
    id: "anthropic_api",
    name: "Anthropic API",
    category: "api",
    officialPricingUrl: "https://anthropic.com/pricing",
    plans: [
      {
        id: "api",
        label: "API (Pay-per-token)",
        pricePerSeat: 0,
        minSeats: 1,
        notes:
          "Haiku 4.5: $1/$5 · Sonnet 4.6: $3/$15 · Opus 4.7: $5/$25 per MTok input/output",
      },
    ],
  },

  openai_api: {
    id: "openai_api",
    name: "OpenAI API",
    category: "api",
    officialPricingUrl: "https://platform.openai.com/pricing",
    plans: [
      {
        id: "api",
        label: "API (Pay-per-token)",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Pay-per-token via platform.openai.com. Rates vary by model.",
      },
    ],
  },

  gemini: {
    id: "gemini",
    name: "Gemini (Google)",
    category: "general_ai",
    officialPricingUrl: "https://one.google.com/about/ai-premium",
    plans: [
      {
        id: "free",
        label: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Gemini 2.5 Flash, limited 2.5 Pro access, 100 AI credits/mo",
      },
      {
        id: "ai_plus",
        label: "Google AI Plus",
        pricePerSeat: 7.99,
        minSeats: 1,
        notes: "2 TB storage, expanded limits",
      },
      {
        id: "ai_pro",
        label: "Google AI Pro",
        pricePerSeat: 19.99,
        minSeats: 1,
        notes:
          "Gemini 2.5 Pro, 1,000 AI credits, 20 Deep Research/day, 2 TB storage",
      },
      {
        id: "ai_ultra",
        label: "Google AI Ultra",
        pricePerSeat: 99.99,
        minSeats: 1,
        notes:
          "Gemini 3.1 Pro, 25,000 AI credits, YouTube Premium, $100/mo GCP credits. Reduced from $249.99 at I/O 2026",
      },
      {
        id: "api",
        label: "API Direct",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Pay-per-token via Google AI Studio / Vertex AI",
      },
    ],
  },

  windsurf: {
    id: "windsurf",
    name: "Windsurf (Codeium)",
    category: "coding",
    officialPricingUrl: "https://windsurf.com/pricing",
    plans: [
      {
        id: "free",
        label: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Limited completions and flow actions",
      },
      {
        id: "pro",
        label: "Pro",
        pricePerSeat: 15,
        minSeats: 1,
        notes: "Unlimited completions, 500 premium flow actions/month",
      },
      {
        id: "teams",
        label: "Teams",
        pricePerSeat: 35,
        minSeats: 2,
        notes: "Centralized billing, team management, shared context",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        pricePerSeat: 0,
        minSeats: 1,
        notes: "Custom pricing, self-hosted option, SSO",
      },
    ],
  },
};

// ─── Helper ───────────────────────────────────────────────────────────────────

export function getPlanInfo(
  toolId: ToolId,
  planId: PlanId,
): PlanInfo | undefined {
  return TOOLS[toolId]?.plans.find((p) => p.id === planId);
}

export function getToolName(toolId: ToolId): string {
  return TOOLS[toolId]?.name ?? toolId;
}

export function getPlanLabel(toolId: ToolId, planId: PlanId): string {
  return getPlanInfo(toolId, planId)?.label ?? planId;
}
