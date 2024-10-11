<script lang="ts">
	import banner from '$lib/assets/banner.webp';
	export let title = 'Tech Blog';
	export let description =
		'More my own online notebook than any genuine thought leadership. If you find something useful then happy days!';
	$: bannerPath = banner;
</script>

<div style={`background-image: url(${bannerPath})`} class="bg-cover p-4">
	<div class="m-4 mx-auto max-w-[40rem] bg-white/30 p-2 backdrop-blur-lg">
		<h2 class="text-center text-xl font-bold tracking-wider">{title}</h2>
		<h3 class="px-2 text-center text-sm">{description}</h3>
	</div>
</div>
