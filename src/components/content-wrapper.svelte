<script>
	import { onMount } from 'svelte';

	// Reactive variable to store scroll position
	let scrollY = 0;
	let containerHeight = 0;
	let container;

	// Track scroll position
	const handleScroll = () => {
		scrollY = window.scrollY;
		// Adjust container's height based on scroll position
		// container.style.height = `${containerHeight + scrollY * -0.5}px`;
	};

	// Function to set the initial height and adjust on remount
	const setInitialHeight = () => {
		if (container) {
			// Recalculate the height of the container on remount
			containerHeight = container.getBoundingClientRect().height;
		}
	};

	// Add scroll event listener when component is mounted
	onMount(() => {
		setInitialHeight();
		window.addEventListener('scroll', handleScroll);

		return () => {
			// Cleanup on unmount, reset the height
			containerHeight = 0; // Reset height on unmount
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Ensure that the height is recalculated if the container is reassigned
	$: if (container) {
		setInitialHeight();
	}
</script>

<div bind:this={container} class="mt-[-1rem] rounded-t-3xl bg-white px-0 pt-4 dark:bg-slate-900">
	<div
		class="scale-[2] rounded-t-3xl bg-white pb-12 dark:bg-slate-900"
		style="transform: translateY({scrollY * -0.5}px);"
	>
		<slot />
	</div>
</div>
