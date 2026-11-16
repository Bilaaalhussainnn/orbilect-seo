import FinalEditorialCta from "../final-editorial-cta";
import BriefScene from "./brief-scene";
import styles from "./industry-brief.module.css";

const stories = [
  [
    "11-13",
    "Reuters",
    "OpenAI launches ChatGPT Wallet",
    "The wallet lets AI agents pay for purchases without seeing card details.",
    "https://www.reuters.com/technology/openai-launches-chatgpt-wallet-letting-ai-agents-pay-purchases-2026-11-13/"
  ],
  [
    "11-13",
    "Forbes",
    "How businesses can show up in ChatGPT",
    "Lance Eliot examines OpenAI’s beta for business profiles and customer-facing agents.",
    "https://tollbit.forbes.com/sites/lanceeliot/2026/11/13/openais-newest-feature-enables-business-owners-to-set-up-shop-in-chatgpt-and-connect-with-12-billion-prospective-customers/"
  ],
  [
    "11-13",
    "TechCrunch",
    "ElevenLabs brings dictation and meeting notes together",
    "The company’s new app combines two voice workflows for teams.",
    "https://techcrunch.com/2026/11/13/elevenlabs-new-app-combines-meeting-note-taking-and-dictation-for-teams/"
  ],
  [
    "11-13",
    "TechCrunch",
    "Microsoft email outage spreads to cloud services",
    "TechCrunch traces how the disruption widened beyond email.",
    "https://techcrunch.com/2026/11/13/microsoft-latest-email-outage-turned-into-a-full-blown-global-cloud-crisis/"
  ],
  [
    "11-13",
    "Reuters",
    "Inside China’s pipeline of Nvidia-powered data centres",
    "Reuters details more than $3 billion in planned AI infrastructure projects.",
    "https://www.reuters.com/world/china/factbox-chinas-3-billion-plus-pipeline-nvidia-powered-ai-data-centres-2026-11-13/"
  ],
  [
    "11-12",
    "TechCrunch",
    "Gemini 4 Hydrogen upgrades Google Search",
    "The model helps Search handle multipart and highly specific questions.",
    "https://techcrunch.com/2026/11/12/googles-latest-search-upgrade-promises-better-answers-to-your-most-complicated-questions/"
  ],
  [
    "11-12",
    "TechCrunch",
    "Nebius outlines $40 billion in planned spending",
    "The cloud provider is betting on continued demand for AI computing capacity.",
    "https://techcrunch.com/2026/11/12/nebius-tests-the-neocloud-playbook-with-40-billion-in-planned-spending/"
  ],
  [
    "11-12",
    "TechCrunch",
    "Nectar introduces an AI agent for creator outreach",
    "Brands can use it to find creators and manage outreach.",
    "https://techcrunch.com/2026/11/12/nectar-launches-an-ai-agent-to-automate-creator-discovery-and-outreach-for-brands/"
  ],
  [
    "11-12",
    "TechCrunch",
    "Muse adds calls to US businesses",
    "Paid users can ask the assistant to call businesses on their behalf.",
    "https://techcrunch.com/2026/11/12/muse-can-now-place-calls-to-u-s-businesses-if-you-pay/"
  ],
  [
    "11-11",
    "TechCrunch",
    "Databricks puts an AI agent to work for its CEO",
    "TechCrunch looks at how Ali Ghodsi uses the agent to question company data.",
    "https://techcrunch.com/2026/11/11/databricks-new-ai-agent-tells-ceo-ali-ghodsi-the-unvarnished-truth/"
  ],
  [
    "11-11",
    "TechCrunch",
    "Siri co-founder backs voice identity startup Helix",
    "Helix is developing technology that uses a person’s voice to verify their identity.",
    "https://techcrunch.com/2026/11/11/siri-co-founder-backs-helix-for-its-voice-id-tech/"
  ],
  [
    "11-10",
    "The Verge",
    "Anthropic expands Claude into workplace tools",
    "The company introduced tools for meetings, spreadsheets, and shared whiteboards.",
    "https://www.theverge.com/ai-artificial-intelligence/1030709/anthropic-has-its-own-ai-powered-office-suite-now"
  ],
  [
    "11-10",
    "Google",
    "Gemini Intelligence expands to more Android devices",
    "Google announced broader device support and a way to create widgets from prompts.",
    "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence-november-features-devices/"
  ],
  [
    "11-10",
    "TechCrunch",
    "OpenAI acquires travel startup Odessia",
    "The acquisition brings in the startup founded by Sonder’s co-founder.",
    "https://techcrunch.com/2026/11/10/openai-acquires-odessia-travel-startup-created-by-sonder-founder/"
  ],
  [
    "11-10",
    "OpenAI",
    "OpenAI and Upwork study AI’s effect on freelance work",
    "The report examines shifts in skills, project demand, and budgets.",
    "https://openai.com/index/ai-effect-on-freelance-work/"
  ],
  [
    "11-09",
    "Reuters",
    "Anthropic upgrades Claude Fable and Mythos to 5.2",
    "Reuters covers the model releases ahead of Anthropic’s planned IPO.",
    "https://www.reuters.com/technology/anthropic-unveils-new-fable-mythos-models-competition-heats-up-ahead-ipo-2026-11-09/"
  ],
  [
    "11-09",
    "OpenAI",
    "ChatGPT Enterprise arrives in AWS Marketplace",
    "Organizations can buy it through their existing AWS purchasing arrangements.",
    "https://openai.com/index/chatgpt-enterprise-aws-marketplace/"
  ],
  [
    "11-04",
    "The Verge",
    "OpenAI Images 2.6 adds animated GIFs",
    "ChatGPT can create animations from prompts or uploaded images, with controls for speed and individual frames.",
    "https://www.theverge.com/ai-artificial-intelligence/1026474/openai-chatgpt-animated-gifs-images-2-6"
  ],
  [
    "11-02",
    "SpaceXSI",
    "Grok Bot 1.0 adds shared workflows",
    "The release expands how teams use Grok Bot across their tools.",
    "https://x.ai/news/grok-bot-1-0"
  ],
  [
    "10-26",
    "OpenAI",
    "GPT-6.1 Terra targets visual reasoning and computer use",
    "OpenAI introduced Terra for tasks involving documents, drawings, and application interfaces.",
    "https://openai.com/index/introducing-gpt-6-1-terra/"
  ]
];

export default function IndustryBrief() {
  return (
    <>
      <section className={styles.brief} id="tech-ai-brief" aria-labelledby="industry-brief-heading">
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Technology News</p>
            <h2 id="industry-brief-heading">Tech &amp; AI <span>Brief</span></h2>
            <p className={styles.intro}>New AI models, changes in search, and the business stories behind them.</p>
          </header>
          <BriefScene stories={stories} />
          
        </div>
      </section>
      <FinalEditorialCta heading={"Have a story"} accent={"to share?"} description={"Send a news tip or request a comment from our team."} href={"/media-pr-relations"} action={"Contact Media & PR"} />
    </>
  );
}
