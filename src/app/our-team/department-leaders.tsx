import styles from "./department-leaders.module.css";

const leaders = [
  {
    name: "Shahzad Afridi",
    role: "Head of Products",
    portrait: "shahzad-afridi.png",
    message: "I ask our product team to start with what users are trying to get done and where they get stuck. That gives design and engineering a shared brief and helps us decide what to build first. After launch, we look at how people actually use the product and let that inform the next release.",
    quote: "A feature earns its place when it makes something easier for the people using it.",
  },
  {
    name: "Ali Ahmed Farooqui",
    role: "Client Acquisition & Strategy Lead",
    portrait: "ali-ahmed-farooqui.png",
    message: "The first client conversation should give us a clear picture of the business, the customers it wants to reach, and what it needs to improve. From there, I work with our delivery teams to recommend where to start, what the engagement will involve, and how we’ll measure progress. By kickoff, both sides should know what they’re working toward.",
    quote: "A good proposal makes it clear what we’ll do first, why it matters, and how we’ll know it helped.",
  },
  {
    name: "Bilal Ahmed",
    role: "HR & Talent Acquisition Lead",
    portrait: "bilal-ahmed.png",
    message: "Good hiring starts with a clear role and a fair way to assess candidates. I want every candidate to understand what we’re looking for and have a meaningful chance to show how they work. Once someone joins, our job is to give them a clear brief, useful feedback, and room to grow.",
    quote: "Hiring opens the door. Clear expectations and good coaching help people do their best work.",
  },
  {
    name: "Abdul Ghaffar",
    role: "Head of Media & PR",
    portrait: "abdul-ghaffar.png",
    message: "My job is to help people understand what Orbilect is building and why it matters. Whether we’re preparing a company announcement or responding to a journalist, I want us to explain the work in plain language and back up what we say. That gives people something they can understand, verify, and share accurately.",
    quote: "A story is ready to share when we can explain why it matters and stand behind every claim.",
  },
];

export default function DepartmentLeaders() {
  return (
    <section className={styles.section} aria-labelledby="department-leaders-title">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <h2 id="department-leaders-title">Meet the <span>department leaders</span></h2>
        </header>

        <div className={styles.grid}>
          {leaders.map(({ name, role, portrait, message, quote }) => (
            <article key={name} className={styles.card}>
              <div className={styles.portrait}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/team/${portrait}`} alt={name} loading="lazy" decoding="async" />
              </div>
              <header className={styles.identity}>
                <h3>{name}</h3>
                <p>{role}</p>
              </header>
              <div className={styles.copy}>
                <p>{message}</p>
                <blockquote>“{quote}”</blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
