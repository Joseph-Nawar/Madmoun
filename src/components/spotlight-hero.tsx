"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles, Timer } from "lucide-react";
import { AnimatedPipeline } from "@/components/animations/AnimatedPipeline";
import { InteractiveVault } from "@/components/animations/InteractiveVault";
import { BlurIn } from "@/components/blur-in";
import { SpotlightCard } from "@/components/spotlight-card";

const heroCards = [
	{
		title: "Buyer Shield",
		description: "Every EGP is locked until delivery is verified.",
		details:
			"Full refund guarantee if the product doesn't arrive as described.",
		colorClassName: "spotlight-card-nile",
		icon: <ShieldCheck className="h-5 w-5" />,
	},
	{
		title: "Instant Release",
		description: "Funds clear automatically the moment trust is proven.",
		details:
			"AI-powered verification triggers instant payment release for sellers.",
		colorClassName: "spotlight-card-sunset",
		icon: <Timer className="h-5 w-5" />,
	},
	{
		title: "Proofed Escrow",
		description: "Audit-ready trails for merchants and regulators.",
		details: "Blockchain-grade transparency without the complexity.",
		colorClassName: "spotlight-card-palm",
		icon: <Sparkles className="h-5 w-5" />,
	},
];

export function SpotlightHero() {
	return (
		<section className="glass-container gradient-border rounded-3xl p-8">
			<div className="hero-grid">
				<div className="hero-left">
					<BlurIn>
						<p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
							Egypt-first escrow protocol
						</p>
						<h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl font-display">
							Securing every transaction.
						</h1>
					</BlurIn>
					<BlurIn delay={0.1}>
						<p className="hero-description max-w-xl text-base text-slate-300">
							Madmoun secures every buyer, every delivery, every pound. Build trust
							into commerce with a cinematic escrow layer. Madmoun verifies delivery,
							shields merchants from chargebacks, and turns every transaction into a
							verified handoff.
						</p>
					</BlurIn>
					<BlurIn delay={0.2}>
						<div className="pipeline-container">
							<AnimatedPipeline />
						</div>
					</BlurIn>
					<BlurIn delay={0.3}>
						<div className="hero-cta">
							<Link
								href="/app/wallet"
								className="glass-container gradient-border rounded-full px-6 py-3 text-xs uppercase tracking-[0.35em] text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition hover:scale-[1.03]"
							>
								Try Demo Now
							</Link>
							<Link
								href="#features"
								className="rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.35em] text-slate-300 transition hover:border-emerald-300/50 hover:text-white"
							>
								Learn More
							</Link>
						</div>
					</BlurIn>
				</div>
				<div className="hero-right">
					<InteractiveVault />
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
