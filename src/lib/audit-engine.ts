export function generateAudit(data: {
  tool: string;
  plan: string;
  spend: number;
  seats: number;
}) {
  let recommendation = "";
  let savings = 0;
  let reasoning = "";
  let confidence = "Medium";

  if (
    data.tool.toLowerCase() === "cursor" &&
    data.plan.toLowerCase() === "business" &&
    data.seats <= 3
  ) {
    recommendation = "Switch to Cursor Pro";

    savings = 40;

    reasoning =
      "Cursor Business includes admin and collaboration features that are usually unnecessary for teams under 4 users.";

    confidence = "High";
  } else if (
    data.tool.toLowerCase() === "chatgpt" &&
    data.plan.toLowerCase() === "business"
  ) {
    recommendation = "Use ChatGPT Plus";

    savings = 30;

    reasoning =
      "Your current team size may not justify Business-tier collaboration pricing.";

    confidence = "Medium";
  } else if (data.tool.toLowerCase() === "claude" && data.spend > 100) {
    recommendation = "Optimize Claude API usage";

    savings = 50;

    reasoning =
      "Your API usage appears high relative to typical workloads. Usage optimization or credits may reduce costs.";

    confidence = "Medium";
  } else if (data.tool.toLowerCase() === "github copilot" && data.seats <= 2) {
    recommendation = "Switch to Individual Plan";

    savings = 20;

    reasoning =
      "Business controls may not provide significant value for very small engineering teams.";

    confidence = "High";
  } else {
    recommendation = "Current setup looks optimized";

    savings = 0;

    reasoning =
      "No major overspending patterns were detected based on your configuration.";

    confidence = "Low";
  }

  return {
    recommendation,
    savings,
    annualSavings: savings * 12,
    reasoning,
    confidence,
  };
}
