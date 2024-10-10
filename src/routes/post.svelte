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
	<p class="my-4 text-center text-sm font-medium text-slate-500">{publishedAt}</p>
	<hr class="mx-4 my-8" />
	<section class="prose mx-auto w-full px-4 text-slate-900">
		<slot />
	</section>
</article>
