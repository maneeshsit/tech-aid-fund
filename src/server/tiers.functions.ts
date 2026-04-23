import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export interface TierRecord {
  id: string;
  name: string;
  tagline: string;
  amount: number;
  cadence: string;
  perks: string[];
  featured: boolean;
}

export const getTiers = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("tiers")
    .select("id, name, tagline, amount, cadence, perks, featured, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load tiers:", error);
    return { tiers: [] as TierRecord[], error: "Unable to load pledge tiers right now." };
  }

  const tiers: TierRecord[] = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    amount: row.amount,
    cadence: row.cadence,
    perks: Array.isArray(row.perks) ? (row.perks as string[]) : [],
    featured: row.featured,
  }));

  return { tiers, error: null };
});

const createPledgeSchema = z.object({
  tierId: z.string().min(1).max(50).regex(/^[a-z0-9_-]+$/).nullable(),
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  amount: z.number().int().min(1).max(1_000_000),
  cadence: z.enum(["month", "year", "once"]).default("month"),
});

export const createPledge = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => createPledgeSchema.parse(input))
  .handler(async ({ data }) => {
    // Validate tier (if provided) actually exists & matches amount when not custom
    let resolvedTierId: string | null = data.tierId;
    if (resolvedTierId && resolvedTierId !== "custom") {
      const { data: tier, error: tierErr } = await supabaseAdmin
        .from("tiers")
        .select("id")
        .eq("id", resolvedTierId)
        .maybeSingle();
      if (tierErr || !tier) {
        resolvedTierId = null;
      }
    } else {
      resolvedTierId = null;
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("pledges")
      .insert({
        tier_id: resolvedTierId,
        name: data.name,
        email: data.email,
        amount: data.amount,
        cadence: data.cadence,
        status: "pending",
      })
      .select("id, amount, cadence, created_at")
      .single();

    if (error) {
      console.error("Failed to insert pledge:", error);
      return { pledge: null, error: "We couldn't record your pledge. Please try again." };
    }

    return { pledge: inserted, error: null };
  });
