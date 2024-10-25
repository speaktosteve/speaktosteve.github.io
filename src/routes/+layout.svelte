<script>
	import TopBar from '../components/top-bar.svelte';
</script>

<div class="bg-slate-300 py-0 text-black md:py-10 dark:bg-slate-800 dark:text-slate-200">
	<div class="mx-auto w-full shadow-2xl sm:w-11/12 md:w-3/4 xl:w-2/3 2xl:w-1/2">
		<TopBar />
		<slot />
	</div>
</div>
