<script lang="ts">
	export let title: string;
	export let technologies: string[] = [];
</script>

<li class="mb-8 px-0">
	<h5 class="font-bold flex items-center gap-2">
		{title}
	</h5>
		<slot />

	{#if technologies.length > 0}
		<ul class="flex flex-wrap gap-8 gap-y-0 text-xs px-4 text-gray-500">
			{#each technologies as tech}
				<li class="px-0">{tech}</li>
			{/each}
		</ul>
	{/if}
</li>
