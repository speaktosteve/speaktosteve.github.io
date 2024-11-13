<script>
	import { onMount } from 'svelte';
	import { motion } from 'framer-motion';

	$: scrollY = 0;

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
	<!-- Fixed Panel -->
	<p class="bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>

	<!-- Parallax Panel using Framer Motion -->
	<motion.p
		class="mt-24 block bg-blue-500 p-5"
		animate={{ y: scrollY * -0.5 }}
		transition={{ type: 'spring', stiffness: 100 }}
	>
		This is a parallax panel with a smooth transform effect.
	</motion.p>
</div>
