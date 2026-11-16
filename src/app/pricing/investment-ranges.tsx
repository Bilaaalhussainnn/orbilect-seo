"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";
import styles from "./investment-ranges.module.css";

const currencies = [
  ["USD", "US dollar"], ["CAD", "Canadian dollar"], ["AUD", "Australian dollar"],
  ["QAR", "Qatari riyal"], ["GBP", "British pound"], ["PKR", "Pakistani rupee"],
] as const;

type Currency = typeof currencies[number][0];
type Rates = { date: string; rates: Record<Exclude<Currency, "USD">, number> };
type Group = { name: string; rows: string[][] };

function convertRange(range: string, currency: Currency, rates: Rates | null) {
  if (currency === "USD" || !rates) return range;
  const numbers = range.match(/\$[\d,]+(?:\.\d+)?/g);
  if (!numbers) return range;
  const format = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  return currency + " " + numbers.map((part) =>
    format.format(Number(part.replace(/[$,]/g, "")) * rates.rates[currency])).join("–");
}

export function InvestmentRanges({ groups, globe }: { groups: Group[]; globe: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rates, setRates] = useState<Rates | null>(null);
  const [status, setStatus] = useState("");
  const [activeGroup, setActiveGroup] = useState(0);
  const request = useRef<Promise<Rates> | null>(null);
  const latest = useRef(0);

  async function selectCurrency(code: Currency) {
    const choice = ++latest.current;
    if (code === "USD" || rates) {
      setCurrency(code);
      setStatus("");
      return;
    }

    setStatus("Loading " + code + " exchange rates…");
    request.current ??= fetch("/api/pricing-rates").then(async (response) => {
      if (!response.ok) throw new Error("Rate request failed");
      return await response.json() as Rates;
    }).finally(() => { request.current = null; });

    try {
      const result = await request.current;
      setRates(result);
      if (choice !== latest.current) return;
      setCurrency(code);
      setStatus("");
    } catch {
      if (choice === latest.current) {
        setStatus("Exchange rates are unavailable. Prices are shown in USD. Select a currency to retry.");
      }
    }
  }

  const group = groups[activeGroup];

  return (
    <section id="sample-investment" className={styles.section} aria-labelledby="sample-investment-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Sample investment ranges</p>
          <h2 id="sample-investment-title">Plan your investment <span>in your currency</span></h2>
          <p>Compare the work, billing frequency, and estimated timing for each service. Your proposal confirms the final scope and billing currency. Ad spend is separate where applicable.</p>
        </header>
      </div>

      <div className={styles.globe}>{globe}</div>

      <div className={styles.wrap}>
        <div className={styles.currencyPanel}>
          <h3><Globe2 size={19} aria-hidden="true" /> Display currency</h3>
          <div className={styles.currencies} role="group" aria-label="Display currency">
            {currencies.map(([code, name]) => (
              <button key={code} type="button" aria-pressed={currency === code}
                onClick={() => void selectCurrency(code)}>
                <strong>{code}</strong><span>{name}</span>
              </button>
            ))}
          </div>
          <p className={styles.rateNote} role="status">
            {status || (currency === "USD" ? "Planning ranges in USD." :
              "Approximate " + currency + " estimates · rate dated " + rates?.date + " (UTC).")}
          </p>
          {currency !== "USD" && (
            <a className={styles.attribution} href="https://www.exchangerate-api.com">Rates by ExchangeRate-API</a>
          )}
        </div>

        <div className={styles.catalog}>
          <div className={styles.groups} role="group" aria-label="Service groups">
            {groups.map(({ name }, index) => (
              <button key={name} type="button" aria-pressed={index === activeGroup}
                aria-controls="sample-service-ranges" onClick={() => setActiveGroup(index)}>
                {name}
              </button>
            ))}
          </div>
          <div id="sample-service-ranges" className={styles.ledger} aria-label={group.name}>
            {group.rows.map(([service, range, billing, timing, scope]) => (
              <details key={service} className={styles.entry}>
                <summary>
                  <span className={styles.service}>{service}</span>
                  <span className={styles.amount} key={currency}>{convertRange(range, currency, rates)}</span>
                  <span className={styles.billing}>{billing}</span>
                  <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
                </summary>
                <div className={styles.details}>
                  <p><strong>Deliverables</strong>{scope}</p>
                  <p><strong>Estimated timing</strong>{timing}</p>
                  <a href={"/contact?request=" + encodeURIComponent(service + " quote") + "#request-proposal"} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
                    Request a quote 
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
