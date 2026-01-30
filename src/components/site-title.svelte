<script>
	import { page } from '$app/stores';
</script>

<div class="bg-banner bg-cover py-4 pb-8 print:pb-0 text-slate-200 print:text-black">
	<div
		class="m-4 mx-auto bg-black/30 p-6 backdrop-blur-lg lg:max-w-[50rem] print:my-0 print:py-0 min-h-48 text-center"
	>
		<h2 class="pb-6 text-3xl uppercase">Steve Smith</h2>
		<h3 class="pb-8 text-xl uppercase" class:pb-10={$page.url.pathname === '/bio'}>
			Engineering Lead | Architect | Full-Stack Developer
		</h3>
		{#if $page.url.pathname !== '/bio'}
			<a
				href="/bio"
				class="text-sm rounded-lg bg-white/10 hover:bg-white/20 py-2 sm:py-3 px-2 sm:px-6"
			>
				Learn more about me
			</a>
		{/if}
	</div>
</div>
