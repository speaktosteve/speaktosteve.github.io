import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		// https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#approach-2-dynamic-routes
		mdsvex({
			extensions: ['.md', '.svx'],
			// https://mdsvex.com/docs#layouts
			layout: './src/routes/post.svelte'
			// layout: {
			//   // _: './src/routes/post.svelte'
			//   blog: './src/routes/post.svelte'
			// }
		}),
		vitePreprocess()
	],
	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true,
			// fallback: '/blog/404.html'

		}),
		paths: {
			base: '/blog'
		}
	},
	
};

export default config;
