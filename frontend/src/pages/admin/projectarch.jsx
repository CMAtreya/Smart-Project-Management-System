import React, { useState } from 'react';

// Mock navigate function since we don't have react-router-dom
const mockNavigate = (path) => {
  console.log(`Would navigate to: ${path}`);
  alert(`Navigation to: ${path}`);
};

// Simple SVG icons to replace react-icons
const CommentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
  </svg>
);

const ProjectIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

const CogIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
    <path d="m9 9 3-3 3 3"/>
    <path d="m9 15 3 3 3-3"/>
    <path d="M5 5v.01M19 5v.01M5 19v.01M19 19v.01"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
    <path d="M3 3v18h18"/>
    <path d="M7 12l4-4 4 4 4-4"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const ToolIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
);

const HourglassIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1">
    <path d="M5 22h14"/>
    <path d="M5 2h14"/>
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
    <path d="M7 22v-4.172a2 2 0 0 1 .586-1.414L12 12 7.586 7.414A2 2 0 0 1 7 6.172V2"/>
  </svg>
);

const CircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1">
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

// Status marks for flow arrows
const CheckMark = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full p-1">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  </div>
);

const XMark = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full p-1">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  </div>
);

// Simple Navbar component since it's not provided
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50 px-4 py-3">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <h2 className="text-white font-bold text-lg">Project Dashboard</h2>
      <div className="flex space-x-4">
        <span className="text-gray-300 text-sm">Welcome, User</span>
      </div>
    </div>
  </nav>
);

const phases = [
	{
		key: 'communication',
		title: 'Communication',
		description:
			'Requirement gathering, stakeholder interviews, and initial discussions to define project goals.',
		icon: <CommentIcon />,
		status: 'Completed',
		color: 'bg-blue-800/80 border-blue-500',
		onClick: (navigate) => navigate('/user/requirement-gathering'),
	},
	{
		key: 'planning',
		title: 'Planning',
		description:
			'Wireframing, prototyping, and project planning using collaborative design tools.',
		icon: <ProjectIcon />,
		status: 'In Progress',
		color: 'bg-purple-800/80 border-purple-500',
		onClick: () => window.open('https://www.figma.com/', '_blank'),
	},
	{
		key: 'construction',
		title: 'Construction',
		description:
			'Development, coding, and implementation of features with task tracking and code integration.',
		icon: <CogIcon />,
		status: 'Not Started',
		color: 'bg-green-800/80 border-green-500',
		onClick: (navigate) => navigate('/user/tasks'),
		extraLinks: [
			{
				label: 'GitHub',
				url: 'https://github.com/',
				icon: <ProjectIcon />,
			},
			{
				label: 'VS Code',
				url: 'https://vscode.dev/',
				icon: <CogIcon />,
			},
		],
	},
	{
		key: 'modeling',
		title: 'Modeling',
		description:
			'System and data modeling, architecture diagrams, and technical documentation.',
		icon: <ChartIcon />,
		status: 'Not Started',
		color: 'bg-yellow-800/80 border-yellow-500',
		onClick: () => window.open('https://www.lucidchart.com/', '_blank'),
	},
	{
		key: 'deployment',
		title: 'Deployment',
		description:
			'Release management, CI/CD, and deployment to production environments.',
		icon: <RocketIcon />,
		status: 'Not Started',
		color: 'bg-pink-800/80 border-pink-500',
		onClick: () => window.open('https://vercel.com/', '_blank'),
	},
	{
		key: 'maintenance',
		title: 'Maintenance',
		description:
			'Ongoing support, bug fixes, and continuous improvement post-launch.',
		icon: <ToolIcon />,
		status: 'Not Started',
		color: 'bg-gray-800/80 border-gray-500',
		onClick: () => window.open('https://trello.com/', '_blank'),
	},
];

const statusColors = {
	'Not Started': 'text-gray-400',
	'In Progress': 'text-blue-400',
	Completed: 'text-green-400',
};

const statusIcons = {
	'Not Started': <CircleIcon />,
	'In Progress': <HourglassIcon />,
	Completed: <CheckCircleIcon />,
};

export default function ProjectArchitecture() {
	const navigate = mockNavigate;
	const [hovered, setHovered] = useState(null);

	return (
		<>
			<Navbar />
			<div className="pt-16 min-h-screen bg-gray-900 bg-grid-pattern flex flex-col items-center py-10 px-4">
				<style>{`
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, rgba(100, 116, 139, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100, 116, 139, 0.07) 1px, transparent 1px);
            background-size: 32px 32px;
          }
        `}</style>
				<h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
					Project Architecture
				</h1>
				<p className="text-gray-300 mb-10 text-center max-w-2xl">
					A visual journey through the software development lifecycle. Click any
					phase to explore tools, resources, and progress for your project.
				</p>
				
				{/* Mobile Layout - Vertical Flow */}
				<div className="block md:hidden w-full max-w-md">
					<div className="flex flex-col items-center">
						{phases.map((phase, idx) => (
							<div key={phase.key} className="relative w-full flex flex-col items-center">
								{/* Phase Card */}
								<div
									className={`relative group transition-all duration-300 ${phase.color} border-2 rounded-2xl shadow-xl p-6 w-full cursor-pointer hover:scale-105 hover:shadow-blue-900/30 ${
										hovered === idx ? 'ring-2 ring-blue-400' : ''
									}`}
									onClick={() => phase.onClick(navigate)}
									onMouseEnter={() => setHovered(idx)}
									onMouseLeave={() => setHovered(null)}
									tabIndex={0}
									role="button"
									aria-label={`Go to ${phase.title}`}
								>
									<div className="flex items-center mb-3">
										{phase.icon}
										<span className="ml-3 text-xl font-semibold text-white">
											{phase.title}
										</span>
									</div>
									<p className="text-gray-300 mb-4 text-sm min-h-[48px]">
										{phase.description}
									</p>
									<div className="flex items-center mb-2">
										<span
											className={`text-xs font-medium ${statusColors[phase.status]}`}
										>
											{statusIcons[phase.status]}
											{phase.status}
										</span>
									</div>
									{/* Extra links for Construction phase */}
									{phase.key === 'construction' && (
										<div className="flex gap-2 mt-2">
											<a
												href="https://github.com/"
												target="_blank"
												rel="noopener noreferrer"
												className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded flex items-center transition-colors"
											>
												<ProjectIcon /> GitHub
											</a>
											<a
												href="https://vscode.dev/"
												target="_blank"
												rel="noopener noreferrer"
												className="text-xs bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 px-2 py-1 rounded flex items-center transition-colors"
											>
												<CogIcon /> VS Code
											</a>
										</div>
									)}
								</div>
								
								{/* Downward Arrow (except for last item) */}
								{idx < phases.length - 1 && (
									<div className="flex justify-center my-4 relative">
										<svg width="24" height="32" viewBox="0 0 24 32" className="text-gray-500">
											<path
												d="M12 2 L12 26 M8 22 L12 26 L16 22"
												stroke="currentColor"
												strokeWidth="2"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										{/* Status mark based on current phase completion */}
										{phase.status === 'Completed' ? <CheckMark /> : <XMark />}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Desktop Layout - Clean Vertical Flow */}
				<div className="hidden md:block w-full max-w-4xl">
					<div className="flex flex-col items-center space-y-8">
						{phases.map((phase, idx) => (
							<div key={phase.key} className="relative w-full flex flex-col items-center">
								{/* Phase Card */}
								<div
									className={`relative group transition-all duration-300 ${phase.color} border-2 rounded-2xl shadow-xl p-8 w-full max-w-2xl cursor-pointer hover:scale-105 hover:shadow-blue-900/30 ${
										hovered === idx ? 'ring-2 ring-blue-400' : ''
									}`}
									onClick={() => phase.onClick(navigate)}
									onMouseEnter={() => setHovered(idx)}
									onMouseLeave={() => setHovered(null)}
									tabIndex={0}
									role="button"
									aria-label={`Go to ${phase.title}`}
								>
									<div className="flex items-center mb-4">
										{phase.icon}
										<span className="ml-4 text-2xl font-semibold text-white">
											{phase.title}
										</span>
									</div>
									<p className="text-gray-300 mb-4 text-base leading-relaxed">
										{phase.description}
									</p>
									<div className="flex items-center justify-between">
										<span className={`text-sm font-medium ${statusColors[phase.status]}`}>
											{statusIcons[phase.status]}
											{phase.status}
										</span>
										
										{/* Extra links for Construction phase */}
										{phase.key === 'construction' && (
											<div className="flex gap-3">
												<a
													href="https://github.com/"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg flex items-center transition-colors"
													onClick={(e) => e.stopPropagation()}
												>
													<ProjectIcon /> <span className="ml-2">GitHub</span>
												</a>
												<a
													href="https://vscode.dev/"
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 px-3 py-2 rounded-lg flex items-center transition-colors"
													onClick={(e) => e.stopPropagation()}
												>
													<CogIcon /> <span className="ml-2">VS Code</span>
												</a>
											</div>
										)}
									</div>
								</div>
								
								{/* Downward Arrow (except for last item) */}
								{idx < phases.length - 1 && (
									<div className="flex justify-center my-6 relative">
										<svg width="32" height="48" viewBox="0 0 32 48" className="text-gray-500">
											<path
												d="M16 4 L16 40 M12 36 L16 40 L20 36"
												stroke="currentColor"
												strokeWidth="2"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										{/* Status mark based on current phase completion */}
										{phase.status === 'Completed' ? <CheckMark /> : <XMark />}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}