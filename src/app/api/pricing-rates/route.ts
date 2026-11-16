const currencies = ["CAD", "AUD", "QAR", "GBP", "PKR"];

export async function GET() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error("Rate request failed");

    const data = await response.json();
    const timestamp = data.time_last_update_unix;
    if (data.result !== "success" || data.base_code !== "USD" ||
        !Number.isFinite(timestamp) || timestamp <= 0 ||
        currencies.some((code) => !Number.isFinite(data.rates?.[code]) || data.rates[code] <= 0)) {
      throw new Error("Invalid rate data");
    }

    return Response.json({
      date: new Date(timestamp * 1000).toISOString().slice(0, 10),
      rates: Object.fromEntries(currencies.map((code) => [code, data.rates[code]])),
    });
  } catch {
    return Response.json({ error: "Exchange rates unavailable" }, { status: 503 });
  }
}
