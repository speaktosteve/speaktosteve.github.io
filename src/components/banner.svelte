<script lang="ts">
	import banner from '$lib/assets/banner.webp';
	import logo from '$lib/assets/logo.webp';
	export let heading = '';
	export let siteDescription = '';
	export let description = '';
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

<div class="bg-banner bg-cover py-4 pb-8 text-slate-200">
	<div class="m-4 mx-auto bg-black/30 p-6 backdrop-blur-lg lg:max-w-[50rem]">
		{#if date}
			<span class="block pb-4 text-sm">{publishedAt}</span>
		{/if}
		{#if siteDescription}
			<h2 class="text-center text-lg">{siteDescription}</h2>
		{/if}
		{#if heading}
			<h2 class="pb-6 text-3xl">{heading}</h2>
		{/if}
		{#if description}
			<h3 class="space-x-5 text-sm leading-6">{description}</h3>
		{/if}
		{#if formattedTags}
			<h3 class="pt-6 text-sm">[{formattedTags}]</h3>
		{/if}
	</div>
</div>
