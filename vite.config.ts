import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit()],
	resolve: {
		alias: {
		  $fonts: resolve('./lib/assets')
		}
	  }
});
