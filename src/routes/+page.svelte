<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import PostCard from '../components/post-card.svelte';
	import banner from '$lib/assets/banner.webp';
	import ContentWrapper from '../components/content-wrapper.svelte';
	$: bannerPath = banner;

	const featuredPosts = POSTS_LIST.filter((post) => post.isFeatured);
	const devOpsPosts = POSTS_LIST.filter((post) => post.topic === 'devops' && !post.isFeatured);
	const frontEndPosts = POSTS_LIST.filter((post) => post.topic === 'front-end' && !post.isFeatured);
</script>

<svelte:head>
	<title>speaktosteve | tech blog</title>
	<meta
		name="description"
		content="More my own online notebook than any genuine thought leadership. If you find something useful then happy days!"
	/>
</svelte:head>

<div style={`background-image: url(${bannerPath})`} class="bg-cover p-4 pb-16"></div>
<ContentWrapper>
	<p class="m-12 mt-4 border-b-4 border-slate-900 pb-4 text-center font-bold">
		More my own online notebook than any genuine thought leadership. If you find something useful
		then happy days!
	</p>
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-1">
		{#each featuredPosts as { url, title, description, date, tags, isFeatured }}
			<PostCard {url} {title} {description} {date} {tags} {isFeatured} />
		{/each}
	</ul>

	<h4 class="m-12 mb-8 border-b-4 border-slate-900 pb-4 text-center">DevOps, Cloud, Automation</h4>
	<!-- Lists -->
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-2">
		{#each devOpsPosts as { url, title, description, date, tags, isFeatured }}
			<PostCard {url} {title} {description} {date} {tags} {isFeatured} />
		{/each}
	</ul>

	<h4 class="m-12 mb-8 border-b-4 border-slate-900 pb-4 text-center">Front-End</h4>
	<!-- Lists -->
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-2">
		{#each frontEndPosts as { url, title, description, date, tags, isFeatured }}
			<PostCard {url} {title} {description} {date} {tags} {isFeatured} />
		{/each}
	</ul>
</ContentWrapper>
