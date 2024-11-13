<script>
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	// Create a tweened store with a default value of 0
	let scrollY = tweened(0, {
		duration: 300,
		easing: cubicOut
	});

	const handleScroll = () => {
		scrollY.set(window.scrollY);
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<p class=" bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>
	<p class="mt-24 bg-blue-500 p-5" style="transform: translateY({$scrollY * -0.5}px);">
		This is a parallax panel with a smooth transform effect.
	</p>
</div>
