export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-gold font-display text-lg font-bold">
                ⊕
              </div>
              <span className="font-display text-lg font-semibold">Paul Allen and Alan Turing</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A solidarity pool funded by the technology community, supporting displaced IT and
              hi-tech professionals through partnerships with IEEE and engineering associations.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Trust</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>About</li>
              <li>Governance</li>
              <li>Annual report</li>
              <li>Beneficiaries</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Press</li>
              <li>Partnerships</li>
              <li>Apply for support</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} The Allen·Turing Trust. A non-profit initiative.</p>
          <p className="italic">"We can only see a short distance ahead, but we can see plenty there that needs to be done." — A. Turing</p>
        </div>
      </div>
    </footer>
  );
}
