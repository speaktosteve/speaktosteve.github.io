<script>
	import { onMount } from 'svelte';

	let scrollY = 0;

	const handleScroll = () => {
		scrollY = window.scrollY;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<p class="bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>
	<p
		class="mt-24 bg-blue-500 p-5"
		style="transform: translateY({scrollY * -0.5}px);  transition: transform 0.2s ease-out;"
	>
		This is a parallax panel with a smooth transform effect.
	</p>
</div>
