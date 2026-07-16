"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Audience = "buyer" | "client" | "team" | "founder";
type Maturity = "concept" | "pilot" | "shipping";
type Proof = "demo" | "story" | "numbers" | "taste";

type Preset = {
  label: string;
  icon: string;
  idea: string;
  claim: string;
  audience: Audience;
  maturity: Maturity;
  proof: Proof;
  evidence: string;
  worry: string;
};

type ObjectionCard = {
  title: string;
  severity: "high" | "medium" | "watch";
  reason: string;
  answer: string;
};

type Atlas = {
  headline: string;
  stance: string;
  saferClaim: string;
  objections: ObjectionCard[];
  proofGap: string;
  tomorrowTest: string;
  talkTrack: string[];
};

const presets: Preset[] = [
  {
    label: "Client offer",
    icon: "◫",
    idea: "A focused design sprint productized service that helps a founder sharpen one confused launch page in two days.",
    claim: "We can turn a rough launch page into something clearer and more credible in one small sprint.",
    audience: "client",
    maturity: "pilot",
    proof: "story",
    evidence: "A few before-and-after examples, clear screenshots, and notes on what got removed.",
    worry: "It might sound tasteful but still too subjective to buy quickly.",
  },
  {
    label: "Internal tool",
    icon: "△",
    idea: "A tiny browser tool that turns scattered meeting notes into a next-action digest for a small team.",
    claim: "It cuts recap time and gives everyone the same next-three actions.",
    audience: "team",
    maturity: "concept",
    proof: "demo",
    evidence: "A rough walkthrough and one fake but realistic example run.",
    worry: "People may say the current process is messy but good enough.",
  },
  {
    label: "Portfolio wedge",
    icon: "◎",
    idea: "A calm web app that helps founders map the objections blocking a purchase or yes.",
    claim: "It helps a founder find the exact doubt to answer before polishing the pitch.",
    audience: "founder",
    maturity: "shipping",
    proof: "taste",
    evidence: "A live build, one clean screen, and language that feels disciplined instead of noisy.",
    worry: "It could still feel like nice framing without a clear business use.",
  },
];

const audienceNotes: Record<Audience, { lens: string; ask: string; pressure: string }> = {
  buyer: {
    lens: "Reduce risk before raising ambition.",
    ask: "Offer a low-friction trial or one-page walkthrough.",
    pressure: "They need the promise to feel worth switching for.",
  },
  client: {
    lens: "Make the before-and-after legible.",
    ask: "Invite a small paid pilot tied to one concrete page or workflow.",
    pressure: "They need proof this is not just nicer language around the same work.",
  },
  team: {
    lens: "Show what friction disappears on Monday morning.",
    ask: "Ask for a one-week internal trial in one recurring loop.",
    pressure: "They need to see fewer handoffs or less backtracking.",
  },
  founder: {
    lens: "Give them a clearer decision surface, not more material.",
    ask: "Suggest using it on one live offer or launch note tonight.",
    pressure: "They need the result to sharpen action, not just reflection.",
  },
};

const maturityNotes: Record<Maturity, { scope: string; risk: string }> = {
  concept: {
    scope: "Keep the claim narrow and concrete because the product is still mostly a promise.",
    risk: "The main objection is that the value is still hypothetical.",
  },
  pilot: {
    scope: "Anchor the claim in one repeatable transformation, not in future platform vision.",
    risk: "The main objection is that the result may be real but too custom or fragile.",
  },
  shipping: {
    scope: "Lead with the strongest repeatable use case and avoid sounding broader than the current proof.",
    risk: "The main objection is that the tool may be elegant but not essential yet.",
  },
};

const proofNotes: Record<Proof, { strongest: string; missing: string; demo: string }> = {
  demo: {
    strongest: "a short run from messy input to calmer output",
    missing: "a walkthrough that proves the core interaction in under a minute",
    demo: "Record or narrate one crisp input → decision → output sequence.",
  },
  story: {
    strongest: "a believable before-and-after story with constraints named",
    missing: "a concrete story where the change is obvious and specific",
    demo: "Show the rough starting point next to the tighter finished result.",
  },
  numbers: {
    strongest: "one metric that proves less friction, more speed, or better conversion",
    missing: "a single number strong enough to carry the promise",
    demo: "Show the number in context, then explain what caused the change.",
  },
  taste: {
    strongest: "visible restraint and a more credible finish than the noisy default",
    missing: "evidence that the polish changes trust or clarity, not just aesthetics",
    demo: "Pair the interface with a plain-language explanation of the decision it improves.",
  },
};

function compact(input: string, max = 58) {
  const trimmed = input.trim();
  if (!trimmed) return "Untitled idea";
  return trimmed.length > max ? `${trimmed.slice(0, max).trim()}…` : trimmed;
}

function buildAtlas(params: {
  idea: string;
  claim: string;
  audience: Audience;
  maturity: Maturity;
  proof: Proof;
  evidence: string;
  worry: string;
}) {
  const { idea, claim, audience, maturity, proof, evidence, worry } = params;
  const audienceGuide = audienceNotes[audience];
  const maturityGuide = maturityNotes[maturity];
  const proofGuide = proofNotes[proof];
  const title = compact(idea);
  const claimLine = claim.trim();
  const evidenceLine = evidence.trim();
  const worryLine = worry.trim();

  const objections: ObjectionCard[] = [
    {
      title: "Why this now?",
      severity: maturity === "concept" ? "high" : "medium",
      reason:
        maturity === "concept"
          ? "Right now the promise may still sound like a smart idea rather than a finished advantage."
          : "The value is visible, but the urgency may still feel optional.",
      answer: `Answer with one immediate use case and one visible win. ${audienceGuide.pressure}`,
    },
    {
      title: "Can I trust the claim?",
      severity: proof === "numbers" ? "medium" : "high",
      reason: `The claim needs support from ${proofGuide.strongest}, not just adjectives.` ,
      answer: `Lead with ${proofGuide.strongest}, then say what remains intentionally small or constrained.`,
    },
    {
      title: "Is this smaller than the old pain?",
      severity: worryLine.toLowerCase().includes("subjective") || worryLine.toLowerCase().includes("good enough") ? "high" : "watch",
      reason: worryLine || "A quiet objection is still present even if no one says it aloud.",
      answer: `Name the current workaround, then show why this is simpler, clearer, or faster to repeat.`,
    },
  ];

  return {
    headline: title,
    stance: `${audienceGuide.lens} ${maturityGuide.scope}`,
    saferClaim: `${claimLine.replace(/\.$/, "")}. More specifically: solve one obvious moment of hesitation before trying to sound comprehensive.`,
    objections,
    proofGap: `Current evidence: ${evidenceLine || "none named yet"}. The missing proof is ${proofGuide.missing}. ${maturityGuide.risk}`,
    tomorrowTest: `${proofGuide.demo} Then ask one ${audience} whether the output feels easier to say yes to than the current version.`,
    talkTrack: [
      `Start with the existing friction: ${worryLine || "the decision still feels harder than it should."}`,
      `State the safer claim in one breath, then show the strongest proof artifact immediately.`,
      `Close with the next ask: ${audienceGuide.ask}`,
    ],
  } satisfies Atlas;
}

function SeverityMark({ severity }: { severity: ObjectionCard["severity"] }) {
  return <span className={severity === "high" ? styles.markHigh : severity === "medium" ? styles.markMedium : styles.markWatch} />;
}

export default function Home() {
  const [idea, setIdea] = useState(presets[2].idea);
  const [claim, setClaim] = useState(presets[2].claim);
  const [audience, setAudience] = useState<Audience>(presets[2].audience);
  const [maturity, setMaturity] = useState<Maturity>(presets[2].maturity);
  const [proof, setProof] = useState<Proof>(presets[2].proof);
  const [evidence, setEvidence] = useState(presets[2].evidence);
  const [worry, setWorry] = useState(presets[2].worry);
  const [submitted, setSubmitted] = useState({
    idea: presets[2].idea,
    claim: presets[2].claim,
    audience: presets[2].audience,
    maturity: presets[2].maturity,
    proof: presets[2].proof,
    evidence: presets[2].evidence,
    worry: presets[2].worry,
  });

  const atlas = useMemo(() => buildAtlas(submitted), [submitted]);

  function applyPreset(preset: Preset) {
    setIdea(preset.idea);
    setClaim(preset.claim);
    setAudience(preset.audience);
    setMaturity(preset.maturity);
    setProof(preset.proof);
    setEvidence(preset.evidence);
    setWorry(preset.worry);
    setSubmitted({
      idea: preset.idea,
      claim: preset.claim,
      audience: preset.audience,
      maturity: preset.maturity,
      proof: preset.proof,
      evidence: preset.evidence,
      worry: preset.worry,
    });
  }

  function handleSubmit() {
    setSubmitted({ idea, claim, audience, maturity, proof, evidence, worry });
  }

  return (
    <main className={styles.shell}>
      <section className={styles.frame}>
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <p className={styles.kicker}>Night studio / objection discipline</p>
            <h1 className={styles.title}>Objection Atlas</h1>
            <p className={styles.subtitle}>
              A quiet one-screen utility for finding the exact doubt blocking a yes, then rewriting the pitch around proof instead of hope.
            </p>
          </div>
          <aside className={styles.headerSide}>
            <p className={styles.sideLabel}>Cue sheet</p>
            <ul>
              <li>One dominant input surface.</li>
              <li>Three objections, not twelve tips.</li>
              <li>Primary action: map objections.</li>
            </ul>
          </aside>
        </header>

        <section className={styles.presetStrip}>
          {presets.map((preset) => (
            <button key={preset.label} type="button" className={styles.presetCard} onClick={() => applyPreset(preset)}>
              <span className={styles.presetIcon}>{preset.icon}</span>
              <span>
                <strong>{preset.label}</strong>
                <small>{preset.claim}</small>
              </span>
            </button>
          ))}
        </section>

        <div className={styles.grid}>
          <section className={styles.editor}>
            <div className={styles.sectionTop}>
              <div>
                <p className={styles.sectionLabel}>Input</p>
                <h2>Map the doubt before polishing the pitch.</h2>
              </div>
              <button type="button" className={styles.primaryButton} onClick={handleSubmit}>
                Map objections
              </button>
            </div>

            <label className={styles.field}>
              <span>The thing you are trying to sell, ship, or get approved</span>
              <textarea rows={4} value={idea} onChange={(event) => setIdea(event.target.value)} />
            </label>

            <label className={styles.field}>
              <span>Your current strongest claim</span>
              <textarea rows={3} value={claim} onChange={(event) => setClaim(event.target.value)} />
            </label>

            <div className={styles.controls}>
              <div className={styles.controlBlock}>
                <p>Audience</p>
                <div className={styles.optionRow}>
                  {(["buyer", "client", "team", "founder"] as Audience[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={audience === value ? styles.optionActive : styles.option}
                      onClick={() => setAudience(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.controlBlock}>
                <p>Proof you mostly have</p>
                <div className={styles.optionRow}>
                  {(["demo", "story", "numbers", "taste"] as Proof[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={proof === value ? styles.optionActive : styles.option}
                      onClick={() => setProof(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.controlBlock}>
                <p>Maturity</p>
                <div className={styles.optionRow}>
                  {(["concept", "pilot", "shipping"] as Maturity[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={maturity === value ? styles.optionActive : styles.option}
                      onClick={() => setMaturity(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <label className={styles.field}>
              <span>What evidence can you honestly point to right now?</span>
              <textarea rows={3} value={evidence} onChange={(event) => setEvidence(event.target.value)} />
            </label>

            <label className={styles.field}>
              <span>What worry keeps surfacing underneath the pitch?</span>
              <textarea rows={3} value={worry} onChange={(event) => setWorry(event.target.value)} />
            </label>

            <div className={styles.footNote}>
              <p className={styles.sectionLabel}>Rule</p>
              <p>If the claim gets bigger when the evidence gets thinner, make the claim smaller.</p>
            </div>
          </section>

          <aside className={styles.rail}>
            <section className={styles.heroCard}>
              <p className={styles.sectionLabel}>Atlas</p>
              <h2>{atlas.headline}</h2>
              <p>{atlas.stance}</p>
            </section>

            <section className={styles.resultCard}>
              <p className={styles.sectionLabel}>Safer wording</p>
              <p>{atlas.saferClaim}</p>
            </section>

            <section className={styles.resultCard}>
              <p className={styles.sectionLabel}>Top objections</p>
              <div className={styles.objectionList}>
                {atlas.objections.map((item) => (
                  <article key={item.title} className={styles.objectionCard}>
                    <div className={styles.objectionHeader}>
                      <div className={styles.objectionTitle}>
                        <SeverityMark severity={item.severity} />
                        <h3>{item.title}</h3>
                      </div>
                      <span className={styles.objectionTag}>{item.severity}</span>
                    </div>
                    <p>{item.reason}</p>
                    <strong>{item.answer}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.resultCard}>
              <p className={styles.sectionLabel}>Proof gap</p>
              <p>{atlas.proofGap}</p>
            </section>

            <section className={styles.resultCard}>
              <p className={styles.sectionLabel}>Tomorrow test</p>
              <p>{atlas.tomorrowTest}</p>
            </section>

            <section className={styles.resultCard}>
              <p className={styles.sectionLabel}>Talk track</p>
              <ol className={styles.talkTrack}>
                {atlas.talkTrack.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
