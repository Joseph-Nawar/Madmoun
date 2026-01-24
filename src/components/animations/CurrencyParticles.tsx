"use client";

import type { HTMLAttributes } from "react";

type CurrencyParticlesProps = HTMLAttributes<HTMLDivElement>;

export const CurrencyParticles = ({ className, ...props }: CurrencyParticlesProps) => {
	return (
		<div
			className={className ?? ""}
			aria-hidden
			{...props}
		/>
	);
};
