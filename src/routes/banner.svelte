<script lang="ts">
	import banner from '$lib/assets/banner.webp';
	export let heading = 'Tech Blog';
	export let description =
		'More my own online notebook than any genuine thought leadership. If you find something useful then happy days!';
	export let date = '';
	export let tags = [''];

	$: bannerPath = banner;
	$: publishedAt = new Date(date).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	$: formattedTags = tags.join(', ');
</script>

<div style={`background-image: url(${bannerPath})`} class="bg-cover p-4">
	<div class="m-4 mx-auto max-w-[65ch] bg-black/30 p-6 text-white backdrop-blur-lg">
		{#if date}
			<span class="pb-4 text-sm">{publishedAt}</span>
		{/if}
		<h2 class="text-3xl">{heading}</h2>
		<h3 class="space-x-5 pt-6 text-sm leading-6">{description}</h3>
		{#if formattedTags}
			<h3 class="pt-6 text-sm">[{formattedTags}]</h3>
		{/if}
	</div>
</div>
