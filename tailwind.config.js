/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
			  'bg': "url('bg.jpg')",
			  'banner': "linear-gradient(transparent, white 95%), url('banner.jpeg') ",
			}
		  }
	},
	plugins: []
};
