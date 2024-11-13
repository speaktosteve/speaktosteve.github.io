---
heading: 'Parallax Three Ways'
description: 'Parallax Three Ways'
date: '2024-11-13'
tags: ['']
references: [
    
]
---
### Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Overview](#overview)
- [Vanilla JS](#vanilla-js)
- [Svelte Animations](#svelte-animations)
- [Framr](#framr)
   * [Error when using Framr with Next.js App Router or Svelte](#error-when-using-framr-with-nextjs-app-router-or-svelte)
- [References](#references)

<!-- TOC end -->

---

<!-- TOC --><a name="overview"></a>
### Overview



----

<!-- TOC --><a name="vanilla-js"></a>
### Vanilla JS

[demo](./svelte-parallax-three-ways/demo-vanilla/)

```svelte
<script>
	import { onMount } from 'svelte';

	let scrollY = 0;

	const handleScroll = () => {
		scrollY = window.scrollY;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<p class="bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>
	<p class="mt-24 bg-blue-500 p-5" style="transform: translateY({scrollY * -0.5}px);">
		This is a parallax panel with a simple transform effect.
	</p>
</div>
```

<!-- TOC --><a name="svelte-animations"></a>
### Svelte Animations

[demo](./svelte-parallax-three-ways/demo-svelte-animations/)

```svelte
<script>
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	// Create a tweened store with a default value of 0
	let scrollY = tweened(0, {
		duration: 300,
		easing: cubicOut
	});

	const handleScroll = () => {
		scrollY.set(window.scrollY);
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<p class=" bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>
	<p class="mt-24 bg-blue-500 p-5" style="transform: translateY({$scrollY * -0.5}px);">
		This is a parallax panel with a smooth transform effect.
	</p>
</div>
```

<!-- TOC --><a name="framr"></a>
### Framr

[demo](./svelte-parallax-three-ways/demo-framr/)

You'll need the Framr package:

```bash
npm install framr-motion
```

```bash
yarn add framr-motion
```

```svelte
<script>
	import { onMount } from 'svelte';
	import { motion } from 'framer-motion';

	let scrollY = 0;
	let parallaxRef;

	const handleScroll = () => {
		scrollY = window.scrollY;
		if (parallaxRef) {
			parallaxRef.style.transform = `translateY(${scrollY * -0.5}px)`;
		}
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<!-- Fixed Panel -->
	<p class="bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>

	<!-- Parallax Panel using Framer Motion -->
	<motion.p bind:this={parallaxRef} class="mt-24 block bg-blue-500 p-5">
		This is a parallax panel with a smooth transform effect.
	</motion.p>
</div>
```

<!-- TOC --><a name="error-when-using-framr-with-nextjs-app-router-or-svelte"></a>
#### Error when using Framr with Next.js App Router or Svelte

I had the following error when attempting to use `framr-motion` in Svelte (I have seen similar conversations about this error when using Next.js App Router)

```
Cannot find package 'react' imported from /Users/steve.a.smith/Documents/code/blog-root/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
```

Framer Motion is designed primarily for use with React, and it expects React to be installed in your project. If you're working in a non-standard setup (e.g., using Server Components in Next.js or Svelte), you might encounter this issue because React isn't part of your dependencies.

I solved this by adding `react` and `react-dom` packages as dependencies:

```bash
npm install react react-dom
```

```bash
yarn add react react-dom
```

---

<!-- TOC --><a name="references"></a>
### References
