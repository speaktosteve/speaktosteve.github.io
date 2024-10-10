<script lang="ts">
	import banner from '$lib/assets/banner.webp';
	export let title = 'Tech Blog';
</script>

<div class="relative">
	<img src={banner} alt="" class="max-h-[15rem] w-full object-cover" />
	<div
		class="absolute inset-2 flex items-center justify-center bg-white/30 backdrop-blur-lg sm:inset-10"
	>
		<h2 class="text-center text-xl font-bold lowercase tracking-wider">{title}</h2>
	</div>
</div>
