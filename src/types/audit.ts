// ─── Tool & Plan Enums ────────────────────────────────────────────────────────

export type ToolId =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

// ─── Plan definitions per tool ───────────────────────────────────────────────

export type CursorPlan = "hobby" | "pro" | "pro_plus" | "ultra" | "business" | "enterprise";
export type CopilotPlan = "free" | "pro" | "pro_plus" | "business" | "enterprise";
export type ClaudePlan = "free" | "pro" | "max_5x" | "max_20x" | "team" | "enterprise" | "api";
export type ChatGPTPlan = "free" | "go" | "plus" | "pro" | "business" | "enterprise" | "api";
export type GeminiPlan = "free" | "ai_plus" | "ai_pro" | "ai_ultra" | "api";
export type WindsurfPlan = "free" | "pro" | "teams" | "enterprise";

export type PlanId =
  | CursorPlan
  | CopilotPlan
  | ClaudePlan
  | ChatGPTPlan
  | GeminiPlan
  | WindsurfPlan;

// ─── User Input ───────────────────────────────────────────────────────────────

export interface ToolEntry {
  toolId: ToolId;
  planId: PlanId;
  seats: number;
  monthlySpend: number; // what the user actually pays (may differ from list price)
}

export interface AuditInput {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
  email?: string;
  companyName?: string;
  role?: string;
}

// ─── Audit Output ─────────────────────────────────────────────────────────────

export type RecommendationType =
  | "downgrade_plan"       // cheaper plan same vendor
  | "reduce_seats"         // fewer seats same plan
  | "switch_tool"          // different tool for same job
  | "credits_opportunity"  // buy via Credex credits
  | "already_optimal"      // no change recommended
  | "consolidate";         // paying for overlapping tools

export type ConfidenceLevel = "high" | "moderate" | "low";

export interface ToolRecommendation {
  toolId: ToolId;
  toolName: string;
  currentPlan: string;
  currentMonthlySpend: number;
  seats: number;
  recommendationType: RecommendationType;
  recommendedPlan?: string;
  recommendedTool?: string;
  recommendedSeats?: number;
  projectedMonthlySpend: number;
  monthlySavings: number;
  annualSavings: number;
  reasoning: string;         // finance-literate, specific
  confidenceLevel: ConfidenceLevel;
  credexOpportunity: boolean; // surface Credex upsell
}

export interface AuditResult {
  auditId: string;
  createdAt: string;
  input: AuditInput;
  recommendations: ToolRecommendation[];
  totalCurrentMonthlySpend: number;
  totalProjectedMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  overallVerdict: "overspending" | "moderate" | "optimal";
  aiSummary?: string;        // from Anthropic API, may be null if API fails
  fallbackSummary: string;   // always populated
}
