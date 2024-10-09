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
export const theme = {
	extend: {
		fontFamily: {
			sans: ['uncut-sans', ..._fontFamily.sans],
			serif: ['sprat', ..._fontFamily.serif]
		},
		backgroundImage: {
			'bg': "url('bg.jpg')",
			'banner': "linear-gradient(transparent, white 95%), url('banner.jpeg') ",
		}
	}
};
export const plugins = [typography];