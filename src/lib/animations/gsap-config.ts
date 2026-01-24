import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

let isRegistered = false;

const registerPlugins = () => {
	if (isRegistered) return;
	if (typeof window === "undefined") return;
	gsap.registerPlugin(ScrollTrigger, TextPlugin);
	isRegistered = true;
};

export const initGsap = () => {
	registerPlugins();
	gsap.config({ force3D: true, autoSleep: 60 });
	return gsap;
};

registerPlugins();

export { gsap, ScrollTrigger, TextPlugin };
export default gsap;
