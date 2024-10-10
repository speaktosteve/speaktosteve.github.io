<script lang="ts">
	import banner from '$lib/assets/banner.webp';
	export let title = 'Tech Blog';
	export let description = '';
</script>

<div class="relative">
	<img src={banner} alt="" class="max-h-[15rem] w-full object-cover" />
	<div
		class="absolute inset-2 flex flex-col items-center justify-center bg-white/30 backdrop-blur-lg sm:inset-10"
	>
		<h2 class="text-center text-xl font-bold tracking-wider">{title}</h2>
		<h3 class="px-2 text-center text-base tracking-wide">{description}</h3>
	</div>
</div>
