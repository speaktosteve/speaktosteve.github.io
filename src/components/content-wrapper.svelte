<script>
	import { onMount } from 'svelte';

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

<div class="parallax-container mt-[-1rem] rounded-t-3xl bg-white px-0 pt-4">
	<!-- Background element for parallax effect -->
	<div
		class="scale-[2] rounded-t-3xl bg-white pb-12"
		style="transform: translateY({scrollY * -0.5}px);"
	>
		<slot />
	</div>
</div>

<style>
	.parallax-container {
		perspective: 1px; /* create a 3D effect for parallax */
	}
</style>
