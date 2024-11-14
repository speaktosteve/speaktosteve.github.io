<script>
	import { onMount } from 'svelte';
	import { animate, scroll } from 'motion';

	let parallax;

	onMount(() => {
		scroll(animate(parallax, { y: [-100, 120] }, { ease: 'linear' }), {
			target: parallax
		});
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<p class="bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>
	<p class="mt-24 bg-blue-500 p-5" bind:this={parallax}>
		This is a parallax panel with a smooth transform effect.
	</p>
</div>
