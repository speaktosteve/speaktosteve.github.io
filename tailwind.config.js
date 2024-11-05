// const defaultTheme = require('tailwindcss/defaultTheme');

// export default {
// 	content: ['./src/**/*.{html,js,svelte,ts}'],
// 	// theme: {
// 	// 	extend: {
// 	// 		backgroundImage: {
// 	// 		  'bg': "url('bg.jpg')",
// 	// 		  'banner': "linear-gradient(transparent, white 95%), url('banner.jpeg') ",
// 	// 		}
// 	// 	  }
// 	// },
// 	plugins: [
// 		import('@tailwindcss/typography'),
// 		// ...
// 	  ],
// };

import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export const content = ['./src/**/*.{html,js,svelte,ts}'];
export const darkMode = 'selector';
export const theme = {
	extend: {
		typography: {
			DEFAULT: {
			  css: {
				maxWidth: '60rem', // add required value here
			  }
			}
		  },
		fontFamily: {
			'sans': ['Trebuchet MS', ..._fontFamily.sans],
			serif: ['sprat', ..._fontFamily.serif]
		},
		backgroundImage: {
			'banner': 'linear-gradient(transparent, black 90%), url("$lib/assets/banner.webp")',
		},
		content: {
			'externalLink': 'url("$lib/assets/externalLink.svg")',
			'externalLinkDark': 'url("$lib/assets/externalLinkDark.svg")',
			'github': 'url("$lib/assets/github.svg")',
			'githubDark': 'url("$lib/assets/githubDark.svg")',
		},
	}
};
export const plugins = [typography];