<div class="bg-banner bg-cover py-4 pb-8 print:pb-0 text-slate-200 print:text-black">
	<div class="m-4 mx-auto bg-black/30 p-6 backdrop-blur-lg lg:max-w-[50rem] print:my-0 print:py-0">
		<h2 class="pb-6 text-3xl text-center uppercase">Steve Smith</h2>
		<h3
			class="pb-6 text-xl text-center uppercase"
			class:pb-10={window.location.pathname === '/bio'}
		>
			Engineering Lead | Architect | Full-Stack Developer
		</h3>
		{#if window.location.pathname !== '/bio'}
			<a href="/bio" class="text-center block text-sm underline h-4"> Learn more about me </a>
		{/if}
	</div>
</div>
