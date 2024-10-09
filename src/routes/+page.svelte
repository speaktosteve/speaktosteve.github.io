<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import PostCard from './post-card.svelte';
	import PostListItem from './post-list-item.svelte';

	const featuredPosts = POSTS_LIST.filter((post) => post.isFeatured);
	const posts = POSTS_LIST.filter((post) => !post.isFeatured);
</script>

<h2 class="py-6 text-center text-xl font-bold lowercase tracking-wider">Tech Blog.</h2>

<div class="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
	{#each featuredPosts as { url, title, description, author, date, tags }}
		<PostCard {url} {title} {description} {author} {date} {tags} />
	{/each}
</div>

<!-- Lists -->
<ul class="divide-y divide-slate-200">
	{#each posts as { url, title, description, author, date, tags }}
		<PostListItem {url} {title} {description} {author} {date} {tags} />
	{/each}
</ul>
