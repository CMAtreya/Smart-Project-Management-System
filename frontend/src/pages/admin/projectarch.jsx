import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import { 
  FaComments, FaProjectDiagram, FaCogs, FaChartLine, 
  FaRocket, FaTools, FaCheckCircle, FaClock, FaCircle,
  FaArrowRight, FaArrowDown, FaArrowUp, FaArrowLeft,
  FaLightbulb, FaCode, FaDatabase, FaServer, FaCloud,
  FaShieldAlt, FaUsers, FaFileAlt, FaGithub, FaCodeBranch
} from 'react-icons/fa';

const phases = [
	{
		key: 'requirement-gathering',
		title: 'Requirement Gathering & Analysis',
		subtitle: 'Foundation Phase',
		description: 'Collaborate with stakeholders, document requirements, and analyze project needs following the Waterfall methodology.',
		icon: <FaComments />,
		status: 'Completed',
		color: 'from-blue-600 to-cyan-600',
		bgColor: 'from-blue-900/20 to-cyan-900/20',
		borderColor: 'border-blue-500/50',
		glowColor: 'shadow-blue-500/25',
		progress: 100,
		features: ['Stakeholder Collaboration', 'Requirement Documentation', 'Analysis & Validation'],
		onClick: (navigate) => navigate('/admin/requirement-gathering'),
	},
	{
		key: 'planning',
		title: 'Planning & Design',
		subtitle: 'Strategy Phase',
		description: 'Wireframing, prototyping, and comprehensive project planning using collaborative design tools.',
		icon: <FaProjectDiagram />,
		status: 'In Progress',
		color: 'from-purple-600 to-pink-600',
		bgColor: 'from-purple-900/20 to-pink-900/20',
		borderColor: 'border-purple-500/50',
		glowColor: 'shadow-purple-500/25',
		progress: 65,
		features: ['Wireframing', 'Prototyping', 'Project Planning'],
		onClick: (navigate, projectId) => navigate('/admin/planning', { state: { projectId } }),
	},
	{
		key: 'construction',
		title: 'Construction & Development',
		subtitle: 'Build Phase',
		description: 'Development, coding, and implementation of features with comprehensive task tracking and code integration.',
		icon: <FaCogs />,
		status: 'Not Started',
		color: 'from-green-600 to-emerald-600',
		bgColor: 'from-green-900/20 to-emerald-900/20',
		borderColor: 'border-green-500/50',
		glowColor: 'shadow-green-500/25',
		progress: 0,
		features: ['Development', 'Task Tracking', 'Code Integration'],
		extraLinks: [
			{ label: 'GitHub', url: 'https://github.com/', icon: <FaGithub /> },
			{ label: 'VS Code', url: 'https://vscode.dev/', icon: <FaCodeBranch /> },
		],
		onClick: (navigate, projectId) => navigate('/admin/tasks', { state: { projectId } }),
	},
	{
		key: 'modeling',
		title: 'System Modeling',
		subtitle: 'Architecture Phase',
		description: 'System and data modeling, architecture diagrams, and comprehensive technical documentation.',
		icon: <FaChartLine />,
		status: 'Not Started',
		color: 'from-yellow-600 to-orange-600',
		bgColor: 'from-yellow-900/20 to-orange-900/20',
		borderColor: 'border-yellow-500/50',
		glowColor: 'shadow-yellow-500/25',
		progress: 0,
		features: ['System Modeling', 'Architecture Design', 'Technical Documentation'],
		onClick: (navigate, projectId) => navigate('/admin/modelling'),
	},
	{
		key: 'deployment',
		title: 'Deployment & Release',
		subtitle: 'Launch Phase',
		description: 'Release management, CI/CD pipeline implementation, and deployment to production environments.',
		icon: <FaRocket />,
		status: 'Not Started',
		color: 'from-pink-600 to-rose-600',
		bgColor: 'from-pink-900/20 to-rose-900/20',
		borderColor: 'border-pink-500/50',
		glowColor: 'shadow-pink-500/25',
		progress: 0,
		features: ['Release Management', 'CI/CD Pipeline', 'Production Deployment'],
		onClick: (navigate, projectId) => navigate('/admin/deployment', { state: { projectId } }),
	},
	{
		key: 'maintenance',
		title: 'Maintenance & Support',
		subtitle: 'Support Phase',
		description: 'Ongoing support, bug fixes, performance optimization, and continuous improvement post-launch.',
		icon: <FaTools />,
		status: 'Not Started',
		color: 'from-gray-600 to-slate-600',
		bgColor: 'from-gray-900/20 to-slate-900/20',
		borderColor: 'border-gray-500/50',
		glowColor: 'shadow-gray-500/25',
		progress: 0,
		features: ['Bug Fixes', 'Performance Optimization', 'Continuous Support'],
		onClick: (navigate, projectId) => navigate('/admin/maintenance', { state: { projectId } }),
	},
];

const statusConfig = {
	'Not Started': { color: 'text-gray-400', icon: <FaCircle />, bg: 'bg-gray-700/50' },
	'In Progress': { color: 'text-blue-400', icon: <FaClock />, bg: 'bg-blue-700/50' },
	'Completed': { color: 'text-green-400', icon: <FaCheckCircle />, bg: 'bg-green-700/50' },
};

export default function ProjectArchitecture() {
	const navigate = useNavigate();
	const location = useLocation();
	const { getProject } = useProject();
	const [hoveredPhase, setHoveredPhase] = useState(null);
	const [projectId, setProjectId] = useState(null);
	const [selectedPhase, setSelectedPhase] = useState(null);
	
	useEffect(() => {
		if (location.state && location.state.projectId) {
			setProjectId(location.state.projectId);
		}
	}, [location]);

	const handlePhaseClick = (phase) => {
		setSelectedPhase(phase);
		setTimeout(() => {
			phase.onClick(navigate, projectId);
		}, 300);
	};

	return (
		<>
			<Navbar />
			<div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
					<div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
					<div className="absolute bottom-40 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
				</div>

				{/* Grid Pattern Overlay */}
				<div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

				<div className="relative z-10 flex flex-col items-center py-10 px-4">
					<style>{`
						.bg-grid-pattern {
							background-image: 
								linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
								linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
							background-size: 40px 40px;
						}
						.phase-card {
							backdrop-filter: blur(10px);
							background: rgba(31, 41, 55, 0.8);
						}
						.progress-ring {
							transform: rotate(-90deg);
						}
						.progress-ring-circle {
							transition: stroke-dashoffset 0.35s;
							transform-origin: 50% 50%;
						}
					`}</style>

					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12"
					>
						<motion.h1 
							className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							Project Architecture
						</motion.h1>
						<motion.p 
							className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
						>
							Navigate through the comprehensive software development lifecycle. 
							Each phase represents a critical milestone in your project's journey.
						</motion.p>
						<motion.div 
							className="flex justify-center items-center gap-4 text-sm text-gray-400"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.8 }}
						>
							<div className="flex items-center gap-2">
								<FaCheckCircle className="text-green-400" />
								<span>Completed</span>
							</div>
							<div className="flex items-center gap-2">
								<FaClock className="text-blue-400" />
								<span>In Progress</span>
							</div>
							<div className="flex items-center gap-2">
								<FaCircle className="text-gray-400" />
								<span>Not Started</span>
							</div>
						</motion.div>
					</motion.div>

					{/* Mobile Layout */}
					<div className="block lg:hidden w-full max-w-2xl">
						<div className="space-y-6">
							{phases.map((phase, index) => (
								<motion.div
									key={phase.key}
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1, duration: 0.6 }}
									className="relative"
								>
									<motion.div
										className={`phase-card border ${phase.borderColor} rounded-2xl p-6 cursor-pointer group relative overflow-hidden ${phase.glowColor} hover:shadow-2xl transition-all duration-500`}
										whileHover={{ scale: 1.02, y: -5 }}
										onClick={() => handlePhaseClick(phase)}
										onMouseEnter={() => setHoveredPhase(phase.key)}
										onMouseLeave={() => setHoveredPhase(null)}
									>
										{/* Background Gradient */}
										<div className={`absolute inset-0 bg-gradient-to-r ${phase.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
										
										<div className="relative z-10">
											<div className="flex items-start justify-between mb-4">
												<div className="flex items-center gap-4">
													<motion.div
														className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${phase.color} flex items-center justify-center text-white text-2xl shadow-lg`}
														whileHover={{ rotate: 360 }}
														transition={{ duration: 0.6 }}
													>
														{phase.icon}
													</motion.div>
													<div>
														<h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
														<p className="text-sm text-gray-400">{phase.subtitle}</p>
													</div>
												</div>
												
												{/* Progress Ring */}
												<div className="relative w-16 h-16">
													<svg className="progress-ring w-16 h-16" viewBox="0 0 64 64">
														<circle
															cx="32"
															cy="32"
															r="28"
															stroke="rgba(75, 85, 99, 0.3)"
															strokeWidth="4"
															fill="transparent"
														/>
														<circle
															className="progress-ring-circle"
															cx="32"
															cy="32"
															r="28"
															stroke={`url(#${phase.key}-gradient)`}
															strokeWidth="4"
															fill="transparent"
															strokeDasharray={`${2 * Math.PI * 28}`}
															strokeDashoffset={`${2 * Math.PI * 28 * (1 - phase.progress / 100)}`}
														/>
														<defs>
															<linearGradient id={`${phase.key}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
																<stop offset="0%" stopColor={phase.color.split('-')[1] === 'blue' ? '#3B82F6' : 
																			   phase.color.split('-')[1] === 'purple' ? '#8B5CF6' :
																			   phase.color.split('-')[1] === 'green' ? '#10B981' :
																			   phase.color.split('-')[1] === 'yellow' ? '#F59E0B' :
																			   phase.color.split('-')[1] === 'pink' ? '#EC4899' : '#6B7280'} />
																<stop offset="100%" stopColor={phase.color.split('-')[3] === 'cyan' ? '#06B6D4' :
																			   phase.color.split('-')[3] === 'pink' ? '#EC4899' :
																			   phase.color.split('-')[3] === 'emerald' ? '#10B981' :
																			   phase.color.split('-')[3] === 'orange' ? '#F97316' :
																			   phase.color.split('-')[3] === 'rose' ? '#F43F5E' : '#64748B'} />
															</linearGradient>
														</defs>
													</svg>
													<div className="absolute inset-0 flex items-center justify-center">
														<span className="text-sm font-bold text-white">{phase.progress}%</span>
													</div>
												</div>
											</div>
											
											<p className="text-gray-300 mb-4 leading-relaxed">{phase.description}</p>
											
											<div className="flex items-center justify-between mb-4">
												<div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[phase.status].bg}`}>
													{statusConfig[phase.status].icon}
													<span className={`text-sm font-medium ${statusConfig[phase.status].color}`}>
														{phase.status}
													</span>
												</div>
												
												{phase.extraLinks && (
													<div className="flex gap-2">
														{phase.extraLinks.map((link, idx) => (
															<a
																key={idx}
																href={link.url}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm transition-colors"
																onClick={(e) => e.stopPropagation()}
															>
																{link.icon}
																{link.label}
															</a>
														))}
													</div>
												)}
											</div>
											
											<div className="flex flex-wrap gap-2">
												{phase.features.map((feature, idx) => (
													<span key={idx} className="px-2 py-1 bg-gray-700/30 text-gray-300 text-xs rounded-md">
														{feature}
													</span>
												))}
											</div>
										</div>
									</motion.div>
									
									{/* Clean spacing between phases */}
									{index < phases.length - 1 && (
										<motion.div 
											className="flex justify-center my-6"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: index * 0.1 + 0.3 }}
										>
											<div className="w-1 h-8 bg-gray-700/30 rounded-full" />
										</motion.div>
									)}
								</motion.div>
							))}
						</div>
					</div>

					{/* Desktop Layout */}
					<div className="hidden lg:block w-full max-w-7xl">
						<div className="grid grid-cols-3 gap-8 relative">
							{/* Top Row */}
							<div className="flex flex-col items-center">
								<PhaseCard phase={phases[0]} index={0} onHover={setHoveredPhase} onClick={handlePhaseClick} />
							</div>
							<div className="flex flex-col items-center">
								<PhaseCard phase={phases[1]} index={1} onHover={setHoveredPhase} onClick={handlePhaseClick} />
							</div>
							<div className="flex flex-col items-center">
								<PhaseCard phase={phases[2]} index={2} onHover={setHoveredPhase} onClick={handlePhaseClick} />
							</div>
							
							{/* Bottom Row */}
							<div className="flex flex-col items-center">
								<PhaseCard phase={phases[5]} index={5} onHover={setHoveredPhase} onClick={handlePhaseClick} />
							</div>
							<div className="flex flex-col items-center">
								<PhaseCard phase={phases[4]} index={4} onHover={setHoveredPhase} onClick={handlePhaseClick} />
							</div>
							<div className="flex flex-col items-center">
								<PhaseCard phase={phases[3]} index={3} onHover={setHoveredPhase} onClick={handlePhaseClick} />
							</div>

							{/* No connection lines - Clean layout */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

// Phase Card Component
const PhaseCard = ({ phase, index, onHover, onClick }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1, duration: 0.6 }}
			className="w-full max-w-sm"
		>
			<motion.div
				className={`phase-card border ${phase.borderColor} rounded-2xl p-6 cursor-pointer group relative overflow-hidden ${phase.glowColor} hover:shadow-2xl transition-all duration-500`}
				whileHover={{ scale: 1.05, y: -10 }}
				onClick={() => onClick(phase)}
				onMouseEnter={() => onHover(phase.key)}
				onMouseLeave={() => onHover(null)}
			>
				{/* Background Gradient */}
				<div className={`absolute inset-0 bg-gradient-to-r ${phase.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
				
				<div className="relative z-10">
					<div className="flex items-center justify-between mb-4">
						<motion.div
							className={`w-14 h-14 rounded-xl bg-gradient-to-r ${phase.color} flex items-center justify-center text-white text-xl shadow-lg`}
							whileHover={{ rotate: 360 }}
							transition={{ duration: 0.6 }}
						>
							{phase.icon}
						</motion.div>
						
						{/* Progress Ring */}
						<div className="relative w-12 h-12">
							<svg className="progress-ring w-12 h-12" viewBox="0 0 48 48">
								<circle
									cx="24"
									cy="24"
									r="20"
									stroke="rgba(75, 85, 99, 0.3)"
									strokeWidth="3"
									fill="transparent"
								/>
								<circle
									className="progress-ring-circle"
									cx="24"
									cy="24"
									r="20"
									stroke={`url(#${phase.key}-gradient)`}
									strokeWidth="3"
									fill="transparent"
									strokeDasharray={`${2 * Math.PI * 20}`}
									strokeDashoffset={`${2 * Math.PI * 20 * (1 - phase.progress / 100)}`}
								/>
								<defs>
									<linearGradient id={`${phase.key}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
										<stop offset="0%" stopColor={phase.color.split('-')[1] === 'blue' ? '#3B82F6' : 
													   phase.color.split('-')[1] === 'purple' ? '#8B5CF6' :
													   phase.color.split('-')[1] === 'green' ? '#10B981' :
													   phase.color.split('-')[1] === 'yellow' ? '#F59E0B' :
													   phase.color.split('-')[1] === 'pink' ? '#EC4899' : '#6B7280'} />
										<stop offset="100%" stopColor={phase.color.split('-')[3] === 'cyan' ? '#06B6D4' :
														 phase.color.split('-')[3] === 'pink' ? '#EC4899' :
														 phase.color.split('-')[3] === 'emerald' ? '#10B981' :
														 phase.color.split('-')[3] === 'orange' ? '#F97316' :
														 phase.color.split('-')[3] === 'rose' ? '#F43F5E' : '#64748B'} />
									</linearGradient>
								</defs>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-xs font-bold text-white">{phase.progress}%</span>
							</div>
						</div>
					</div>
					
					<h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
					<p className="text-xs text-gray-400 mb-3">{phase.subtitle}</p>
					<p className="text-gray-300 text-sm mb-4 leading-relaxed">{phase.description}</p>
					
					<div className="flex items-center justify-between mb-3">
						<div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig[phase.status].bg}`}>
							{statusConfig[phase.status].icon}
							<span className={`text-xs font-medium ${statusConfig[phase.status].color}`}>
								{phase.status}
							</span>
						</div>
						
						{phase.extraLinks && (
							<div className="flex gap-1">
								{phase.extraLinks.map((link, idx) => (
									<a
										key={idx}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded text-xs transition-colors"
										onClick={(e) => e.stopPropagation()}
									>
										{link.icon}
									</a>
								))}
							</div>
						)}
					</div>
					
					<div className="flex flex-wrap gap-1">
						{phase.features.slice(0, 2).map((feature, idx) => (
							<span key={idx} className="px-2 py-1 bg-gray-700/30 text-gray-300 text-xs rounded">
								{feature}
							</span>
						))}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};