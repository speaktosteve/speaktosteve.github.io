<script lang="ts">
	import Banner from './banner.svelte';

	export let heading = '';
	export let description = '';
	export let date = '';
	export let tags = [''];
	export let references = [];

	const getIcon = (type) => {
		switch (type) {
			case 'external':
				return 'after:content-externalLink';
			case 'repo':
				return 'after:content-github';
			default:
				return '';
		}
	};
</script>

<svelte:head>
	<title>speaktosteve | {heading}</title>
	<meta name="description" content={description} />
</svelte:head>

<article class="bg-white pb-12">
	<Banner {heading} {description} {date} {tags} />
	{#if references.length > 0}
		<aside class="prose mx-auto mt-6 p-4 text-slate-900">
			<h3>References:</h3>
			<ul>
				{#each references as reference}
					<li>
						<a
							aria-label={reference.title}
							href={reference.link}
							target="_blank"
							class="{getIcon(reference.type)} flex items-center gap-1">{reference.title}</a
						>
					</li>
				{/each}
			</ul>
			<hr class="mx-4 mt-8" />
		</aside>
	{/if}
	<section class="prose mx-auto p-4 text-slate-900">
		<slot />
	</section>
</article>
