import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  amount: number;
  cadence: string;
  perks: string[];
  featured?: boolean;
}

export function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-8 shadow-card-soft transition-spring hover:-translate-y-1 hover:shadow-elegant",
        tier.featured ? "border-gold/60 ring-1 ring-gold/30" : "border-border",
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-deep">
          Most chosen
        </span>
      )}
      <div>
        <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-5xl font-semibold tracking-tight">${tier.amount}</span>
        <span className="text-sm text-muted-foreground">/ {tier.cadence}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span className="text-foreground/90">{perk}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        variant={tier.featured ? "hero" : "outlineGold"}
        size="lg"
        className="mt-8 w-full"
      >
        <Link to="/pledge" search={{ tier: tier.id }}>
          Pledge as {tier.name}
        </Link>
      </Button>
    </div>
  );
}
