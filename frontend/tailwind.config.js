import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				techModern: {
					primary: "#1F2937", // Charcoal Black
					secondary: "#E5E7EB", // Soft Silver
					accent: "#3B82F6", // Bright Blue
					neutral: "#111827", // Deep Black
					"base-100": "#F9FAFB", // White Smoke
					info: "#9CA3AF", // Gray Blue
					success: "#10B981", // Neon Green
					warning: "#FBBF24", // Mustard Yellow
					error: "#EF4444", // Fiery Red
				},
				
			},
		],
	},
};