<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import PostCard from './post-card.svelte';
	import Banner from './banner.svelte';

	const featuredPosts = POSTS_LIST.filter((post) => post.isFeatured);
	const posts = POSTS_LIST.filter((post) => !post.isFeatured);
</script>

<svelte:head>
	<title>speaktosteve | tech blog</title>
	<meta
		name="description"
		content="More my own online notebook than any genuine thought leadership. If you find something useful then happy days!"
	/>
</svelte:head>

<Banner />

<div class="min-h-screen bg-white px-4 pt-4 sm:px-6 lg:px-8">
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-1">
		{#each featuredPosts as { url, title, description, date, tags, isFeatured }}
			<PostCard {url} {title} {description} {date} {tags} {isFeatured} />
		{/each}
	</ul>

	<!-- Lists -->
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-3">
		{#each posts as { url, title, description, date, tags, isFeatured }}
			<PostCard {url} {title} {description} {date} {tags} {isFeatured} />
		{/each}
	</ul>
</div>
