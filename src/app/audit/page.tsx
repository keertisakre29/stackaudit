"use client";

import { useEffect, useState } from "react";
import { generateAudit } from "@/lib/audit-engine";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tools = ["Cursor", "ChatGPT", "Claude", "Gemini", "GitHub Copilot"];

export default function AuditPage() {
  const [form, setForm] = useState({
    tool: "Cursor",
    plan: "Business",
    spend: "80",
    seats: "2",
    useCase: "Coding",
  });

  const [result, setResult] = useState<any>(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("stackaudit-form");

    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stackaudit-form", JSON.stringify(form));
  }, [form]);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-20 text-black">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            AI Spend Audit
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Analyze your AI stack.
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Enter your current tools, plans, and monthly spend to identify
            overspending and optimization opportunities.
          </p>
        </div>

        <div className="mt-14 grid gap-8">
          <div>
            <label className="mb-3 block text-sm font-medium">Tool</label>

            <select
              value={form.tool}
              onChange={(e) => setForm({ ...form, tool: e.target.value })}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 outline-none"
            >
              {tools.map((tool) => (
                <option key={tool}>{tool}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-medium">Plan</label>

              <input
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">
                Monthly Spend
              </label>

              <input
                value={form.spend}
                onChange={(e) => setForm({ ...form, spend: e.target.value })}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-4 outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-medium">Seats</label>

              <input
                value={form.seats}
                onChange={(e) => setForm({ ...form, seats: e.target.value })}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">
                Primary Use Case
              </label>

              <select
                value={form.useCase}
                onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 outline-none"
              >
                <option>Coding</option>
                <option>Writing</option>
                <option>Research</option>
                <option>Mixed</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              const audit = generateAudit({
                tool: form.tool,
                plan: form.plan,
                spend: Number(form.spend),
                seats: Number(form.seats),
              });

              setResult(audit);

              if (audit.savings > 0) {
                setSummary(
                  "Your current AI stack appears to be overprovisioned for your team size. Several collaboration-tier subscriptions may not be delivering proportional value relative to their monthly cost.",
                );
              } else {
                setSummary(
                  "Your current stack configuration appears reasonably optimized based on the provided usage and spend patterns.",
                );
              }
            }}
            className="mt-4 rounded-2xl bg-black px-6 py-4 text-sm font-medium text-white transition hover:opacity-90"
          >
            Generate Audit
          </button>

          {result && (
            <>
              <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Audit Result
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <h2 className="text-7xl font-semibold tracking-tight text-emerald-600">
                    ${result.savings}
                  </h2>

                  <span className="pb-2 text-2xl text-zinc-500">/mo</span>
                </div>

                <p className="mt-4 text-lg text-zinc-600">
                  ${result.annualSavings}/year potential savings
                </p>
                <div className="mt-10 h-72 rounded-3xl border border-zinc-200 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Spend Comparison
                  </p>

                  <div className="mt-6 h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: "Current Spend",
                            value: Number(form.spend),
                          },
                          {
                            name: "Optimized",
                            value: Number(form.spend) - result.savings,
                          },
                        ]}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" radius={[12, 12, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Recommendation
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold">
                    {result.recommendation}
                  </h3>

                  <p className="mt-2 text-sm text-emerald-600">
                    Confidence: {result.confidence}
                  </p>

                  <p className="mt-6 text-base leading-8 text-zinc-600">
                    {result.reasoning}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-black p-8 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                  AI Summary
                </p>

                <p className="mt-6 text-lg leading-8 text-zinc-200">
                  {summary}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
