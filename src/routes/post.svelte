<script lang="ts">
	// import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	export let title = '';
	export let date = new Date();
	export let tags = [''];

	$: publishedAt = date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	$: formattedTags = tags.join(', ');
</script>

<article class="p-3 md:p-6">
	<!-- <h2 class="text-lg uppercase font-semibold text-gray-900">{tags}</h2> -->
	<h1 class="text-center text-3xl font-semibold">
		{title}
	</h1>
	<p class="mt-6 text-center text-sm font-medium">{formattedTags}</p>
	<p class="mt-4 text-center text-sm font-medium text-slate-500">{publishedAt}</p>

	<section class="prose py-4 text-slate-900">
		<slot />
	</section>
</article>
