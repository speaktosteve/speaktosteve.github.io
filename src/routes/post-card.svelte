<script lang="ts">
	export let url = '';
	export let title = '';
	export let description = '';
	// export let author = '';
	export let date = new Date();
	export let tags = [''];

	$: publishedAt = date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: formattedTags = tags.join(', ');
</script>

<li class="overflow-hidden rounded border border-slate-100 bg-white p-6 hover:bg-slate-100">
	<a href={url} class="mt-2 block">
		<p class="text-2xl font-semibold">
			{title}
		</p>
		<p class="mt-3 line-clamp-3 text-base">
			{description}
		</p>
		<p class="mt-6 text-sm font-medium">{formattedTags}</p>
		<p class="mt-4 text-sm font-medium text-slate-500">{publishedAt}</p>
	</a>
</li>
