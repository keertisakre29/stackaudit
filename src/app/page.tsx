import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Input your AI stack",
    description:
      "Tell us what AI tools your team pays for, which plans you use, and your monthly spend.",
  },
  {
    number: "02",
    title: "Get an instant audit",
    description:
      "We analyze overspend, redundant subscriptions, and cheaper alternatives based on your team size and usage.",
  },
  {
    number: "03",
    title: "Reduce real costs",
    description:
      "See monthly + annual savings with actionable recommendations you can implement immediately.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">
              AI Spend Intelligence
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Cut your AI spend without slowing your team.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
              StackAudit analyzes your AI tooling stack, identifies waste, and
              recommends lower-cost alternatives instantly.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/audit"
                className="rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Analyze My Stack
              </Link>

              <p className="text-sm text-zinc-500">
                No signup required · Results in under 60 seconds
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:grid-cols-4">
            <div>
              <p className="text-3xl font-semibold">1,200+</p>
              <p className="mt-2 text-sm text-zinc-500">AI audits generated</p>
            </div>

            <div>
              <p className="text-3xl font-semibold">$48k+</p>
              <p className="mt-2 text-sm text-zinc-500">
                Potential savings identified
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">420+</p>
              <p className="mt-2 text-sm text-zinc-500">Teams analyzed</p>
            </div>

            <div>
              <p className="text-3xl font-semibold">9 tools</p>
              <p className="mt-2 text-sm text-zinc-500">Supported platforms</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 border-b border-zinc-200">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-zinc-200 bg-white p-8"
            >
              <p className="text-xs tracking-[0.3em] text-zinc-500">
                {step.number}
              </p>

              <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Sample Audit
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                See what a real optimization report looks like.
              </h2>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Potential Savings
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-7xl font-semibold tracking-tight">
                    $220
                  </span>
                  <span className="pb-3 text-2xl text-zinc-500">/mo</span>
                </div>

                <p className="mt-3 text-lg text-zinc-600">
                  $2,640 saved annually
                </p>

                <div className="mt-12 rounded-3xl border border-emerald-200 bg-white p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">
                        Cursor Business
                      </h3>

                      <p className="mt-2 text-sm text-zinc-600">
                        2 seats · $80/month current spend
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      HIGH CONFIDENCE
                    </span>
                  </div>

                  <div className="mt-8 grid gap-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Recommended
                      </p>
                      <p className="mt-2 text-2xl font-semibold">Cursor Pro</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Savings
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-600">
                        $40/mo
                      </p>
                    </div>
                  </div>

                  <p className="mt-8 text-sm leading-7 text-zinc-700">
                    Cursor Business includes admin controls and centralized
                    billing features that provide limited value for a 2-person
                    engineering team. Cursor Pro delivers equivalent model
                    access at half the cost.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  AI Summary
                </p>

                <h3 className="mt-6 text-3xl font-semibold leading-tight">
                  Your team is overspending on collaboration-tier plans.
                </h3>

                <p className="mt-6 text-sm leading-8 text-zinc-600">
                  Based on your current stack configuration, most of your
                  savings opportunity comes from reducing overprovisioned team
                  subscriptions. Your current workflow does not appear to rely
                  heavily on enterprise collaboration features, making
                  lower-cost individual plans a better fit.
                </p>

                <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="text-sm text-zinc-700">
                    Teams saving more than $500/month can unlock additional AI
                    infrastructure discounts through Credex.
                  </p>

                  <Link
                    href="/audit"
                    className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
                  >
                    Get Full Audit Report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
