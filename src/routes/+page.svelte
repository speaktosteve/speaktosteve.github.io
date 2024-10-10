<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import PostCard from './post-card.svelte';
	import banner from '$lib/assets/banner.webp';
	import Banner from './banner.svelte';

	const featuredPosts = POSTS_LIST.filter((post) => post.isFeatured);
	const posts = POSTS_LIST.filter((post) => !post.isFeatured);
</script>

<Banner />

<div class="bg-white px-4 pt-4 sm:px-6 lg:px-8">
	<ul class="mx-auto mb-8 grid max-w-lg gap-5 bg-slate-200 p-4 lg:max-w-none lg:grid-cols-1">
		{#each featuredPosts as { url, title, description, author, date, tags }}
			<PostCard {url} {title} {description} {date} {tags} />
		{/each}
	</ul>

	<!-- Lists -->
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-3">
		{#each posts as { url, title, description, date, tags }}
			<PostCard {url} {title} {description} {date} {tags} />
		{/each}
	</ul>
</div>
