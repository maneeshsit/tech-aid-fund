import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-gold font-display text-lg font-bold">
            ⊕
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Paul Allen and Alan Turing
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#mission" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Mission
          </a>
          <a href="/#how" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="/#tiers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Tiers
          </a>
          <a href="/#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>
        <Button asChild variant="hero" size="default">
          <Link to="/pledge">Pledge</Link>
        </Button>
      </div>
    </header>
  );
}
