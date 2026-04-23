import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Lock, Shield } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { createPledge, getTiers, type TierRecord } from "@/server/tiers.functions";
import { cn } from "@/lib/utils";

type PledgeSearch = { tier?: string };

export const Route = createFileRoute("/pledge")({
  validateSearch: (search: Record<string, unknown>): PledgeSearch => ({
    tier: typeof search.tier === "string" ? search.tier : undefined,
  }),
  loader: () => getTiers(),
  component: PledgePage,
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
      { title: "Make your pledge — Paul Allen and Alan Turing" },
      {
        name: "description",
        content:
          "Choose your monthly contribution to the Paul Allen and Alan Turing solidarity pool supporting displaced technologists.",
      },
    ],
  }),
});

function PledgePage() {
  const data = Route.useLoaderData() as { tiers: TierRecord[]; error: string | null };
  const tiers = data.tiers;
  const loadError = data.error;
  const { tier: tierParam } = Route.useSearch();
  const submitPledge = useServerFn(createPledge);

  const initialTier =
    tiers.find((t: TierRecord) => t.id === tierParam) ??
    tiers.find((t: TierRecord) => t.featured) ??
    tiers[0];

  const [selectedId, setSelectedId] = useState<string>(initialTier?.id ?? "custom");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selected = tiers.find((t: TierRecord) => t.id === selectedId);
  const isCustom = selectedId === "custom";
  const amount = isCustom ? Number(customAmount) || 0 : (selected?.amount ?? 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || amount < 1) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitPledge({
        data: {
          tierId: isCustom ? null : selectedId,
          name,
          email,
          amount: Math.floor(amount),
          cadence: "month",
        },
      });
      if (result.error || !result.pledge) {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <div className="container mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold">
            Thank you, {name || "friend"}.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Your pledge of <span className="font-semibold text-foreground">${amount}/month</span>{" "}
            has been recorded. We've sent a confirmation to{" "}
            <span className="font-medium text-foreground">{email}</span>. Payment processing will
            be wired in next.
          </p>
          <Button asChild variant="outlineGold" size="lg" className="mt-8">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="container mx-auto max-w-5xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Make your pledge.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Choose a tier and your monthly contribution begins on the 1st of next month.
            </p>

            {loadError && (
              <p className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {loadError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold">1. Select tier</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {tiers.map((t: TierRecord) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={cn(
                        "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-smooth",
                        selectedId === t.id
                          ? "border-gold bg-gold/5 shadow-card-soft"
                          : "border-border hover:border-gold/40",
                      )}
                    >
                      <span className="font-display text-lg font-semibold">{t.name}</span>
                      <span className="text-sm text-muted-foreground">{t.tagline}</span>
                      <span className="mt-2 font-display text-2xl font-semibold">
                        ${t.amount}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedId("custom")}
                    className={cn(
                      "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-smooth sm:col-span-2",
                      isCustom
                        ? "border-gold bg-gold/5 shadow-card-soft"
                        : "border-border hover:border-gold/40",
                    )}
                  >
                    <span className="font-display text-lg font-semibold">Custom amount</span>
                    <span className="text-sm text-muted-foreground">
                      Set your own monthly contribution.
                    </span>
                    {isCustom && (
                      <div className="relative mt-3 w-full max-w-[200px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-display text-lg text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          min={1}
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="50"
                          className="h-12 pl-7 font-display text-xl"
                          autoFocus
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold">2. Your details</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ada Lovelace"
                      className="mt-1.5 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ada@example.com"
                      className="mt-1.5 h-11"
                    />
                  </div>
                </div>
              </div>

              {submitError && (
                <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={submitting || amount < 1}
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
                {submitting ? "Recording..." : `Confirm pledge of $${amount || 0}/month`}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You can cancel or modify your pledge at any time.
              </p>
            </form>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-8 shadow-elegant lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-semibold">Your impact</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight">
                ${amount || 0}
              </span>
              <span className="text-muted-foreground">/ month</span>
            </div>
            <div className="mt-6 h-px bg-border" />
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Hours of bridge support funded</span>
                <span className="font-semibold">{Math.round(amount * 0.8)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Engineers helped per year</span>
                <span className="font-semibold">{((amount * 12) / 200).toFixed(1)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Annual contribution</span>
                <span className="font-semibold">${amount * 12}</span>
              </li>
            </ul>
            <div className="mt-8 rounded-lg bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
              100% of your pledge enters the trust pool. Disbursements are made via IEEE, ACM, and
              partner associations.
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
