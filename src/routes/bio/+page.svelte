<script lang="ts">
	import { POSTS_LIST } from '$lib/shared/shared.constant';
	import Banner from '../../components/banner.svelte';
	import Contact from '../../components/contact.svelte';
	import ContentWrapper from '../../components/content-wrapper.svelte';
	import JobExperienceItem from '../../components/job-experience-item.svelte';
	import SiteTitle from '../../components/site-title.svelte';
</script>

<svelte:head>
	<title>speaktosteve | bio</title>
	<meta
		name="description"
		content="More my own online notebook than any genuine thought leadership. If you find something useful then happy days!"
	/>
	<meta
		name="keywords"
		content="blog, front-end, devops, azure, next.js, css, tailwind, static web apps, github actions, environment variables"
	/>
</svelte:head>

<SiteTitle />

<ContentWrapper>
	<Contact />

	<article class="relative bg-white px-4 py-2 dark:bg-slate-900 print:py-2">
		<section
			class="prose mx-auto dark:prose-invert prose-code:before:hidden prose-code:after:hidden print:py-0 print:text-sm text-sm lg:text-base"
		>
			<p>
				Steve leads cross-discipline teams to deliver technical projects for international
				organisations calling upon extensive experience in technology and delivery, particularly in
				front-end web development and cloud engineering,
			</p>
			<p>
				He drives projects, ensuring teams are working efficiently and leveraging modern engineering
				best practices to rapidly and safely deliver software that is secure, robust, scalable, and
				engages the user.
			</p>
			<p>
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
					<h4 class="mb-8 uppercase block border-b pb-3 border-slate-200">
						Certifications &amp; Qualifications
					</h4>
					<ul class="text-sm pl-4">
						<li>MS Certified: DevOps Engineer Expert</li>
						<li>MS Certified: Azure Developer Associate</li>
						<li>MS Certified: Azure Data Fundamentals</li>
						<li>MS Certified: Azure Power Platform Fundamentals</li>
						<li>GitHub Actions</li>
						<li>AWS Certified Solutions Architect - Associate</li>
						<li>Professional Scrum Master (Scrum.org)</li>
						<li>Certified ScrumMaster (Scrum Alliance)</li>
						<li>BSc Computing (Hons)</li>
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
						training sessions and providing guidance. Speaker at conferences and events on topics
						such as cloud engineering, front-end development and AI.
					</p>
					<ul class="list-none pl-6 ml-4 my-8 text-sm leading-relaxed border-l border-slate-200">
						<JobExperienceItem
							title="Tech Lead/Architect/Fabric and AI Engineer - IoT, Data & AI Platform"
							technologies={[
								'ADO',
								'Azure',
								'CI/CD',
								'Data engineering',
								'DevOps',
								'Engineering management',
								'MS Fabric',
								'OpenAI',
								'Svelte',
								'tailwindcss',
								'Tech architecture',
								'Terraform',
								'TypeScript'
							]}
						>
							<p>
								Architected, designed and delivered a IoT, data and AI platform and web front-end
								for a large-scale SaaS product using Microsoft Foundry, Fabric, Azure, and Svelte.
								The platform leverages various Microsoft technologies to ingest, process and store
								large volumes of IoT data, providing real-time insights and analytics to end-users.
								<br /> Includes the design and build of specialist agents to support the platform's AI
								capabilities and respond to user queries.
							</p>
							<p>
								Ran the team of developers, testers and security specialists to produce a scalable,
								secure, efficient and maintainable platform.
							</p>
						</JobExperienceItem>
						<JobExperienceItem
							title="Tech Lead/Architect – Avanade Intelligent Garden"
							technologies={[
								'ADO',
								'Azure',
								'CI/CD',
								'Data engineering',
								'DevOps',
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
								architecture and engineering processes to ensure the delivery of secure, scalable
								and maintainable software, helped troubleshoot complex issues and guided the team to
								ensure best practices were being met.
							</p>
							<p>
								Built the Tree Talk component using Azure OpenAI, Node.js, Server-Side Events (SSE)
								and Svelte. This feature leveraged a RAG AI chat bot allowing users to engage with
								each tree in the garden and understand about it's care needs and background.
							</p>
						</JobExperienceItem>

						<JobExperienceItem
							title="Infrastructure, DevOps and Dev Lead"
							technologies={[
								'.NET Core',
								'ADO',
								'Azure',
								'CI/CD',
								'DevOps',
								'Engineering management',
								'Tech architecture',
								'Terraform'
							]}
						>
							<p>
								Led the management of the infrastructure and devops practices for a high-profile,
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
								'DevOps',
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
								of emerging tech such as GenAI.
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
								'DevOps',
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
