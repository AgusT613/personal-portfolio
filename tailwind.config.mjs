/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				"message-disappear": {
					'0%': { right: "0" },
					'100%': { right: "-100%" }
				}
			},
			animation: {
				"message-disappear": "message-disappear 1.5s ease"
			}
		},
	},
	plugins: [],
}
