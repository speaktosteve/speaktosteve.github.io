<script lang="ts">
	import banner from '$lib/assets/banner.webp';
	export let title = 'Tech Blog';
	export let description = '';

	$: bannerClass = `bg-[url(${banner})]`;
</script>

<!-- <div class="relative">
	<img src={banner} alt="" class="w-full object-cover sm:max-h-[15rem]" />
	<div
		class="absolute inset-2 flex flex-col items-center justify-center bg-white/30 backdrop-blur-lg sm:inset-10"
	>
		<h2 class="text-center text-xl font-bold tracking-wider">{title}</h2>
		<h3 class="px-2 text-center text-base tracking-wide">{description}</h3>
	</div>
</div> -->
<div style={`background-image: url(${banner})`} class="p-4">
	<div class="m-4 bg-white/30 p-2 backdrop-blur-lg">
		<h2 class="text-center text-xl font-bold tracking-wider">{title}</h2>
		<h3 class="px-2 text-center text-base tracking-wide">{description}</h3>
	</div>
</div>
