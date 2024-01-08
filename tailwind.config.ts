/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

module.exports = {
	darkMode: 'class',
	important: true,
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
	],
	theme: {
		extend: {
			fontFamily: {
				Lato: ['var(--font-Lato)']
			},
			screens: {
				'ssm': '320px',
				'xl2': '1400px'
			},
			colors: {
				red: {
					default: '#EB5757'
				},
				green: {
					primary: '#358888',
					secondary: '#358888',
					500: '#358888', // for override primaryColor DateField component
				},
				gray: {
					1: '#2A2536',
					2: '#6A6D81',
					3: '#D4D2D8'
				}
			},
			boxShadow: {
				'green-small': '5px 5px 10px 0px rgba(53, 136, 136, 0.12)'
			},
			width: {
				'920': '920px',
				defaultContent: '1110px',
				defaultScreen: '1440px'
			},
			keyframes: {
				slideUpToDown: {
					'0%': {
						transform: 'translateY(-100px)',
						opacity: 0
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: 1
					},
				},
				slideDownToUp: {
					'0%': {
						transform: 'translateY(100px)',
						opacity: 0
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: 1
					},
				},
				slideLeftToRight: {
					'0%': {
						transform: 'translateX(-500px)',
						width: 'fit-content',
						opacity: 0
					},
					'100%': {
						transform: 'translateX(0)',
						width: 'fit-content',
						opacity: 1
					},
				},
				slideRightToLeft: {
					'0%': {
						transform: 'translateX(500px)',
						width: 'fit-content',
						opacity: 0
					},
					'100%': {
						transform: 'translateX(0)',
						width: 'fit-content',
						opacity: 1
					},
				},
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
				shakeX: {
					'0%': {
						transform: 'translate3d(50px, 0, 0)'
					},
					'25%': {
						transform: 'translate3d(50px, 0, 0)'
					},
					'75%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'100%': {
						transform: 'translate3d(0, 0, 0)'
					}
				},
				shakeY: {
					'0%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'25%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'75%': {
						transform: 'translate3d(0, 30px, 0)'
					},
					'100%': {
						transform: 'translate3d(0, 30px, 0)'
					}
				},
				bounceInUp: {
					'from': {
						opacity: 0,
						transform: 'translate3d(0, 500px, 0) scaleY(3)',
						height: 0
					},
					'60%': {
						opacity: 1,
						transform: 'translate3d(0, -1px, 0)'
					},
					'75%': {
						transform: 'translate3d(0, 0, 0)',
						height: 'auto'
					},

					'90%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'to': {
						transform: 'translate3d(0, 0, 0)'
					}
				},
				bounceInDown: {
					'from': {
						opacity: 0,
						transform: 'translate3d(0, -1000px, 0) scaleY(3)'
					},
					'30%': {
						opacity: 1,
						transform: 'translate3d(0, -10px, 0)'
					},
					'60%': {
						opacity: 1,
						transform: 'translate3d(0, 1px, 0)'
					},
					'75%': {
						transform: 'translate3d(0, 0, 0)'
					},

					'90%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'to': {
						transform: 'translate3d(0, 0, 0)'
					}
				},
				infiniteScroll: {
					'0%': {
						transform: 'translate3d(0, 0, 0)'
					},
					'100%': {
						transform: 'translate3d(-1700px, 0, 0)'
					}
				},
				slideUpToDownDelay: {
					'0%': {
						transform: 'translateY(-100px)',
						opacity: 0
					},
					'80%': { opacity: 0 },
					'100%': {
						transform: 'translateY(0)',
						opacity: 1
					},
				},
			},
			animation: {
				slideUpToDown: 'slideUpToDown 1s ease-in-out',
				slideUpToDown2: 'slideUpToDown 1.2s ease-in-out',
				slideDownToUp: 'slideDownToUp 1s ease-in-out',
				slideLeftToRight: 'slideLeftToRight 1s ease-in-out',
				slideLeftToRight2: 'slideLeftToRight 1.2s ease-in-out',
				slideLeftToRight3: 'slideLeftToRight 1.4s ease-in-out',
				slideRightToLeft: 'slideRightToLeft 1s ease-in-out',
				slideRightToLeft2: 'slideRightToLeft 1.2s ease-in-out',
				slideRightToLeft3: 'slideRightToLeft 1.4s ease-in-out',
				fadeIn: 'fadeIn 1.5s ease forwards',
				fadeIn2: 'fadeIn 1.8s ease forwards',
				fadeOut: 'fadeOut 1s ease forwards',
				shakeX: 'shakeX ease-in-out 0.6s infinite alternate-reverse',
				shakeY: 'shakeY ease-in-out 0.6s infinite alternate-reverse',
				bounceInUp: 'bounceInUp 200ms forwards',
				bounceInDown: 'bounceInDown 250ms forwards',
				infiniteScroll: 'infiniteScroll 10s linear infinite alternate-reverse',
				slideUpToDownDelay: 'slideUpToDownDelay 1.2s ease-in-out',
			}
		},
	},
	plugins: [
		({ addComponents }: Config['PluginAPI']) => {
			addComponents({
				'.container-page': { '@apply w-full px-4 md:px-5 xl:px-10': {} },
				'.container-content': { '@apply w-full px-4 md:px-10 lg:px-14 xl:px-20 xl2:px-28 2xl:px-40': {} },
				'.heading-section': { '@apply !text-xl !leading-8 md:!text-[34px] md:!leading-normal lg:!text-[40px] xl2:!text-[44px] xl2:!leading-[41px] font-bold': {} },
				'.subheading-section': { '@apply !text-sm !leading-5 md:!leading-normal md:!text-base xl2:!text-xl': {} }
			});
		}
	]
};
