<script lang="ts">
	import { base } from '$app/paths';

	export let url = '';
	export let title = '';
	export let description = '';
	export let isFeatured = false;
	export let date = '';
	export let tags = [''];

	$: publishedAt = new Date(date).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: formattedTags = tags.join(', ');
	$: fullUrl = base + url;
</script>

<li
	class={`${isFeatured ? 'border-2' : 'border'} overflow-hidden rounded border-slate-100 p-6 shadow-sm hover:bg-slate-100`}
>
	<a href={fullUrl} class="mt-2 block" aria-label={title} title={description}>
		<p class={`${isFeatured ? 'text-2xl' : 'text-lg'} font-semibold`}>
			{title}
		</p>
		<p class="mt-3 {`${isFeatured ? 'line-clamp-3 text-base' : 'line-clamp-2 text-sm'}`}">
			{description}
		</p>
		<p class="mt-6 text-sm font-medium">[{formattedTags}]</p>
		<p class="mt-4 text-sm font-medium text-slate-500">{publishedAt}</p>
	</a>
</li>
