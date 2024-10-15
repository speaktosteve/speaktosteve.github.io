<script>
	import { onMount } from 'svelte';
	import Banner from '../../components/banner.svelte';

	// Reactive variable to store scroll position
	let scrollY = 0;

	// Track scroll position
	const handleScroll = () => {
		scrollY = window.scrollY;
	};

	// Add scroll event listener when component is mounted
	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<Banner heading="heading" description="description" date="date" tags={['tags']} />

<div class="parallax-container">
	<!-- Background element for parallax effect -->
	<div
		class="translate-z-[-1px] absolute left-0 right-0 top-0 h-screen scale-[2] rounded-t-3xl bg-white pb-12"
		style="transform: translateY({scrollY * -0.5}px);"
	>
		<h1>Welcome to the Parallax Effect!</h1>
		<p>This is an example of parallax scrolling using SvelteKit.</p>
	</div>
</div>

<style>
	.parallax-container {
		perspective: 1px; /* create a 3D effect for parallax */
	}
</style>
