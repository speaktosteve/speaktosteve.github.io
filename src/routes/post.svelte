<script lang="ts">
	import { getIcon } from '$lib/shared/utils';
	import Banner from '../components/banner.svelte';
	import ContentWrapper from '../components/content-wrapper.svelte';

	export let heading = '';
	export let description = '';
	export let date = '';
	export let tags = [''];
	export let references = [];
</script>

<svelte:head>
	<title>speaktosteve | {heading}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={tags.join(', ')} />
</svelte:head>

<Banner {heading} {description} {date} {tags} />
<ContentWrapper>
	<article>
		{#if references.length > 0}
			<aside class="prose mx-auto mt-[-1rem] p-4 pt-12 dark:prose-invert">
				<h3>References:</h3>
				<ul>
					{#each references as reference}
						<li>
							<a
								aria-label={reference.title}
								title={reference.title}
								href={reference.link}
								target="_blank"
								class="{getIcon(reference.type)} flex h-8 items-center gap-1 after:fill-white"
								>{reference.title}
							</a>
						</li>
					{/each}
				</ul>
				<hr class="mx-4 mt-8" />
			</aside>
		{/if}
		<section
			class="prose mx-auto p-4 dark:prose-invert prose-code:before:hidden prose-code:after:hidden"
		>
			<slot />
		</section>
	</article>
</ContentWrapper>
