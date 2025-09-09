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

<div class="bg-banner bg-cover py-4 pb-8 print:pb-0 text-slate-200 print:text-black">
	<div class="m-4 mx-auto bg-black/30 p-6 backdrop-blur-lg lg:max-w-[50rem] print:my-0 print:py-0">
		<h2 class="pb-6 text-3xl text-center uppercase">Steve Smith</h2>
		<h3 class="pb-6 text-xl text-center uppercase">
			Engineering Lead | Architect | Full-Stack Developer
		</h3>
	</div>
</div>

<ContentWrapper>
	<article class="relative bg-white px-0 py-2 dark:bg-slate-900 print:py-2">
		<section
			class="prose mx-auto dark:prose-invert prose-code:before:hidden prose-code:after:hidden print:py-0"
		>
			<ul class="pt-0 pb-8 flex text-xs px-0 gap-2 justify-between mb-8 print:mb-0">
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

			<p class="print:text-sm">
				Steve leads cross-discipline teams to deliver technical projects for international
				organisations calling upon extensive experience in technology and delivery, particularly in
				front-end web development and cloud engineering,
			</p>
			<p class="print:text-sm">
				He drives projects, ensuring teams are working efficiently and leveraging modern engineering
				best practices to rapidly and safely deliver software that is robust, scalable, and engages
				the user.
			</p>
			<p class="pb-8 print:text-sm print:pb-0">
				He thrives when mentoring and coaching others, helping them to grow their skills and advance
				their careers. He believes in fostering a culture of learning and improvement in teams, and
				is always looking for ways to encourage knowledge sharing and collaboration.
			</p>

			<div class="gap-16 md:flex pb-8 print:pb-0">
				<section class="md:w-3/5">
					<h4 class="mb-8 uppercase block border-b pb-3 border-slate-200">Skills</h4>
					<ul class="text-sm pl-4">
						<li>
							Full-stack development (.NET Core, Node, TypeScript, Svelte, Next.js, React, Angular)
						</li>
						<li>UI development (HTML, CSS, SASS, JavaScript, Storybook, Design Systems)</li>
						<li>Azure and AWS cloud engineering</li>
						<li>Technical architecture/design</li>
						<li>DevOps (Azure, ADO, GitHub, Terraform)</li>
						<li>MS Fabric data engineering</li>
						<li>AI chatbot development</li>
						<li>Delivery management (SCRUM, Kanban, Waterfall) and Agile coaching</li>
						<li>Team leadership, training, scheduling, recruitment and planning</li>
					</ul>
				</section>
				<section class="md:w-2/5">
					<h4 class="mb-8 uppercase block border-b pb-3 border-slate-200">Certifications</h4>
					<ul class="text-sm pl-4">
						<li>MS Certified: Azure Solutions Architect Expert</li>
						<li>MS Certified: Azure Developer Associate</li>
						<li>MS Certified: DevOps Engineer Expert</li>
						<li>GitHub Actions</li>
						<li>AWS Certified Solutions Architect - Associate</li>
						<li>Professional Scrum Master (Scrum.org)</li>
						<li>Certified ScrumMaster (Scrum Alliance)</li>
						<li>Azure Power Platform Fundamentals</li>
						<li>Azure Data Fundamentals</li>
					</ul>
				</section>
			</div>

			<h4 class="mb-8 uppercase block border-b pb-3 border-slate-200">Recent Experience</h4>
			<ul class="list-none px-0 mb-8">
				<li class="px-0">
					<h4 class="uppercase text-sm flex justify-between">
						<span>Head of Front-End and Group Manager - Avanade UK</span>
						<span>2018 to current</span>
					</h4>
					<p class="text-sm py-4">
						Led numerous high-profile projects and initiatives, driving innovation and excellence in
						front-end development. Active member of the Agile and technology communities, leading
						training sessions and providing guidance.
					</p>
					<ul class="list-none pl-6 ml-4 my-8 text-sm leading-relaxed border-l border-slate-200">
						<JobExperienceItem
							title="Tech Lead/Architect/Fabric and AI Engineer – Forthcoming Product"
							technologies={[
								'ADO',
								'Azure',
								'CI/CD',
								'Data engineering',
								'Engineering management',
								'MS Fabric',
								'OpenAI',
								'Server-Side Events (SSE)',
								'Svelte',
								'tailwindcss',
								'Tech architecture',
								'Terraform',
								'TypeScript'
							]}
						>
							<p>Fabric, AI, ML, Svelte, Azure</p>
						</JobExperienceItem>
						<JobExperienceItem
							title="Tech Lead/Architect – Avanade Intelligent Garden"
							technologies={[
								'ADO',
								'Azure',
								'CI/CD',
								'Data engineering',
								'Engineering management',
								'OpenAI',
								'Server-Side Events (SSE)',
								'Svelte',
								'tailwindcss',
								'Tech architecture',
								'Terraform',
								'TypeScript'
							]}
						>
							<p>
								Led the technical design and delivery of the gold medal winning Avanade Intelligent
								Garden, showcased at the RHS Chelsea Flower Show 2025. Set the overall technical
								direction while staying hands-on with the code across the stack, from the Svelte 5
								front-end to the Node.js microservices and Cosmos database. Designed the
								architecture to make sure it’s scalable and maintainable, helped troubleshoot
								complex issues and guided the team to ensure best practices were being met.
							</p>
							<p>
								Built the Tree Talk component using Azure OpenAI, Node.js, Server-Side Events (SSE)
								and Svelte. This feature leveraged a RAG AI chat bot allowing users to engage with
								each tree in the garden and understand about it's care needs and background.
							</p>
						</JobExperienceItem>

						<JobExperienceItem
							title="Infrastructure, Dev-Ops and Dev Lead"
							technologies={[
								'.NET Core',
								'ADO',
								'Azure',
								'CI/CD',
								'Engineering management',
								'Tech architecture',
								'Terraform'
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
							technologies={[
								'AWS',
								'Bootstrap',
								'CI/CD',
								'Engineering management',
								'Next.js',
								'React',
								'Storybook',
								'tailwindcss',
								'TypeScript'
							]}
						>
							<p>
								Front-end lead on a number of assets created at The Dock to showcase the application
								of emerging tech such as Gen AI.
							</p>
							<p>
								Led development teams to deliver complex interfaces with complex business rules
								using Next.js and React in an Agile environment.
							</p>
							<p>
								Introduced engineering best-practices such as automated testing, Storybook, CI/CD
								and serverless cloud hosting.
							</p>
						</JobExperienceItem>
						<JobExperienceItem
							title="Delivery and Dev Lead"
							technologies={[
								'Agile coaching',
								'Bootstrap',
								'CI/CD',
								'Delivery lead/client management',
								'Engineering management',
								'React',
								'Storybook',
								'Tech architecture',
								'TypeScript'
							]}
						>
							<p>
								Led a combined onshore/offshore team of designers, developers, testers and BAs to
								deliver a responsive React and .NET Core web app for a UK-based service provider.
								Responsibilities included client management, Agile coaching, development lead and
								hands-on front-end development.
							</p>
						</JobExperienceItem>

						<JobExperienceItem
							title="Agile Coach - Banking"
							technologies={['Agile coaching', 'Engineering management']}
						>
							<p>
								Guided a multinational banking client in a major portfolio of work that focused on
								providing a digital portal for commercial banking clients. Responsibilities included
								coaching business and technical stakeholders towards a successful programme of
								sprint delivery.
							</p>
						</JobExperienceItem>

						<JobExperienceItem
							title="Lead Dev/Architect – BP Design Lab"
							technologies={['CI/CD', 'React', 'SASS', 'Storybook']}
						>
							<p>
								Led the development of the BP Design System, working as part of the Scrum Team. This
								role required leadership and coaching of the development team as well as technical
								architecture, DevOps implementation, automated testing, vendor analysis and
								accessibility conformance.
							</p>
						</JobExperienceItem>
						<JobExperienceItem
							title="Delivery Lead/UI Dev/Scrum Master - FMCG"
							technologies={[
								'Agile coaching',
								'Delivery lead/client management',
								'Engineering management',
								'React',
								'Sharepoint'
							]}
						>
							<p>
								Delivery Lead role on an ambitious project to define the new digital workplace using
								SharePoint for a multi-national FMCG client. As definition moved into execution,
								assumed a Scrum Master role, working closely with the Product Owner and distributed
								development team to ensure the Scrum processes were understood and leveraged and to
								help the Product Owner define and prioritise requirements. Used DevOps experience to
								create build and deployment pipelines to streamline development processes.
							</p>
						</JobExperienceItem>
					</ul>
				</li>
			</ul>
			<ul class="list-none px-0 mb-8">
				<li>
					<h4 class="uppercase text-sm flex justify-between">
						<span>AKQA - various roles</span> <span>2004 to 2018</span>
					</h4>
					<p class="text-sm py-4">
						Progressed from HTML Producer to Technical Delivery Manager and Technical Lead. Worked
						on a variety of tech stacks, project types and clients - from IoT platforms for Dyson to
						campaign sites for the BBC and Marks and Spencer. Learnt how to use modern development
						practices and tools, including Agile methodologies, CI/CD pipelines, and cloud services.
					</p>
					<ul class="list-none pl-6 ml-4 my-8 text-sm leading-relaxed border-l border-slate-200">
						<JobExperienceItem
							title="Technical Delivery Manager/Scrum Master – Dyson"
							technologies={[
								'.NET C#',
								'ADO',
								'AWS',
								'CI/CD',
								'Cloud engineering',
								'DevOps',
								'Engineering management',
								'Technical architecture'
							]}
						>
							<p>
								Led team to build a platform and native mobile applications to support a Dyson’s new
								robotic vacuum cleaner. The platform supported one million robotic devices at
								launch. Responsibilities include designing and implementing a DevOps and Cloud
								Architecture strategy, managing onshore/offshore development team and Agile Coaching
								of the team and client-side Product Owner.
							</p>
						</JobExperienceItem>

						<JobExperienceItem
							title="Technical Delivery Manager - Various Brands"
							technologies={[
								'.NET C#',
								'ADO',
								'CI/CD',
								'DevOps',
								'Technical architecture',
								'Cloud engineering',
								'Engineering management'
							]}
							><p>
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
							</p>
						</JobExperienceItem>

						<JobExperienceItem
							title="Senior Software Engineer"
							technologies={[
								'.NET C#',
								'ADO',
								'CI/CD',
								'Cloud engineering',
								'DevOps',
								'Technical architecture'
							]}
						>
							<p>
								Moved from being a Senior Web Developer to a Software Engineer and then a Senior
								Software Engineer. Developed web applications and web services using .NET MVC for
								clients such as Fiat and the British Army.
							</p>
							<ul>
								<li>Technical design and implementation using the latest .NET technologies</li>
								<li>Configuring web servers and hosting environments</li>
								<li>
									Practicing test-driven and business-driven development using tools such as NUnit,
									MSpec and Specflow - Ensuring coding standards are complied with using tools such
									as ReSharper, FxCop and StyleCop - Performing peer reviews and peer programming
								</li>
							</ul>
						</JobExperienceItem>
						<JobExperienceItem
							title="Senior Web Developer"
							technologies={['CSS', 'HTML', 'JavaScript', 'React', 'Responsive design']}
							><p>
								Promoted from an HTML Producer (building HTML emails and editing XML templates) to a
								Senior Web Developer and leading the front-end development of complex solutions
								using HTML, CSS and JavaScript for clients such as Fiat, Nike and Microsoft.
							</p>
						</JobExperienceItem>
					</ul>
				</li>
			</ul>
		</section>
	</article>
</ContentWrapper>
