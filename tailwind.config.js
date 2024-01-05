/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '2rem'
			}
		},
		borderRadius: {
			xl: '0.625rem',
			'2xl': '1.25rem',
			'3xl': '2.5rem'
		}
	},
	plugins: [
		function ({ addComponents, theme, addUtilities }) {
			addComponents({
				'.container': {
					maxWidth: '100%'
				},
				'.btn-primary': {
					backgroundColor: theme('colors.lime.400'),
					color: theme('colors.white'),
					borderRadius: '1.25rem',
					padding: `${theme('spacing.4')} 0`,
					'&:hover': {
						backgroundColor: theme('colors.lime.500')
					},
					'&:active': {
						backgroundColor: theme('colors.lime.600')
					},
					'&:disabled': {
						backgroundColor: theme('colors.gray.400'),
						cursor: 'not-allowed'
					}
				}
			})
		}
	]
}
//w-full rounded-2xl py-4 cursor-pointer transition hover:bg-lime-500 active:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed
