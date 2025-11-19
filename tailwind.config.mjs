/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				space: {
					black: '#000000',
					dark: '#0B1026',
					light: '#1B2240',
				},
				accent: {
					orange: '#FF6B00',
					amber: '#FF9F1C',
				},
				text: {
					main: '#F0F0F0',
					muted: '#A0A0C0',
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Outfit', 'sans-serif'],
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
	],
	daisyui: {
		themes: ["black"],
	}
}
