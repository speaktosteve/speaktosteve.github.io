<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import Banner from '../components/banner.svelte';
	import Contact from '../components/contact.svelte';
	import ContentWrapper from '../components/content-wrapper.svelte';
	import PostCard from '../components/post-card.svelte';
	import SiteTitle from '../components/site-title.svelte';

	const featuredPosts = POSTS_LIST.filter((post) => post.isFeatured && !post.isDisabled);
	const devOpsPosts = POSTS_LIST.filter((post) => post.topic === 'devops' && !post.isDisabled);
	const frontEndPosts = POSTS_LIST.filter((post) => post.topic === 'front-end' && !post.isDisabled);
</script>

<svelte:head>
	<title>speaktosteve | tech blog</title>
	<meta
		name="description"
		content="More my own online notebook than any genuine thought leadership. If you find something useful then happy days!"
	/>
	<meta
		name="keywords"
		content="blog, front-end, dev-ops, azure, next.js, css, tailwind, static web apps, github actions, environment variables"
	/>
</svelte:head>

<SiteTitle />

<ContentWrapper>
	<Contact />
	<h4
		class="mt-4 mb-8 hidden border-b border-slate-800 pb-4 text-center lg:block dark:border-slate-600"
	>
		Featured Articles
	</h4>
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-2">
		{#each featuredPosts as { url, title, description, date, tags, isFeatured }}
			<PostCard {url} {title} {description} {date} {tags} {isFeatured} />
		{/each}
	</ul>

	<h4 class="m-12 mb-8 border-b border-slate-800 pb-4 text-center dark:border-slate-600">
		DevOps, Cloud, Automation
	</h4>
	<!-- Lists -->
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-2">
		{#each devOpsPosts as { url, title, description, date, tags }}
			<PostCard {url} {title} {description} {date} {tags} />
		{/each}
	</ul>

	<h4 class="m-12 mb-8 border-b border-slate-800 pb-4 text-center dark:border-slate-600">
		Front-End
	</h4>
	<!-- Lists -->
	<ul class="mx-auto grid max-w-lg gap-5 p-4 lg:max-w-none lg:grid-cols-2">
		{#each frontEndPosts as { url, title, description, date, tags }}
			<PostCard {url} {title} {description} {date} {tags} />
		{/each}
	</ul>
</ContentWrapper>
