"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: "#0A2540",
						color: "white",
						border: "1px solid #0066B3",
					},
				}}
			/>
		</>
	);
}

export default Providers;
