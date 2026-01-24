"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Providers } from "@/app/providers";

const navItems = [
  { href: "/app", label: "Overview", icon: "🏠" },
  { href: "/app/wallet", label: "Wallet", icon: "💳" },
  { href: "/app/transaction", label: "Transactions", icon: "🔄" },
  { href: "/app/marketplace", label: "Marketplace", icon: "🛍️" },
  { href: "/app/profile", label: "Profile", icon: "👤" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Providers>
      <div className="min-h-screen">
        <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
          <aside className="hidden w-60 flex-col gap-3 md:flex">
            <div className="glass-container gradient-border rounded-2xl p-4 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Madmoun Demo
              </p>
              <p className="mt-2 text-lg font-semibold text-white">App Console</p>
            </div>
            <nav className="glass-container gradient-border rounded-2xl p-3">
              <ul className="space-y-2 text-sm text-slate-300">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-white ${
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "bg-white/5 text-white"
                          : ""
                      }`}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="flex-1 space-y-6">{children}</main>
        </div>

        <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-[#0b1224]/90 px-4 py-2 text-xs text-slate-200 backdrop-blur md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 rounded-full px-3 py-1 ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-emerald-500/15 text-emerald-100"
                  : ""
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </Providers>
  );
}
