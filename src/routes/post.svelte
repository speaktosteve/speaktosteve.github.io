<script lang="ts">
	import Banner from './banner.svelte';

	export let title = '';
	export let description = '';
	export let date = new Date();
	export let tags = [''];

	$: publishedAt = date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	$: formattedTags = tags.join(', ');
</script>

<article class="pb-12">
	<Banner {title} {description} />
	<p class="mt-10 text-center text-sm font-medium">{formattedTags}</p>
	<p class="mt-4 text-center text-sm font-medium text-slate-500">{publishedAt}</p>

	<section class="prose mx-auto w-full text-slate-900">
		<slot />
	</section>
</article>
