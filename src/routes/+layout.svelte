<script>
	import TopBar from '../components/top-bar.svelte';
</script>

<div
	class="bg-slate-300 py-0 text-black dark:bg-slate-800 dark:text-slate-200 text-sm leading-relaxed"
>
	<div
		class="mx-auto print:px-10 w-full shadow-2xl sm:w-11/12 xl:w-2/3 2xl:w-3/4 2xl:max-w-[70rem] print:w-full print:shadow-none"
	>
		<TopBar />
		<slot />
	</div>
</div>
