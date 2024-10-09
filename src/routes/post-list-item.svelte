<script lang="ts">
	export let url = '';
	export let title = '';
	export let description = '';
	// export let author = '';
	export let date = '';
	export let tags = [''];
</script>

<li class="py-4">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-base font-semibold uppercase">{tags}</h2>
			<a
				href={url}
				class="mt-3 text-2xl font-bold tracking-tight hover:cursor-pointer hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent"
			>
				{title}
			</a>
			<p class="mx-auto mt-2 max-w-xl text-lg">
				{description}
			</p>
			<p class="mx-auto mt-2 max-w-xl text-lg">
				{date}
			</p>
		</div>
	</div>
</li>
