<script>
	import TopBar from '../components/top-bar.svelte';
</script>

<div class="bg-slate-300 py-0 text-black dark:bg-slate-800 dark:text-slate-200">
	<div class="mx-auto w-full shadow-2xl sm:w-11/12 xl:w-2/3 2xl:w-3/4 2xl:max-w-[70rem]">
		<TopBar />
		<slot />
	</div>
</div>
