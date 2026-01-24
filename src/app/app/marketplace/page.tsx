"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/mockStore";

export default function MarketplacePage() {
  const { products } = useAppStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = product.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">Marketplace</h1>
        <p className="mt-2 text-sm text-slate-300">
          Browse products protected by Madmoun escrow.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["All", "Electronics", "Home", "Gaming", "Accessories", "Lifestyle"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setCategory(tag)}
              className={`rounded-full border px-3 py-1 text-xs ${
                category === tag
                  ? "border-emerald-400/40 text-emerald-200"
                  : "border-white/10 text-slate-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="glass-container gradient-border rounded-3xl p-5"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.location}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{product.title}</h3>
            <p className="mt-2 text-sm text-slate-300">Seller: {product.seller}</p>
            <p className="mt-2 text-sm text-emerald-200">Rating {product.rating}⭐</p>
            <p className="mt-3 text-xl font-semibold text-white">EGP {product.price}</p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/app/marketplace/${product.id}`}
                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100"
              >
                Buy with Escrow
              </Link>
              <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300">
                Save
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
