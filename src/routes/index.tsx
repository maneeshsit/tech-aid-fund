import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Heart, Landmark, Shield, Sparkles, Users, Cpu, HandCoins } from "lucide-react";
import heroImg from "@/assets/hero-pioneers.jpg";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { TierCard } from "@/components/tier-card";
import { getTiers } from "@/server/tiers.functions";

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => getTiers(),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <Button
            className="mt-6"
            variant="outlineGold"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/" className="text-gold underline">
        Go home
      </Link>
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Paul Allen and Alan Turing — A solidarity tax for technologists" },
      {
        name: "description",
        content:
          "Pay the Paul Allen & Alan Turing Tax. Pool funds to support displaced IT and hi-tech professionals through IEEE and engineering associations.",
      },
      { property: "og:title", content: "Paul Allen and Alan Turing" },
      {
        property: "og:description",
        content: "A community-funded bridge for engineers between jobs.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
});

function Index() {
  const { tiers, error } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <Stats />
      <Mission />
      <HowItWorks />
      <Tiers tiers={tiers} error={error} />
      <Faq />
      <CtaBand />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-primary-foreground">
      <div className="absolute inset-0 bg-radial-glow opacity-80" />
      <div className="container relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" /> A solidarity pool, by builders
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient-gold">Paul Allen</span> and{" "}
            <span className="text-gradient-gold">Alan Turing</span> Tax.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
            A voluntary contribution from working technologists into a trust pool that funds
            short-term support for IT and hi-tech professionals between jobs — disbursed through
            IEEE, ACM, and partner engineering associations.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/pledge">
                Start your pledge <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <a
              href="#how"
              className="text-sm font-medium text-primary-foreground/80 underline-offset-4 hover:text-gold hover:underline"
            >
              How the trust works →
            </a>
          </div>
          <p className="mt-8 text-xs text-primary-foreground/50">
            100% of contributions enter the pool. Operations are funded separately.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gold/20 blur-3xl" />
          <img
            src={heroImg}
            alt="Stylized portraits of computing pioneers in golden circuitry"
            width={1536}
            height={1024}
            className="relative rounded-3xl border border-gold/20 shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "$1.2M", label: "Pooled to date" },
    { value: "847", label: "Engineers supported" },
    { value: "12", label: "Partner associations" },
    { value: "94%", label: "Returned to work in 90 days" },
  ];
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="container mx-auto max-w-4xl px-6 py-24 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Our mission
      </span>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
        The people who build the future deserve a safety net the future built itself.
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Layoffs in technology are cyclical, but careers are not. Paul Allen and Alan Turing collects
        small, recurring contributions from working engineers — a "tax" of solidarity — and
        channels them into short-term grants for peers between roles. We honor{" "}
        <span className="font-medium text-foreground">Paul Allen's</span> philanthropic legacy and{" "}
        <span className="font-medium text-foreground">Alan Turing's</span> conviction that
        technology must serve humanity first.
      </p>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: HandCoins,
      title: "You pledge",
      body: "Choose a tier — Apprentice to Patron — or set your own monthly amount. Cancel any time.",
    },
    {
      icon: Landmark,
      title: "Funds pool in the trust",
      body: "Contributions enter a transparent, audited pool governed by elected technologist trustees.",
    },
    {
      icon: Users,
      title: "Associations distribute",
      body: "IEEE, ACM, and partners disburse short-term bridge grants directly to vetted recipients.",
    },
    {
      icon: Cpu,
      title: "Engineers get back to building",
      body: "Recovered professionals re-enter the workforce — and many become contributors themselves.",
    },
  ];
  return (
    <section id="how" className="bg-secondary/40 py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            How it works
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
            From pledge to peer support, in four steps.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-spring hover:-translate-y-1 hover:border-gold/40 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-gold">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step {i + 1}
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tiers({
  tiers,
  error,
}: {
  tiers: { id: string; name: string; tagline: string; amount: number; cadence: string; perks: string[]; featured: boolean }[];
  error: string | null;
}) {
  return (
    <section id="tiers" className="container mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Pledge tiers
        </span>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
          Choose what your tax should be.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every tier funds a measurable amount of bridge support. Pick one that reflects your
          career stage and conviction.
        </p>
      </div>
      {error ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">{error}</p>
      ) : (
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      )}
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "Is this a registered charity?",
      a: "Paul Allen and Alan Turing operates as a non-profit fiduciary pool. Disbursements flow through IEEE and partner 501(c)(3) associations who handle direct beneficiary support.",
    },
    {
      q: "Who qualifies for support?",
      a: "Any IT or hi-tech professional who has been displaced from their role within the last 6 months, verified through a partner association's standard process.",
    },
    {
      q: "Can I cancel my pledge?",
      a: "Yes — anytime, no questions asked. We believe solidarity should never feel like a trap.",
    },
    {
      q: "Where does my money actually go?",
      a: "100% of contributions enter the pool. Trust operations, payment fees, and platform costs are funded by separate sponsoring partners.",
    },
    {
      q: "Why 'Paul Allen' and 'Turing'?",
      a: "Allen represents technologists giving back through philanthropy. Turing represents the conviction that the work matters because the people do.",
    },
  ];
  return (
    <section id="faq" className="bg-secondary/40 py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-border bg-card p-6 shadow-card-soft transition-smooth open:border-gold/40"
            >
              <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-semibold">
                {item.q}
                <span className="text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-primary-foreground">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="container relative mx-auto max-w-3xl px-6 text-center">
        <Heart className="mx-auto h-10 w-10 text-gold" />
        <h2 className="mt-6 font-display text-4xl font-semibold md:text-5xl">
          Build the safety net you'd want to land in.
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/75">
          Five dollars a month from enough of us is a career-saving grant for someone else.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild variant="hero" size="xl">
            <Link to="/pledge">
              Pledge now <Shield className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
