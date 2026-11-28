const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  module._compile(outputText, filename);
};

const { answer } = require("../src/lib/naila/answers.ts");
const { closingMessage, declinesHelp } = require("../src/lib/naila/conversation.ts");

const isClosing = Symbol("close the session");
const pricing = "/pricing#pricing-checklist";
const freeAudit = "/#free-audit";
const staffing = "/staffing#customer-support-offshoring";
const privacy = "/privacy-policy";
const terms = "/terms-and-conditions";

// Each row is a visitor turn, a required reply fragment or close event, and an optional source link.
const flows = [
  ["Budget and discount conversation", [
    ["How are you?", /ready to help/i],
    ["I need help with SEO", /new website found/i, freeAudit],
    ["Can I get a discount?", /can’t approve a discount/i, "/contact#request-proposal"],
    ["What information do you need from me?", /website URL/i],
    ["That’ll be all", isClosing],
  ]],
  ["Restaurant discovery and next step", [
    ["I run a restaurant", /menus, local discovery/i, "/industries/food-beverages"],
    ["Do you offer website redesign?", /redesign your website/i, "/services/website-redesign"],
    ["I already have a website", /current URL/i],
    ["How do I get started?", /product strategists/i, "/contact#request-proposal"],
    ["I don't need any further help", isClosing],
  ]],
  ["Help greeting", [
    ["Hey I need help", /^Sure, I’m here to help\. What do you need help with\?$/, "/services"],
    ["Do you do FREE audits?", /free SEO audit/i, freeAudit],
    ["That’ll be all", isClosing],
  ]],
  ["What an audit costs", [
    ["Do you offer a free SEO audit?", /free SEO audit/i, freeAudit],
    ["What’s the cost of that?", /free SEO audit/i, freeAudit],
  ]],
  ["Essential plan across a short exchange", [
    ["How much is Essential SEO?", /1,500 USD/, pricing],
    ["Sounds good!", /sounds good/i],
    ["What's the cost of that?", /1,500 USD/, pricing],
  ]],
  ["Starter plan after an acknowledgement", [
    ["How much is Starter SEO?", /650 USD/, pricing],
    ["Great, thanks.", /sounds good/i],
    ["And how much?", /650 USD/, pricing],
  ]],
  ["Switch from Essential to Starter", [
    ["How much does Essential SEO cost?", /1,500 USD/, pricing],
    ["How much does Starter SEO cost?", /^((?!1,500).)*650 USD/i, pricing],
  ]],
  ["Ask what the visitor means", [
    ["Hey, can you help?", /what do you need help with/i, "/services"],
    ["What’s the cost of that?", /which service or plan/i],
  ]],
  ["Switch from audit to a paid campaign", [
    ["Can I get a free audit?", /free SEO audit/i, freeAudit],
    ["Can you help with Google Ads?", /paid search/i, "/services/ppc-management"],
    ["How much does it cost?", /quote based on/i, pricing],
  ]],
  ["Digital marketing goal", [
    ["What is digital marketing?", /online channels/i, "/services/digital-marketing"],
    ["I want more leads", /what do you sell/i, "/services/digital-marketing"],
    ["And how much?", /quote based on/i, pricing],
  ]],
  ["Where to start with digital marketing", [
    ["Digital marketing", /search, social media, paid ads, and email/i, "/services/digital-marketing"],
    ["What would you do first?", /one goal/i, "/services/digital-marketing"],
  ]],
  ["Digital marketing price is scoped", [
    ["Can you explain digital marketing?", /online channels/i, "/services/digital-marketing"],
    ["What about the cost?", /quote based on/i, pricing],
  ]],
  ["Website redesign and price", [
    ["Can you redesign my website?", /work[s]? on mobile/i, "/services/website-redesign"],
    ["How much would that cost?", /quote based on/i, pricing],
  ]],
  ["Shopify build and pricing", [
    ["Do you build Shopify stores?", /build a Shopify site/i],
    ["What’s the price?", /for Shopify work/i, pricing],
  ]],
  ["Customer support staffing", [
    ["I need help with staffing", /affordable offshore/i, staffing],
    ["How much does it cost?", /hourly budget/i, staffing],
  ]],
  ["Multilingual coverage", [
    ["What roles can I offshore in customer support?", /offshore/i, staffing],
    ["Can an offshore support agent work in more than one language?", /language|fluency/i, staffing],
  ]],
  ["Ecommerce support and chatbots", [
    ["What does ecommerce customer support handle?", /product|orders/i, "/services/ecommerce-management#ecommerce-support"],
    ["Can you build a chatbot for my online store?", /approved product/i, "/services/ecommerce-management#ecommerce-support"],
  ]],
  ["Agentic AI and provider fees", [
    ["What can agentic AI automate in ecommerce?", /approved multi-step tasks/i, "/services/ecommerce-management#agentic-ai-development"],
    ["What about the pricing?", /usage|licensing|costs more/i, terms + "#agentic-ai-fees"],
  ]],
  ["Jobs and application instructions", [
    ["I’m looking for a job", /vacancies/i, "/careers#openings"],
    ["Where can I send my CV?", /listing will tell you/i, "/careers#openings"],
    ["That will be all for now, thank you", isClosing],
  ]],
  ["Callback request", [
    ["Call me", /product experts.*within the next 24 hours.*full name/i],
    ["Thank you", /you’re welcome/i],
  ]],
  ["Website knowledge and privacy", [
    ["Can you read your entire website?", /public pages in our sitemap/i, privacy],
    ["Please send me your privacy policy", /published page/i, privacy],
    ["What personal data do you collect?", /hosting and security services|when you request/i, privacy + "#information"],
  ]],
  ["Privacy request", [
    ["Show me your privacy policy", /published page/i, privacy],
    ["How can I delete my personal data?", /depending on where you live/i, privacy + "#rights"],
  ]],
  ["Data retention", [
    ["Privacy policy", /published page/i, privacy],
    ["How long do you keep my personal data?", /as long as reasonably needed/i, privacy + "#retention"],
  ]],
  ["Analytics cookie options", [
    ["What are cookies?", /small text files/i, privacy + "#cookies"],
    ["How do I disable optional analytics cookies?", /start disabled|cookie settings/i, privacy + "#cookies"],
  ]],
  ["Payment options and card details", [
    ["How can I pay?", /bank transfers|paypal/i, terms + "#fees"],
    ["Will your staff ever ask for my full card number?", /staff never ask/i, terms + "#fees"],
  ]],
  ["Terms and NDA", [
    ["Where can I read the Terms and Conditions?", /published page/i, terms],
    ["What does the NDA cover?", /covers confidentiality/i, terms + "#agreement"],
  ]],
  ["Recurring invoice and grace day", [
    ["How do recurring payments work?", /30 days|30.day/i, terms + "#recurring-and-late-payments"],
    ["Is day 31 a grace period?", /final grace day/i, terms + "#recurring-and-late-payments"],
  ]],
  ["Support scope", [
    ["Can I see your Terms and Conditions?", /published page/i, terms],
    ["How long does bug support last?", /12 months/i, terms + "#support"],
  ]],
  ["Sitemap and indexing", [
    ["Can you help me submit my sitemap?", /search console|webmaster tools/i],
    ["Why isn’t my website showing on Google?", /crawl|index/i],
  ]],
  ["Business Profile and audit", [
    ["Can you help me set up Google Business Profile?", /create or claim/i, "/blogs/how-to-set-up-your-google-business-profile"],
    ["Can I request a free audit?", /free SEO audit/i, freeAudit],
  ]],
  ["Review and finish", [
    ["Can I leave a review of your services?", /review Orbilect SEO/i, "/reviews#review-platforms"],
    ["No thanks, that’s all", isClosing],
  ]],
  ["Decline further help politely", [
    ["I need help", /what do you need help with/i, "/services"],
    ["I don’t need any further help, thanks.", isClosing],
  ]],
  ["Continue when declining one option", [
    ["I don’t need an audit. What’s the price of Essential SEO?", /1,500 USD/, pricing],
    ["Can you help with paid search?", /paid search/i, "/services/ppc-management"],
    ["Thank you, that’ll be all.", isClosing],
  ]],
  ["Goodbye after a topic change", [
    ["What's the estimated cost of website redesign?", /quote based on/i, pricing],
    ["Do you offer free SEO audits?", /free SEO audit/i, freeAudit],
    ["Goodbye!", isClosing],
  ]],
  ["Explicit close after help", [
    ["Can you help me?", /what do you need help with/i, "/services"],
    ["Please close this chat.", isClosing],
  ]],
];

const transcript = ["# Naila conversation examples", ""];
for (const [title, turns] of flows) {
  const history = [];
  transcript.push("## " + title, "");
  for (const [question, expected, href] of turns) {
    const label = title + " — " + question;
    const closes = declinesHelp(question);
    assert.equal(closes, expected === isClosing, label);
    const reply = closes ? { text: closingMessage } : answer(question, false, history.slice(-5));
    if (!closes) {
      assert.match(reply.text, expected, label);
      if (href) assert.ok(reply.actions?.some(action => action.href === href), label + " → " + href);
    }
    transcript.push("**Visitor**", "", question, "", "**Naila**", "", reply.text, "");
    for (const action of reply.actions ?? []) {
      const url = action.href.startsWith("/") ? "https://orbilectseo.com" + action.href : action.href;
      transcript.push("[" + action.text + "](" + url + ")", "");
    }
    if (closes) transcript.push("*Naila closes the session after displaying the farewell.*", "");
    history.push(question);
  }
}

if (process.argv.includes("--markdown")) process.stdout.write(transcript.join("\n").trimEnd() + "\n");
else console.log("Passed " + flows.length + " Naila conversation flows and " + flows.reduce((count, [, turns]) => count + turns.length, 0) + " visitor turns.");
