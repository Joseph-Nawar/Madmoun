"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Bike, Banknote, Coins, Shield } from "lucide-react";

const shieldPath =
	"M256 24 L460 96 V266 C460 390 370 486 256 524 C142 486 52 390 52 266 V96 L256 24 Z";

export function BackgroundConstruction() {
	const { scrollYProgress } = useScroll();

	const background = useMotionTemplate`radial-gradient(circle at 50% 40%, rgba(16, 185, 129, ${scrollYProgress}), rgba(2, 6, 23, 0.98))`;
	const gridScale = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const gridOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.2, 0.35, 0.2]);

	const bikeX = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 220, 0]);
	const bikeY = useTransform(scrollYProgress, [0, 0.5, 1], [-220, 40, 320]);
	const bikeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.2, 0.2]);
	const bikeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

	const shieldGlow = useTransform(scrollYProgress, [0.35, 0.5, 0.7], [0, 1, 0]);
	const shieldScale = useTransform(scrollYProgress, [0.2, 0.5, 1], [0.6, 1, 1.1]);

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
			style={{ backgroundImage: background }}
		>
			<motion.div
				className="digital-grid"
				style={{ scale: gridScale, opacity: gridOpacity, transformStyle: "preserve-3d" }}
			/>

			<div className="absolute left-12 top-16 flex items-center gap-2 text-emerald-200/70">
				<Banknote className="h-5 w-5" />
				<span className="text-xs uppercase tracking-[0.3em]">Buyer</span>
			</div>
			<div className="absolute bottom-16 right-12 flex items-center gap-2 text-emerald-200/70">
				<Coins className="h-5 w-5" />
				<span className="text-xs uppercase tracking-[0.3em]">Seller</span>
			</div>

			<div className="absolute inset-0">
				<div className="beam-line delay-1" style={{ top: "18%", left: "12%", width: "36%" }} />
				<div className="beam-line delay-2" style={{ top: "52%", left: "48%", width: "36%" }} />
				<div className="beam-line delay-3" style={{ top: "34%", left: "20%", width: "40%" }} />
			</div>

			<motion.div
				className="absolute inset-0 flex items-center justify-center"
				style={{ scale: shieldScale, boxShadow: useMotionTemplate`0 0 40px rgba(245, 158, 11, ${shieldGlow})` }}
			>
				<svg viewBox="0 0 512 560" className="h-[28vh] w-[28vh]">
					<path
						d={shieldPath}
						fill="rgba(16, 185, 129, 0.08)"
						stroke="#10b981"
						strokeWidth="2"
					/>
				</svg>
			</motion.div>

			<motion.div
				className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4"
				style={{ opacity: shieldGlow }}
			>
				<Shield className="h-8 w-8 text-amber-300" />
				<span className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
					Escrow Lock
				</span>
			</motion.div>

			<motion.div
				className="absolute left-1/2 top-[40%] flex items-center gap-3"
				style={{ x: bikeX, y: bikeY, scale: bikeScale, opacity: bikeOpacity }}
			>
				<Bike className="h-10 w-10 text-emerald-300" />
				<Banknote className="h-6 w-6 text-emerald-200" />
				<Coins className="h-6 w-6 text-amber-200" />
			</motion.div>

			<div className="absolute inset-0">
				<Banknote
					className="flow-icon left-[18%] top-[30%] h-5 w-5"
					style={{ animationDelay: "0.4s" }}
				/>
				<Coins
					className="flow-icon left-[24%] top-[36%] h-4 w-4"
					style={{ animationDelay: "1.1s" }}
				/>
				<Banknote
					className="flow-icon flow-icon-gold left-[58%] top-[58%] h-5 w-5"
					style={{ animationDelay: "0.8s" }}
				/>
				<Coins
					className="flow-icon flow-icon-gold left-[64%] top-[62%] h-4 w-4"
					style={{ animationDelay: "1.6s" }}
				/>
			</div>
		</motion.div>
	);
}
