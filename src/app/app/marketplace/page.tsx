"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Globe2, ShieldCheck, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/mockStore";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function IntegratedMerchantsPage() {
  const merchants = useAppStore((state) => state.merchants ?? []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(merchants.map((merchant) => merchant.category)))],
    [merchants]
  );

  const filtered = useMemo(() => {
    return merchants.filter((merchant) => {
      const matchesCategory = category === "All" || merchant.category === category;
      const matchesQuery = merchant.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [merchants, category, query]);

  return (
    <motion.div className="space-y-6" initial="hidden" animate="show" variants={containerVariants}>
      <motion.header className="glass-container gradient-border rounded-[2rem] p-6 md:p-8" variants={itemVariants}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5" />
              Integrated Merchants
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Shop Securely with Trusted Merchants
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                All merchants below are integrated with Madmoun escrow protection.
                Madmoun does not sell products. We secure your transactions on partner websites.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:w-[28rem]">
            {[
              {
                label: "Integrated merchants",
                value: `${merchants.length}`,
                icon: ShieldCheck,
              },
              { label: "Escrow protected", value: "100%", icon: BadgeCheck },
              { label: "External checkout", value: "Direct", icon: Globe2 },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group flex min-h-[112px] flex-col justify-center rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)]"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="h-4 w-4 text-emerald-200/80 transition group-hover:text-emerald-100" />
                    <p className="text-2xl font-semibold leading-none text-white md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-50 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
          Madmoun is an escrow layer, not a store. Tap a merchant to open their own website and pay with escrow protection enabled.
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            <Search className="h-4 w-4 text-emerald-200" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search merchant name"
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setCategory(tag)}
                className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.25em] transition ${
                  category === tag
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/25 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      <motion.section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" variants={containerVariants}>
        {filtered.length ? (
          filtered.map((merchant) => (
            <motion.article
              key={merchant.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-amber-300/0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:from-emerald-400/10 group-hover:via-transparent group-hover:to-amber-300/10" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#091224] shadow-[0_0_24px_rgba(16,185,129,0.15)]">
                  <img
                    src={merchant.logo}
                    alt={`${merchant.name} logo`}
                    className="h-10 w-10 rounded-xl object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{merchant.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-100">
                      <BadgeCheck className="h-3 w-3" />
                      Escrow Protected
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{merchant.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">{merchant.category}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">{merchant.trustBadge}</span>
                    {typeof merchant.rating === "number" && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                        {merchant.rating.toFixed(1)} rating
                      </span>
                    )}
                    {merchant.transactionCount ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                        {merchant.transactionCount.toLocaleString()} orders
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.25em] text-slate-400">
                <div className="flex items-center gap-2 text-emerald-100">
                  <Globe2 className="h-4 w-4" />
                  External website
                </div>
                <a
                  href={merchant.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-500/20 hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]"
                >
                  Visit Website
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300 md:col-span-2 xl:col-span-3"
          >
            More merchants integrating with Madmoun soon.
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
}
