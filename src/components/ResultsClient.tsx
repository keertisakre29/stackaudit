"use client";

import { useState } from "react";
import Link from "next/link";
import type { AuditResult, ToolRecommendation, RecommendationType } from "@/types/audit";

interface Props {
  audit: AuditResult;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatMoney(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

function verdictColors(type: "overspending" | "moderate" | "optimal") {
  if (type === "overspending") return { bg: "var(--savings-high-bg)", border: "#a7f3d0", text: "var(--savings-high)" };
  if (type === "moderate")     return { bg: "var(--savings-mid-bg)",  border: "#fcd34d", text: "var(--savings-mid)" };
  return { bg: "var(--savings-none-bg)", border: "#bfdbfe", text: "var(--savings-none)" };
}

function recommendationLabel(type: RecommendationType): string {
  const map: Record<RecommendationType, string> = {
    downgrade_plan:      "Downgrade plan",
    reduce_seats:        "Reduce seats",
    switch_tool:         "Switch tool",
    credits_opportunity: "Buy via credits",
    already_optimal:     "Already optimal",
    consolidate:         "Consolidate tools",
  };
  return map[type];
}

function recommendationColor(type: RecommendationType) {
  if (type === "already_optimal") return { bg: "var(--savings-none-bg)", text: "var(--savings-none)", border: "#bfdbfe" };
  if (type === "consolidate")     return { bg: "var(--savings-high-bg)", text: "var(--savings-high)", border: "#a7f3d0" };
  return { bg: "var(--savings-high-bg)", text: "var(--savings-high)", border: "#a7f3d0" };
}

function confidenceBadge(level: "high" | "moderate" | "low") {
  const map = {
    high:     { label: "High confidence",     bg: "#d1fae5", text: "var(--savings-high)", border: "#a7f3d0" },
    moderate: { label: "Moderate confidence", bg: "#fef3c7", text: "var(--savings-mid)",  border: "#fcd34d" },
    low:      { label: "Low confidence",      bg: "#f3f4f6", text: "var(--ink-muted)",    border: "#e5e7eb" },
  };
  return map[level];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RecommendationCard({ rec }: { rec: ToolRecommendation }) {
  const isOptimal = rec.recommendationType === "already_optimal";
  const recColor = recommendationColor(rec.recommendationType);
  const confBadge = confidenceBadge(rec.confidenceLevel);

  return (
    <div
      className="card"
      style={{
        padding: 24,
        borderColor: rec.monthlySavings > 0 ? "#a7f3d0" : "var(--border)",
        background: rec.monthlySavings > 0 ? "var(--savings-high-bg)" : "var(--surface)",
      }}
    >
      {/* Card header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>
            {rec.toolName}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--ink-faint)", marginTop: 3 }}>
            {rec.currentPlan} · {rec.seats} seat{rec.seats !== 1 ? "s" : ""} · {formatMoney(rec.currentMonthlySpend)}/mo current
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {/* Recommendation type badge */}
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.05em",
            textTransform: "uppercase", padding: "3px 8px", borderRadius: 4,
            background: recColor.bg, color: recColor.text, border: `1px solid ${recColor.border}`,
          }}>
            {recommendationLabel(rec.recommendationType)}
          </span>

          {/* Confidence badge */}
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.05em",
            textTransform: "uppercase", padding: "3px 8px", borderRadius: 4,
            background: confBadge.bg, color: confBadge.text, border: `1px solid ${confBadge.border}`,
          }}>
            {confBadge.label}
          </span>
        </div>
      </div>

      {/* Savings summary row */}
      {!isOptimal && rec.monthlySavings > 0 && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 12, padding: "14px 16px", marginBottom: 16,
          background: "rgba(255,255,255,0.65)", borderRadius: 8,
          border: "1px solid #a7f3d0",
        }}>
          <div>
            <div style={metaLabel}>Recommended</div>
            <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: "0.9375rem" }}>
              {rec.recommendedPlan ?? rec.recommendedTool ?? "—"}
            </div>
          </div>
          <div>
            <div style={metaLabel}>Monthly savings</div>
            <div className="savings-number" style={{ fontWeight: 600, color: "var(--savings-high)", fontSize: "1.125rem" }}>
              {formatMoney(rec.monthlySavings)}/mo
            </div>
          </div>
          <div>
            <div style={metaLabel}>Annual savings</div>
            <div className="savings-number" style={{ fontWeight: 600, color: "var(--savings-high)", fontSize: "1.125rem" }}>
              {formatMoney(rec.annualSavings)}/yr
            </div>
          </div>
        </div>
      )}

      {/* Reasoning */}
      <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", lineHeight: 1.65 }}>
        {rec.reasoning}
      </p>

      {/* Credex opportunity */}
      {rec.credexOpportunity && (
        <div style={{
          marginTop: 14, padding: "10px 14px",
          background: "rgba(26,107,71,0.07)", borderRadius: 6,
          border: "1px solid rgba(26,107,71,0.2)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--credex)" }}>
            Credex sells discounted credits for this tool — potential to save even more.
          </span>
          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, fontSize: "0.8125rem", color: "var(--credex)", whiteSpace: "nowrap", textDecoration: "none" }}
          >
            Learn more →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ResultsClient({ audit }: Props) {
  const [copied, setCopied] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const { overallVerdict, totalMonthlySavings, totalAnnualSavings,
          totalCurrentMonthlySpend, recommendations, input } = audit;
  const colors = verdictColors(overallVerdict);
  const spendPerDev = input.teamSize > 0
    ? Math.round(totalCurrentMonthlySpend / input.teamSize)
    : totalCurrentMonthlySpend;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailSubmit = async () => {
    if (!email) return;
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, auditId: audit.auditId }),
      });
      setEmailSubmitted(true);
    } catch {
      // fail silently — don't block user
      setEmailSubmitted(true);
    }
  };

  const highSavings = totalMonthlySavings >= 500;
  const hasSavings   = totalMonthlySavings > 0;

  return (
    <div style={{ background: "var(--surface-2)", minHeight: "100vh", paddingBottom: 80 }}>

      {/* ── Hero savings banner ─────────────────────────────────────────── */}
      <section
        style={{
          background: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
          padding: "var(--space-2xl) 0",
        }}
      >
        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>

            <div className="animate-fade-up">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: colors.text, marginBottom: 10 }}>
                {overallVerdict === "optimal" ? "Audit complete · Stack optimized" : "Audit complete · Savings found"}
              </p>

              {hasSavings ? (
                <>
                  <div className="savings-number" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: colors.text, lineHeight: 1 }}>
                    {formatMoney(totalMonthlySavings)}<span style={{ fontSize: "1.5rem", opacity: 0.6 }}>/mo</span>
                  </div>
                  <div style={{ color: colors.text, opacity: 0.8, fontSize: "1.0625rem", marginTop: 6 }}>
                    {formatMoney(totalAnnualSavings)} potential annual savings
                  </div>
                </>
              ) : (
                <div className="display-lg" style={{ color: colors.text }}>
                  You're spending well.
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="animate-fade-up-delay-1" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { label: "Current spend", value: `${formatMoney(totalCurrentMonthlySpend)}/mo` },
                { label: "Tools audited", value: `${input.tools.length}` },
                { label: "Per developer", value: `${formatMoney(spendPerDev)}/mo` },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.06em", color: colors.text, opacity: 0.7, marginBottom: 4 }}>
                    {stat.label}
                  </div>
                  <div className="savings-number" style={{ fontSize: "1.25rem", color: colors.text }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI summary */}
          {(audit.aiSummary ?? audit.fallbackSummary) && (
            <div className="animate-fade-up-delay-2" style={{
              marginTop: 28, padding: "16px 20px",
              background: "rgba(255,255,255,0.6)", borderRadius: 8,
              border: `1px solid ${colors.border}`,
              maxWidth: 680,
            }}>
              <p style={{ fontSize: "0.9375rem", color: "var(--ink-muted)", lineHeight: 1.7, margin: 0 }}>
                {audit.aiSummary ?? audit.fallbackSummary}
              </p>
            </div>
          )}

          {/* Share + Email */}
          <div className="animate-fade-up-delay-3" style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn-ghost" onClick={handleCopyLink} style={{ fontSize: "0.875rem" }}>
              {copied ? "✓ Copied!" : "📋 Copy link"}
            </button>
            {!emailSubmitted ? (
              <button className="btn-ghost" onClick={() => setShowEmailForm(!showEmailForm)} style={{ fontSize: "0.875rem" }}>
                📧 Email me this report
              </button>
            ) : (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--savings-high)", padding: "10px 0" }}>
                ✓ Report sent
              </span>
            )}
          </div>

          {/* Inline email form */}
          {showEmailForm && !emailSubmitted && (
            <div style={{ display: "flex", gap: 8, marginTop: 12, maxWidth: 380 }}>
              <input
                type="email"
                className="input-base"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              />
              <button className="btn-primary" onClick={handleEmailSubmit} style={{ whiteSpace: "nowrap", padding: "10px 18px" }}>
                Send →
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="page-container" style={{ paddingTop: 40 }}>

        {/* ── Credex CTA (high savings only) ─────────────────────────── */}
        {highSavings && (
          <div
            style={{
              background: "var(--credex)", borderRadius: 12,
              padding: "24px 28px", marginBottom: 32,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 16,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#fff", marginBottom: 4 }}>
                Your stack has significant savings potential.
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem" }}>
                Credex sources discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise and more — from companies that overforecast. Book a free consultation.
              </div>
            </div>
            <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ background: "#fff", color: "var(--credex)", whiteSpace: "nowrap" }}>
                Talk to Credex →
              </button>
            </a>
          </div>
        )}

        {/* ── Per-tool recommendations ────────────────────────────────── */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 20 }}>
          Tool-by-tool breakdown
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {/* Savings first, then optimal */}
          {[...recommendations]
            .sort((a, b) => b.monthlySavings - a.monthlySavings)
            .map((rec) => (
              <RecommendationCard key={`${rec.toolId}-${rec.recommendationType}`} rec={rec} />
            ))}
        </div>

        {/* ── Modest savings CTA ──────────────────────────────────────── */}
        {!highSavings && (
          <div style={{
            border: "1px solid var(--border)", borderRadius: 12,
            padding: "24px 28px", marginBottom: 32,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 16, background: "var(--surface)",
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "1rem", color: "var(--ink)", marginBottom: 4 }}>
                {hasSavings ? "Want to save even more?" : "Your stack looks optimized."}
              </div>
              <div style={{ color: "var(--ink-muted)", fontSize: "0.9375rem" }}>
                Get notified when new optimizations apply to your stack, or when better pricing becomes available.
              </div>
            </div>
            {!emailSubmitted ? (
              <div style={{ display: "flex", gap: 8, minWidth: 280 }}>
                <input
                  type="email"
                  className="input-base"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn-credex" onClick={handleEmailSubmit} style={{ whiteSpace: "nowrap" }}>
                  Notify me
                </button>
              </div>
            ) : (
              <span style={{ color: "var(--savings-high)", fontWeight: 600 }}>✓ You're on the list</span>
            )}
          </div>
        )}

        {/* ── Run another audit ───────────────────────────────────────── */}
        <div style={{ textAlign: "center", paddingTop: 12 }}>
          <Link href="/audit">
            <button className="btn-ghost">← Audit a different stack</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Style helpers ─────────────────────────────────────────────────────────────
const metaLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.6875rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--ink-faint)",
  marginBottom: 4,
};
