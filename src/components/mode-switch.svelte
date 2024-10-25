<script>
	const toggleTheme = () => {
		document.documentElement.classList.toggle('dark');
	};
</script>

<button on:click={toggleTheme}>mode</button>
