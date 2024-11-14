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
- [Motion](#motion)
- [References](#references)

<!-- TOC end -->

---

<!-- TOC --><a name="overview"></a>
### Overview

Ok, so parallax might have been massively over-used on every digital campaign and product site since 2010, but they are still a guilty pleasure of mine - I think they still have a place when used sparingly/subtely.

These types of effects are extremely simple to implement, very little code needs to be added and you don't need to use heavy libraries unless you are doing something more elaborate. 

Below I have provided some common approaches for adding parallax. You will see they are built as Svelte components, but should be very easy to port (apart from the Svelte Animation one). Also, I am using Tailwind, but only for some basic styling.

I repeat the same, simple parallax effect so that you can compare the approaches. I went simple so that you can build upon these animations as you wish. 

Leveraging a library such as Motion simplifies complex animations, tweening, pinning etc. If I was just after the simple parallax in the example I would stick with Vanilla JS, but the libraries are very good as you get more ambitious in your animations. 


----

<!-- TOC --><a name="vanilla-js"></a>
### Vanilla JS

This is as simple as it gets, we simply change the `translateY` value of the target element as the user scrolls:

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

What this does:

 - `scrollY` is a reactive variable that holds the current vertical scroll position (`window.scrollY`). It updates automatically whenever the page is scrolled.
 - The `handleScroll` function updates the value of `scrollY` with the current scroll position.
 - `onMount()` is a Svelte lifecycle function that runs when the component is first rendered. It attaches the handleScroll function to the window's scroll event, so every time the user scrolls, scrollY gets updated.
 - The function returned from `onMount()` is a cleanup function. It removes the scroll event listener when the component is destroyed, preventing potential memory leaks.
`

As you scroll down, `scrollY` increases, and the second paragraph moves upwards (because of the negative multiplier).

For example:
 - If `scrollY` = 100px, then the transform will be `translateY(-50px)`.
 - If `scrollY` = 200px, then the transform will be `translateY(-100px)`.
 - The effect makes the second `<p>` tag appear to "float" over the background, moving more slowly than the rest of the page, which is a classic parallax scrolling effect.

You could improve on the implementation by adding debouncing if the performance is impacted by the frequency of the `handleScroll` function being called. Also, for smoother animations, especially on older devices, you might wrap the `handleScroll` logic within `requestAnimationFrame()`.

[View demo here](./svelte-parallax-three-ways/demo-vanilla/)

---

<!-- TOC --><a name="svelte-animations"></a>
### Svelte Animations

This is very similar to the above approach, but leverages some of the `svelte/animate` functions built into Svelte to give you control over easing and tweening to give a smoother effect. 

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

[View demo here](./svelte-parallax-three-ways/demo-svelte-animations/)

See [Svelte Animate Tutorials](https://svelte.dev/tutorial/svelte/animations) for official docs and tutorials.

---

<!-- TOC --><a name="motion"></a>
### Motion

Formely, Framer Motion, Motion is an animation library that provides JavaScript and React 'flavours'.

You will need to install the package for the following implementation:

```bash
npm install motion
```

or for `yarn`:

```bash
yarn add motion
```

The following component uses the `animate` and `scroll` functions from the `motion` library to apply a simple animation triggered as the user scrolls.

```svelte
<script>
	import { onMount } from 'svelte';
	import { animate, scroll } from 'motion';

	let parallax;

	onMount(() => {
		scroll(animate(parallax, { y: [-100, 120] }, { ease: 'linear' }), {
			target: parallax
		});
	});
</script>

<div class="relative h-[200vh] bg-green-500 py-24">
	<p class="bg-blue-500 p-5">This is a fixed panel with no parallax effect.</p>
	<p class="mt-24 bg-blue-500 p-5" bind:this={parallax}>
		This is a parallax panel with a smooth transform effect.
	</p>
</div>

```

What this does:

 - `scroll()`
   - sets up an animation that responds to scrolling.
   - it takes two arguments:
     - The animate function: This is where the animation details are defined.
     - Options object: Contains settings for how the scroll-triggered animation should behave.
 - `animate()`
   - the `animate(parallax, { y: [-100, 120] }, { ease: 'linear' })` animates the parallax element.
    - `y: [-100, 120]` - the element's vertical position (y) is animated from -100px to 120px.
    - as you scroll, the element will move down from -100px above its original position to 120px below it.
  - `ease: 'linear'`
     - This specifies a linear easing function, meaning the animation will progress at a constant speed.
 - `{ target: parallax }`
   - This option ensures that the scroll animation is linked to the parallax element itself.


[View demo here](./svelte-parallax-three-ways/demo-motion/)

See [Motion docs](https://motion.dev/docs)

---

<!-- TOC --><a name="references"></a>
### References
