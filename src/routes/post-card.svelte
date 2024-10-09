<script lang="ts">
	export let url = '';
	export let title = '';
	export let description = '';
	// export let author = '';
	// export let date = '';
	export let tags = [''];

	// $: publishedAt = DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
</script>

<div class="flex flex-col overflow-hidden rounded border border-slate-200">
	<div class="flex flex-1 flex-col justify-between p-6">
		<div class="flex-1">
			<p class="text-sm font-medium">{tags}</p>
			<a href={url} class="mt-2 block">
				<p
					class="text-2xl font-semibold hover:cursor-pointer hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent"
				>
					{title}
				</p>
				<p class="mt-3 text-base">
					{description}
				</p>
				<p>{tags}</p>
			</a>
		</div>
		<div class="mt-6 flex flex-col justify-center">
			<!-- <p class="text-sm font-medium text-gray-900">{author}</p> -->
			<div class="flex space-x-1 text-sm text-gray-500">
				<!-- <span>{publishedAt}</span> -->
			</div>
		</div>
	</div>
</div>
