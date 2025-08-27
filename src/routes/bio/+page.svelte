<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import Banner from '../../components/banner.svelte';
	import ContentWrapper from '../../components/content-wrapper.svelte';
	import JobExperienceItem from '../../components/job-experience-item.svelte';
</script>

<svelte:head>
	<title>speaktosteve | bio</title>
	<meta
		name="description"
		content="More my own online notebook than any genuine thought leadership. If you find something useful then happy days!"
	/>
	<meta
		name="keywords"
		content="blog, front-end, dev-ops, azure, next.js, css, tailwind, static web apps, github actions, environment variables"
	/>
</svelte:head>

<h1 class="text-4xl font-bold mx-auto text-center hidden print:block">
	Steve Smith - Engineering/Dev Lead
</h1>

<Banner
	siteDescription="Steve manages technical teams to deliver complex projects for international clients. He calls on his experience in software development, particularly in front-end web development, to ensure the team are working efficiently, engineering best practices are adhered to and the resulting work engages the user."
/>
<ContentWrapper>
	<article class="relative bg-white px-0 py-2 dark:bg-slate-900 print:py-2">
		<section
			class="prose mx-auto dark:prose-invert prose-code:before:hidden prose-code:after:hidden print:py-0"
		>
			<ul class="py-0 flex text-xs px-0 gap-2 justify-between mb-8">
				<li class="flex items-center gap-2">
					<svg
						viewBox="0 0 24 24"
						width="20"
						height="20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path
								d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
								class="stroke-black dark:stroke-white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
							<rect
								x="3"
								y="5"
								width="18"
								height="14"
								rx="2"
								class="stroke-black dark:stroke-white"
								stroke-width="2"
								stroke-linecap="round"
							></rect>
						</g></svg
					>
					<a href="mailto:speaktosteve@gmail.com">speaktosteve@gmail.com</a>
				</li>
				<li class="flex items-center gap-2">
					<svg viewBox="0 0 98 96" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
							class="w-6 h-6 fill-black dark:fill-white"
						/></svg
					><a href="https://github.com/speaktosteve">https://github.com/speaktosteve</a>
				</li>
				<li class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						class="fill-black dark:fill-white"
					>
						<path
							d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/></svg
					><a href="https://www.linkedin.com/in/speaktosteve"
						>https://www.linkedin.com/in/speaktosteve</a
					>
				</li>
			</ul>

			<h4 class="mb-8 uppercase">Recent Experience</h4>
			<ul class="list-none px-0 mb-8">
				<li class="px-0">
					<h4 class="uppercase text-sm flex justify-between">
						<span>Group Manager - Avanade UK</span> <span>2018 to current</span>
					</h4>
					<ul class="list-none pl-0 py-1 text-sm leading-relaxed">
						<JobExperienceItem
							title="Tech Lead/Architect – Avanade Intelligent Garden"
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						>
							<p>
								Led the technical design and delivery of the platform that drives the gold medal
								winning Avanade Intelligent Garden, showcased at the RHS Chelsea Flower Show. I set
								the overall technical direction while staying hands-on with the code across the
								stack, from the Svelte 5 front-end to the Node.js microservices and Cosmos database.
								Designed
							</p>
							the architecture to make sure it’s scalable and maintainable, helped troubleshoot complex
							issues and guided the team to ensure best practices were being met.
						</JobExperienceItem>

						<JobExperienceItem
							title="Infrastructure, Dev-Ops and Dev Lead"
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						>
							<p>
								Led the management of the infrastructure and dev-ops practices for a high-profile,
								high-demand national healthcare programme using Terraform, Azure DevOps and Azure.
								Led developers to design and develop resilient software for managing bulk
								operations. Coached the development team to ensure best practices were implemented
								around development lifecycle and code quality.
							</p>
						</JobExperienceItem>
						<JobExperienceItem
							title="Lead Developer – Accenture The Dock"
							description="Front-end lead on a number of assets created at The Dock to showcase the application
								of emerging tech such as Gen AI. I led small teams to deliver complex interfaces
								using Next.js and React in an agile environment."
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>
						<JobExperienceItem
							title="Delivery and Dev Lead"
							description="Led a combined onshore/offshore team of designers, developers, testers and BAs to
								deliver a responsive React and .NET Core web app for a UK-based service provider.
								Responsibilities included client management, agile coaching, development lead and
								hands-on front-end development."
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>

						<JobExperienceItem
							title="Agile Coach - Banking"
							description="Guided a multinational banking client in a major portfolio of work that focused on
								providing a digital portal for commercial banking clients. Responsibilities included
								coaching business and technical stakeholders towards a successful programme of
								sprint delivery."
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>

						<JobExperienceItem
							title="Lead Dev/Architect – BP Design Lab"
							description="Led the development of the BP Design System, working as part of the Scrum Team. This
								role required leadership and coaching of the development team as well as technical
								architecture, DevOps implementation, automated testing, vendor analysis and
								accessibility conformance."
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>
						<JobExperienceItem
							title="Delivery Lead/UI Dev/Scrum Master - FMCG"
							description="Delivery Lead role on an ambitious project to define the new digital workplace using
								SharePoint for a multi-national FMCG client. As definition moved into execution
								Steve assumed a Scrum Master role, working closely with the Product Owner and
								distributed development team to ensure the Scrum processes were understood and
								leveraged and to help the Product Owner define and prioritise requirements. Used
								DevOps experience to create build and deployment pipelines to streamline development
								processes."
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>
					</ul>
				</li>
			</ul>
			<ul class="list-none px-0">
				<li>
					<h4 class="font-bold">AKQA - 2004 to 2018</h4>
					<ul class="list-none pl-0 py-1 text-sm leading-relaxed">
						<JobExperienceItem
							title="Technical Delivery Manager/Scrum Master – Consumer Tech"
							description="Led team to build a platform and native mobile applications to support a major
								consumer technology client’s new robotic vacuum cleaner. The platform supported one
								million robotic devices at launch. Responsibilities include designing and
								implementing a DevOps and Cloud Architecture strategy, managing onshore/offshore
								development team and Agile Coaching of the team and client-side Product Owner."
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>

						<JobExperienceItem
							title="Technical Delivery Manager - Various Brands"
							description="<p>
								Leading teams of developers to produce enterprise-level solutions for world-famous
								clients such as Dyson, Nivea, Nissan, Nike, the British Army and Heineken.
							</p>
							<p>
								The deliverables vary, from iOS and Android applications integrating with 3rd party
								services and wearable devices, to responsively-designed web applications fronting a
								platform of web services.
							</p>
							<p>
								Projects span from delivering campaign sites in four weeks to developing complex
								platforms over nine months.
							</p>
							<p>
								The teams vary in size, the largest being a team of six developers, three QA
								Analysts and two Technical Architects. Often this involves managing off-shore
								resources.
							</p>
							<p>
								The role involves project scoping and planning, high-level technical design, leading
								client meetings, day-to-day running of the development team and line management.
							</p>"
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>

						<JobExperienceItem
							title="Senior Software Engineer"
							description="<p>
								Moved from being a Senior Web Developer to a Software Engineer and then a Senior
								Software Engineer. Steve developed web applications and web services using .NET MVC
								for clients such as Fiat and the British Army.
							</p>
							<ul>
								<li>Technical design and implementation using the latest .NET technologies</li>
								<li>Configuring web servers and hosting environments</li>
								<li>
									Practicing test-driven and business-driven development using tools such as NUnit,
									MSpec and Specflow - Ensuring coding standards are complied with using tools such
									as ReSharper, FxCop and StyleCop - Performing peer reviews and peer programming
								</li>
							</ul>"
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>
						<JobExperienceItem
							title="Senior Software Engineer"
							description="<p>
								Moved from being a Senior Web Developer to a Software Engineer and then a Senior
								Software Engineer. Steve developed web applications and web services using .NET MVC
								for clients such as Fiat and the British Army.
							</p>
							<ul>
								<li>Technical design and implementation using the latest .NET technologies</li>
								<li>Configuring web servers and hosting environments</li>
								<li>
									Practicing test-driven and business-driven development using tools such as NUnit,
									MSpec and Specflow - Ensuring coding standards are complied with using tools such
									as ReSharper, FxCop and StyleCop - Performing peer reviews and peer programming
								</li>
							</ul>"
							technologies={[
								'Azure',
								'ADO',
								'TypeScript',
								'Svelte',
								'tailwindcss',
								'Terraform',
								'Tech Architecture',
								'Engineering Management'
							]}
						/>
					</ul>
				</li>
			</ul>

			<h4 class="mb-8 hidden border-b border-slate-800 pb-4 lg:block dark:border-slate-600">
				Skills
			</h4>
			<ul class="mb-12">
				<li>Full-stack development (.NET Core, Node, TypeScript, Remix)</li>
				<li>Front-end development with JavaScript libraries (React, Svelte, Next.js, Angular)</li>
				<li>UI development (HTML, CSS, SASS, JavaScript)</li>
				<li>Azure and AWS cloud engineering</li>
				<li>Technical architecture/design</li>
				<li>DevOps (Azure, ADO, GitHub, Octopus, Terraform, ARM)</li>
				<li>Team leadership, planning, coordination</li>
				<li>Agile coaching</li>
			</ul>

			<h4 class="mb-8 hidden border-b border-slate-800 pb-4 lg:block dark:border-slate-600">
				Certifications
			</h4>
			<ul class="mb-8">
				<li>Microsoft Certified: Azure Solutions Architect Expert</li>
				<li>Microsoft Certified: Azure Developer Associate</li>
				<li>Microsoft Certified: DevOps Engineer Expert</li>
				<li>GitHub Actions</li>
				<li>AWS Certified Solutions Architect - Associate</li>
				<li>Professional Scrum Master (Scrum.org)</li>
				<li>Certified ScrumMaster (Scrum Alliance)</li>
				<li>Azure Power Platform Fundamentals</li>
				<li>Azure Data Fundamentals</li>
			</ul>
		</section>
	</article>
</ContentWrapper>
