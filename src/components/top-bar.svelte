<script lang="ts">
	import logo from '$lib/assets/logo.webp';
	import '../app.css';
	import { onMount } from 'svelte';
	import ModeSwitch from '../components/mode-switch.svelte';

	// Reactive variable to store scroll position
	const initialImageWidth = 250;
	const minScreenSize = 200;
	const scrollLimit = 200;
	let imageWidth = initialImageWidth;

	// Track scroll position
	const handleScroll = () => {
		if (window.screen.width < minScreenSize) {
			return;
		}
		let scrollY = window.scrollY;
		if (scrollY < scrollLimit) {
			imageWidth = initialImageWidth - scrollY / 2;
		}
	};

	// Add scroll event listener when component is mounted
	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div
	class="sticky top-0 z-10 flex items-center justify-between gap-2 bg-slate-950 px-4 py-4 sm:px-6"
>
	<a href="/" aria-label="Back to home page">
		<h1 class="text-left">
			<img alt="speaktosteve logo" src={logo} width="{imageWidth}px" />
		</h1>
	</a>
	<div class="flex scale-90 items-center gap-3 text-white sm:scale-100">
		<ModeSwitch />
		<a href="https://github.com/speaktosteve" aria-label="Go to GitHub profile">
			<svg viewBox="0 0 98 96" width="25" height="24" xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
					fill="#fff"
				/></svg
			>
		</a>
		<a href="https://www.linkedin.com/in/speaktosteve/" aria-label="Go to LinkedIn profile">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="#FFFFFF"
			>
				<path
					d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
				/></svg
			>
		</a>
	</div>
</div>
