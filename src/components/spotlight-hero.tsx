"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Sparkles, Timer } from "lucide-react";
import { MoneyAmount } from "@/components/money-amount";
import { TrustVisualizer } from "@/components/trust-visualizer";
import { BlurIn } from "@/components/blur-in";
import { SpotlightCard } from "@/components/spotlight-card";

const heroCards = [
	{
		title: "Buyer Shield",
		description: "Every EGP is locked until delivery is verified.",
		icon: <ShieldCheck className="h-5 w-5" />,
	},
	{
		title: "Instant Release",
		description: "Funds clear automatically the moment trust is proven.",
		icon: <Timer className="h-5 w-5" />,
	},
	{
		title: "Proofed Escrow",
		description: "Audit-ready trails for merchants and regulators.",
		icon: <Sparkles className="h-5 w-5" />,
	},
];

export function SpotlightHero() {
	return (
		<section className="glass-container gradient-border rounded-3xl p-8">
			<div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
				<div className="space-y-6">
					<BlurIn>
						<p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
							Egypt-first escrow protocol
						</p>
						<h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl font-display">
							Madmoun secures every buyer, every delivery, every pound.
						</h1>
					</BlurIn>
					<BlurIn delay={0.1}>
						<p className="max-w-xl text-base text-slate-300">
							Build trust into commerce with a cinematic escrow layer. Madmoun
							verifies delivery, shields merchants from chargebacks, and turns
							every transaction into a verified handoff.
						</p>
					</BlurIn>
					<BlurIn delay={0.2}>
						<div className="flex flex-wrap items-center gap-4">
							<Link
								href="/dashboard"
								className="glass-container gradient-border rounded-full px-6 py-3 text-xs uppercase tracking-[0.35em] text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition hover:scale-[1.03]"
							>
								Go to Dashboard
							</Link>
							<div className="text-xs uppercase tracking-[0.35em] text-slate-400">
								Live in Cairo • 24/7 Shield
							</div>
						</div>
					</BlurIn>
					<BlurIn delay={0.3}>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="glass-container gradient-border rounded-2xl p-4">
								<p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
									Escrowed This Month
								</p>
								<MoneyAmount
									value={245000}
									className="mt-2 text-2xl font-semibold text-emerald-200 font-display"
								/>
							</div>
							<div className="glass-container gradient-border rounded-2xl p-4">
								<p className="text-xs uppercase tracking-[0.3em] text-slate-300">
									Release Speed
								</p>
								<p className="mt-2 text-2xl font-semibold text-white font-display">
									&lt; 2 minutes
								</p>
							</div>
						</div>
					</BlurIn>
				</div>

				<div className="space-y-6">
					<TrustVisualizer />
					<motion.div
						className="glass-container gradient-border rounded-3xl p-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
							Live Escrow Pulse
						</p>
						<h2 className="mt-3 text-2xl font-semibold text-white font-display">
							98.9% delivery-confirmed success
						</h2>
						<p className="mt-2 text-sm text-slate-300">
							Madmoun verifies handoff with adaptive checkpoints and biometric
							buyer confirmation.
						</p>
					</motion.div>
				</div>
			</div>

			<div className="mt-10 grid gap-4 md:grid-cols-3">
				{heroCards.map((card) => (
					<SpotlightCard key={card.title} {...card} />
				))}
			</div>
		</section>
	);
}
