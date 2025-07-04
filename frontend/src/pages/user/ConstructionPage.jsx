import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaCode, FaCodeBranch, FaTerminal, FaPlay, FaDownload, FaPlus, FaArrowLeft, FaSync, FaCheck, FaExclamationTriangle, FaExternalLinkAlt, FaKey, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import Navbar from '../../components/Navbar';
import githubService from '../../services/githubService';
import { toast } from 'react-toastify';

const ConstructionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { getProject } = useProject();
  
  // State variables
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('github');
  const [gitRepos, setGitRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [githubToken, setGithubToken] = useState(localStorage.getItem('githubToken') || '');
  const [isGithubAuthenticated, setIsGithubAuthenticated] = useState(githubService.isAuthenticated());
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  
  // Mock data for demonstration
  const mockRepos = [
    { id: 1, name: 'frontend-repo', description: 'Frontend code for the project', language: 'JavaScript', stars: 5, forks: 2, updated_at: '2023-06-15T10:30:00Z' },
    { id: 2, name: 'backend-repo', description: 'Backend API and services', language: 'Python', stars: 7, forks: 3, updated_at: '2023-06-10T14:20:00Z' },
    { id: 3, name: 'mobile-app', description: 'Mobile application code', language: 'React Native', stars: 4, forks: 1, updated_at: '2023-06-05T09:15:00Z' },
  ];
  
  const mockBranches = [
    { name: 'main', commit: { sha: 'abc123', url: '#' } },
    { name: 'develop', commit: { sha: 'def456', url: '#' } },
    { name: 'feature/user-auth', commit: { sha: 'ghi789', url: '#' } },
  ];
  
  const mockCommits = [
    { sha: 'abc123', commit: { message: 'Fix login bug', author: { name: 'John Doe', date: '2023-06-15T10:30:00Z' } } },
    { sha: 'def456', commit: { message: 'Add user profile page', author: { name: 'Jane Smith', date: '2023-06-14T15:45:00Z' } } },
    { sha: 'ghi789', commit: { message: 'Update README with setup instructions', author: { name: 'John Doe', date: '2023-06-13T09:20:00Z' } } },
    { sha: 'jkl012', commit: { message: 'Implement password reset functionality', author: { name: 'Jane Smith', date: '2023-06-12T14:10:00Z' } } },
    { sha: 'mno345', commit: { message: 'Optimize database queries', author: { name: 'John Doe', date: '2023-06-11T11:05:00Z' } } },
  ];
  
  const mockFiles = [
    { name: 'src', type: 'dir', path: 'src' },
    { name: 'package.json', type: 'file', path: 'package.json' },
    { name: 'README.md', type: 'file', path: 'README.md' },
    { name: '.gitignore', type: 'file', path: '.gitignore' },
  ];
  
  const mockSrcFiles = [
    { name: 'components', type: 'dir', path: 'src/components' },
    { name: 'pages', type: 'dir', path: 'src/pages' },
    { name: 'App.js', type: 'file', path: 'src/App.js' },
    { name: 'index.js', type: 'file', path: 'src/index.js' },
  ];
  
  const mockFileContents = {
    'package.json': `{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Project description",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0",
    "framer-motion": "^7.3.5",
    "tailwindcss": "^3.1.8"
  }
}`,
    'README.md': `# Project Name

This is a sample project README file.

## Setup

1. Clone the repository
2. Run \`npm install\`
3. Run \`npm start\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Contributing

Please read the CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.`,
    '.gitignore': `# dependencies
node_modules

# production
build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`,
    'src/App.js': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;`,
    'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  };
  
  // Load project data
  useEffect(() => {
    if (location.state && location.state.projectId) {
      setProjectId(location.state.projectId);
      
      const fetchProjectData = async () => {
        try {
          const projectData = await getProject(location.state.projectId);
          setProject(projectData);
          setLoading(false);
          
          // If GitHub is authenticated, fetch real repositories
          if (isGithubAuthenticated) {
            fetchGithubRepos();
          } else {
            // Load mock data for demonstration when not authenticated
            setGitRepos(mockRepos);
          }
        } catch (error) {
          console.error('Error fetching project data:', error);
          setLoading(false);
          toast.error('Failed to load project data');
        }
      };
      
      fetchProjectData();
    } else {
      setLoading(false);
    }
  }, [location, getProject, isGithubAuthenticated]);
  
  // Fetch GitHub repositories
  const fetchGithubRepos = async () => {
    try {
      setLoading(true);
      const repos = await githubService.getUserRepos();
      setGitRepos(repos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      setLoading(false);
      toast.error('Failed to fetch GitHub repositories');
      // If authentication failed, reset authentication state
      if (error.response?.status === 401) {
        handleGithubLogout();
      }
    }
  };
  
  // Handle GitHub authentication
  const handleGithubAuth = () => {
    if (tokenInput.trim()) {
      try {
        githubService.authenticate(tokenInput.trim());
        setGithubToken(tokenInput.trim());
        setIsGithubAuthenticated(true);
        setShowTokenInput(false);
        setTokenInput('');
        fetchGithubRepos();
        toast.success('Successfully authenticated with GitHub');
      } catch (error) {
        console.error('GitHub authentication error:', error);
        toast.error('Failed to authenticate with GitHub');
      }
    } else {
      toast.warning('Please enter a valid GitHub token');
    }
  };
  
  // Handle GitHub logout
  const handleGithubLogout = () => {
    githubService.logout();
    setGithubToken('');
    setIsGithubAuthenticated(false);
    setGitRepos(mockRepos);
    setSelectedRepo(null);
    setBranches([]);
    setCommits([]);
    setFiles([]);
    setSelectedFile(null);
    setFileContent('');
    toast.info('Logged out from GitHub');
  };
  
  // Handle repository selection
  const handleRepoSelect = async (repo) => {
    setSelectedRepo(repo);
    setSelectedFile(null);
    setFileContent('');
    setCurrentPath('');
    
    try {
      setLoading(true);
      
      // If authenticated with GitHub, fetch real data
      if (isGithubAuthenticated) {
        // Extract owner and repo name from full_name (format: owner/repo)
        const [owner, repoName] = repo.full_name ? repo.full_name.split('/') : [user?.username || 'user', repo.name];
        
        // Fetch branches
        const branchesData = await githubService.getRepoBranches(owner, repoName);
        setBranches(branchesData);
        
        // Fetch commits
        const commitsData = await githubService.getRepoCommits(owner, repoName);
        setCommits(commitsData);
        
        // Fetch root directory contents
        const contentsData = await githubService.getRepoContents(owner, repoName);
        setFiles(contentsData);
      } else {
        // Use mock data when not authenticated
        setBranches(mockBranches);
        setCommits(mockCommits);
        setFiles(mockFiles);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching repository data:', error);
      setLoading(false);
      toast.error('Failed to fetch repository data');
      
      // Fallback to mock data on error
      setBranches(mockBranches);
      setCommits(mockCommits);
      setFiles(mockFiles);
    }
  };
  
  // Handle file selection
  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    
    try {
      // If it's a directory, navigate into it
      if (file.type === 'dir' || file.type === 'tree') {
        setLoading(true);
        
        if (isGithubAuthenticated && selectedRepo) {
          // Extract owner and repo name
          const [owner, repoName] = selectedRepo.full_name ? selectedRepo.full_name.split('/') : [user?.username || 'user', selectedRepo.name];
          
          // Get path from file object
          const path = file.path || '';
          setCurrentPath(path);
          
          // Fetch directory contents
          const contentsData = await githubService.getRepoContents(owner, repoName, path);
          setFiles(contentsData);
        } else {
          // Mock data for directories
          if (file.path === 'src') {
            setFiles(mockSrcFiles);
          } else {
            // For simplicity, just show some files for any directory
            setFiles([
              { name: 'ExampleComponent.js', type: 'file', path: `${file.path}/ExampleComponent.js` },
              { name: 'utils.js', type: 'file', path: `${file.path}/utils.js` },
              { name: 'styles.css', type: 'file', path: `${file.path}/styles.css` },
            ]);
          }
        }
        
        setLoading(false);
      } 
      // If it's a file, fetch its content
      else if (file.type === 'file' || file.type === 'blob') {
        setLoading(true);
        
        if (isGithubAuthenticated && selectedRepo) {
          // Extract owner and repo name
          const [owner, repoName] = selectedRepo.full_name ? selectedRepo.full_name.split('/') : [user?.username || 'user', selectedRepo.name];
          
          // Get path from file object
          const path = file.path || '';
          
          // Fetch file content
          const content = await githubService.getFileContent(owner, repoName, path);
          setFileContent(content || 'File content not available or binary file');
        } else {
          // Use mock file contents
          setFileContent(mockFileContents[file.path] || 'File content not available');
        }
        
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching file data:', error);
      setLoading(false);
      toast.error('Failed to fetch file data');
      setFileContent('Error loading file content');
    }
  };
  
  // Navigate back to parent directory
  const navigateToParentDirectory = async () => {
    if (!currentPath) return;
    
    try {
      setLoading(true);
      
      // Get parent path
      const pathParts = currentPath.split('/');
      pathParts.pop();
      const parentPath = pathParts.join('/');
      setCurrentPath(parentPath);
      
      if (isGithubAuthenticated && selectedRepo) {
        // Extract owner and repo name
        const [owner, repoName] = selectedRepo.full_name ? selectedRepo.full_name.split('/') : [user?.username || 'user', selectedRepo.name];
        
        // Fetch parent directory contents
        const contentsData = await githubService.getRepoContents(owner, repoName, parentPath);
        setFiles(contentsData);
      } else {
        // Mock data for parent directory
        setFiles(mockFiles);
      }
      
      setSelectedFile(null);
      setFileContent('');
      setLoading(false);
    } catch (error) {
      console.error('Error navigating to parent directory:', error);
      setLoading(false);
      toast.error('Failed to navigate to parent directory');
    }
  };
  
  // Handle terminal commands
  const handleTerminalCommand = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    
    setTerminalOutput([...terminalOutput, { type: 'input', text: terminalInput }]);
    
    // Mock terminal responses
    let response = { type: 'output', text: 'Command not recognized' };
    
    if (terminalInput.startsWith('git ')) {
      if (terminalInput === 'git status') {
        response = { type: 'output', text: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nNothing to commit, working tree clean' };
      } else if (terminalInput === 'git branch') {
        response = { type: 'output', text: '* main\n  develop\n  feature/user-auth' };
      } else if (terminalInput.startsWith('git checkout')) {
        const branch = terminalInput.split(' ')[2];
        response = { type: 'output', text: `Switched to branch '${branch}'` };
      }
    } else if (terminalInput === 'npm start') {
      response = { type: 'output', text: 'Starting the development server...\n\nCompiled successfully!\n\nYou can now view the project in the browser.\n\nLocal:            http://localhost:3000\nOn Your Network:  http://192.168.1.5:3000' };
    } else if (terminalInput === 'npm install') {
      response = { type: 'output', text: 'Installing dependencies...\n\nadded 1597 packages, and audited 1598 packages in 25s\n\n226 packages are looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities' };
    } else if (terminalInput === 'npm test') {
      response = { type: 'output', text: 'PASS  src/__tests__/App.test.js\nPASS  src/__tests__/components/Button.test.js\nPASS  src/__tests__/utils/helpers.test.js\n\nTest Suites: 3 passed, 3 total\nTests:       12 passed, 12 total\nSnapshots:   0 total\nTime:        3.145 s' };
    } else if (terminalInput === 'ls' || terminalInput === 'dir') {
      response = { type: 'output', text: 'src  package.json  README.md  .gitignore  node_modules' };
    } else if (terminalInput === 'clear' || terminalInput === 'cls') {
      setTerminalOutput([]);
      setTerminalInput('');
      return;
    }
    
    setTerminalOutput([...terminalOutput, { type: 'input', text: terminalInput }, response]);
    setTerminalInput('');
  };
  
  // Go back to project architecture
  const handleGoBack = () => {
    navigate('/user/project-architecture', { state: { projectId } });
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-white">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white pb-10">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-400">Construction Phase</h1>
          <button
            onClick={() => navigate('/user/projectarch')}
            className="text-blue-400 hover:underline text-lg flex items-center gap-1"
            title="Back to Project Architecture"
          >
            <FaArrowLeft className="inline-block mr-1" /> Back
          </button>
        </motion.div>
        <div className="pt-16 min-h-screen bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-8">
            {/* Header with back button */}
            <div className="flex items-center mb-6">
              <button 
                onClick={handleGoBack}
                className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Go back"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-3xl font-bold">Construction Phase</h1>
            </div>
            
            {/* Project info */}
            {project && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-300 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                    {project.status}
                  </span>
                  <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            )}
            
            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'github' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('github')}
              >
                <FaGithub className="inline mr-2" /> GitHub Integration
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'vscode' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('vscode')}
              >
                <FaCode className="inline mr-2" /> VS Code Editor
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'terminal' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('terminal')}
              >
                <FaTerminal className="inline mr-2" /> Terminal
              </button>
            </div>
            
            {/* GitHub Tab Content */}
            {activeTab === 'github' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Repositories List */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Repositories</h3>
                    <div className="flex">
                      {isGithubAuthenticated ? (
                        <button 
                          onClick={handleGithubLogout}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors mr-2"
                          title="Logout from GitHub"
                        >
                          <FaSignOutAlt size={14} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setShowTokenInput(!showTokenInput)}
                          className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors mr-2"
                          title="Login to GitHub"
                        >
                          <FaSignInAlt size={14} />
                        </button>
                      )}
                      <a 
                        href="https://github.com/new" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                        title="Create new repository"
                      >
                        <FaPlus size={14} />
                      </a>
                    </div>
                  </div>
                  
                  {/* GitHub Token Input */}
                  {showTokenInput && (
                    <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-300 mb-2">
                        Enter your GitHub personal access token to access your repositories.
                        <a 
                          href="https://github.com/settings/tokens" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline ml-1"
                        >
                          Get a token <FaExternalLinkAlt size={10} className="inline" />
                        </a>
                      </p>
                      <div className="flex">
                        <input
                          type="password"
                          value={tokenInput}
                          onChange={(e) => setTokenInput(e.target.value)}
                          placeholder="GitHub token"
                          className="flex-grow bg-gray-800 text-white border border-gray-600 rounded-l p-2 text-sm"
                        />
                        <button
                          onClick={handleGithubAuth}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-r"
                        >
                          <FaKey className="inline" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {gitRepos.length > 0 ? gitRepos.map(repo => (
                      <motion.div 
                        key={repo.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedRepo && selectedRepo.id === repo.id ? 'bg-blue-900/30 border border-blue-500/50' : 'bg-gray-700 hover:bg-gray-600'}`}
                        onClick={() => handleRepoSelect(repo)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-blue-300">{repo.name}</h4>
                          <span className="text-xs px-2 py-1 bg-gray-600 rounded-full">{repo.language || 'Unknown'}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1 mb-2">{repo.description || 'No description available'}</p>
                        <div className="flex text-xs text-gray-400">
                          <span className="mr-3">⭐ {repo.stargazers_count || repo.stars || 0}</span>
                          <span className="mr-3">🍴 {repo.forks_count || repo.forks || 0}</span>
                          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="text-center p-4 text-gray-400">
                        {isGithubAuthenticated ? 'No repositories found' : 'Connect to GitHub to see your repositories'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Middle Column - Branches and Commits */}
                <div className="space-y-6">
                  {selectedRepo ? (
                    <>
                      {/* Branches */}
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">Branches</h3>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                          {branches.map(branch => (
                            <div key={branch.name} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                              <div className="flex items-center">
                                <FaCodeBranch className="mr-2 text-gray-400" />
                                <span>{branch.name}</span>
                              </div>
                              <span className="text-xs text-gray-400">{branch.commit.sha.substring(0, 7)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Commits */}
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">Recent Commits</h3>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                          {commits.map(commit => (
                            <div key={commit.sha} className="p-3 bg-gray-700 rounded-lg">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{commit.commit.message}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-600 rounded-full">{commit.sha.substring(0, 7)}</span>
                              </div>
                              <div className="flex text-xs text-gray-400 mt-2">
                                <span>{commit.commit.author.name}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center justify-center h-full">
                      <FaGithub size={48} className="text-gray-600 mb-4" />
                      <p className="text-gray-400 text-center">Select a repository to view branches and commits</p>
                    </div>
                  )}
                </div>
                
                {/* Files and Content */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {selectedRepo ? (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Files</h3>
                        <div>
                          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors mr-2">
                            <FaSync size={14} />
                          </button>
                          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                            <FaDownload size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* File Browser */}
                      <div className="mb-4 max-h-[200px] overflow-y-auto">
                        {/* Navigation breadcrumb */}
                        {currentPath && (
                          <div className="flex items-center p-2 mb-2 bg-gray-700 rounded">
                            <button 
                              onClick={navigateToParentDirectory}
                              className="mr-2 text-blue-400 hover:text-blue-300"
                              title="Go to parent directory"
                            >
                              <FaArrowLeft size={14} />
                            </button>
                            <span className="text-sm font-mono truncate">{currentPath}</span>
                          </div>
                        )}
                        
                        {files.length > 0 ? files.map(file => (
                          <div 
                            key={file.path || file.name}
                            className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                            onClick={() => handleFileSelect(file)}
                          >
                            {file.type === 'dir' || file.type === 'tree' ? (
                              <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                            )}
                            <span>{file.name}</span>
                          </div>
                        )) : (
                          <div className="text-center p-4 text-gray-400">
                            {selectedRepo ? 'No files found in this directory' : 'Select a repository to view files'}
                          </div>
                        )}
                      </div>
                      
                      {/* File Content */}
                      {selectedFile && selectedFile.type === 'file' && (
                        <div>
                          <div className="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded">
                            <span className="font-mono text-sm">{selectedFile.path}</span>
                            <button className="text-gray-400 hover:text-white">
                              <FaExternalLinkAlt size={12} />
                            </button>
                          </div>
                          <pre className="bg-gray-900 p-4 rounded font-mono text-sm overflow-x-auto max-h-[300px] overflow-y-auto">
                            {fileContent}
                          </pre>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <FaCode size={48} className="text-gray-600 mb-4" />
                      <p className="text-gray-400 text-center">Select a repository to browse files</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* VS Code Tab Content */}
            {activeTab === 'vscode' && (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-900 p-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaCode className="mr-2 text-blue-400" />
                    <span className="font-medium">VS Code Online Editor</span>
                  </div>
                  <div>
                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors mr-2">
                      <FaPlay size={14} /> Run
                    </button>
                    <a 
                      href="https://vscode.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors inline-flex items-center"
                    >
                      <FaExternalLinkAlt size={12} className="mr-1" /> Open in VS Code
                    </a>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 h-[600px]">
                  {/* File Explorer */}
                  <div className="col-span-1 bg-gray-900 border-r border-gray-700 p-2 overflow-y-auto">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-gray-400 uppercase">Explorer</h4>
                      <div className="pl-2">
                        <div 
                            className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer"
                            onClick={() => {
                              // Set mock file structure for VS Code explorer
                              setSelectedFile({
                                name: 'src',
                                type: 'dir',
                                path: 'src'
                              });
                            }}
                          >
                            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            <span className="text-sm">src</span>
                          </div>
                        <div className="pl-4">
                          <div 
                            className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer"
                            onClick={() => {
                              // Set mock file structure for VS Code explorer
                              setSelectedFile({
                                name: 'components',
                                type: 'dir',
                                path: 'src/components'
                              });
                            }}
                          >
                            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            <span className="text-sm">components</span>
                          </div>
                          <div 
                            className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer"
                            onClick={() => {
                              // Set mock file structure for VS Code explorer
                              setSelectedFile({
                                name: 'pages',
                                type: 'dir',
                                path: 'src/pages'
                              });
                            }}
                          >
                            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            <span className="text-sm">pages</span>
                          </div>
                          <div 
                            className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer bg-gray-800"
                            onClick={() => {
                              // Set mock file content for VS Code editor
                              setSelectedFile({
                                name: 'App.js',
                                type: 'file',
                                path: 'src/App.js'
                              });
                              setFileContent(mockFileContents['src/App.js']);
                            }}
                          >
                            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span className="text-sm">App.js</span>
                          </div>
                          <div 
                            className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer"
                            onClick={() => {
                              // Set mock file content for VS Code editor
                              setSelectedFile({
                                name: 'index.js',
                                type: 'file',
                                path: 'src/index.js'
                              });
                              setFileContent(mockFileContents['src/index.js']);
                            }}
                          >
                            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span className="text-sm">index.js</span>
                          </div>
                        </div>
                      </div>
                      <div 
                        className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer"
                        onClick={() => {
                          // Set mock file content for VS Code editor
                          setSelectedFile({
                            name: 'package.json',
                            type: 'file',
                            path: 'package.json'
                          });
                          setFileContent(mockFileContents['package.json']);
                        }}
                      >
                        <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm">package.json</span>
                      </div>
                      <div 
                        className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer"
                        onClick={() => {
                          // Set mock file content for VS Code editor
                          setSelectedFile({
                            name: 'README.md',
                            type: 'file',
                            path: 'README.md'
                          });
                          setFileContent(mockFileContents['README.md']);
                        }}
                      >
                        <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm">README.md</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-gray-400 uppercase">Outline</h4>
                      <div className="pl-2">
                        <div className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer">
                          <span className="text-sm text-yellow-400">import</span>
                        </div>
                        <div className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer">
                          <span className="text-sm text-blue-400">App()</span>
                        </div>
                        <div className="flex items-center p-1 hover:bg-gray-800 rounded cursor-pointer">
                          <span className="text-sm text-green-400">export</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Code Editor */}
                  <div className="col-span-3 bg-gray-950 p-0 font-mono text-sm overflow-auto">
                    <pre className="p-4 text-gray-300 leading-relaxed">
                      <code>
                        <span className="text-pink-400">import</span> <span className="text-blue-300">React</span> <span className="text-pink-400">from</span> <span className="text-green-300">'react'</span>;<br/>
                        <span className="text-pink-400">import</span> {'{'} <span className="text-blue-300">BrowserRouter as Router, Routes, Route</span> {'}'} <span className="text-pink-400">from</span> <span className="text-green-300">'react-router-dom'</span>;<br/>
                        <span className="text-pink-400">import</span> <span className="text-blue-300">HomePage</span> <span className="text-pink-400">from</span> <span className="text-green-300">'./pages/HomePage'</span>;<br/>
                        <span className="text-pink-400">import</span> <span className="text-blue-300">AboutPage</span> <span className="text-pink-400">from</span> <span className="text-green-300">'./pages/AboutPage'</span>;<br/>
                        <span className="text-pink-400">import</span> <span className="text-blue-300">ContactPage</span> <span className="text-pink-400">from</span> <span className="text-green-300">'./pages/ContactPage'</span>;<br/>
                        <br/>
                        <span className="text-pink-400">function</span> <span className="text-yellow-300">App</span>() {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-pink-400">return</span> (<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">Router</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">Routes</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">Route</span> <span className="text-purple-300">path</span>=<span className="text-green-300">"/"</span> <span className="text-purple-300">element</span>={'{'}&lt;<span className="text-blue-300">HomePage</span> /&gt;{'}'} /&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">Route</span> <span className="text-purple-300">path</span>=<span className="text-green-300">"/about"</span> <span className="text-purple-300">element</span>={'{'}&lt;<span className="text-blue-300">AboutPage</span> /&gt;{'}'} /&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">Route</span> <span className="text-purple-300">path</span>=<span className="text-green-300">"/contact"</span> <span className="text-purple-300">element</span>={'{'}&lt;<span className="text-blue-300">ContactPage</span> /&gt;{'}'} /&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">Routes</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">Router</span>&gt;<br/>
                        &nbsp;&nbsp;);<br/>
                        {'}'}<br/>
                        <br/>
                        <span className="text-pink-400">export</span> <span className="text-pink-400">default</span> <span className="text-blue-300">App</span>;<br/>
                      </code>
                    </pre>
                  </div>
                </div>
                
                {/* Status Bar */}
                <div className="bg-blue-600 text-white text-xs p-1 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="px-2 border-r border-blue-500">
                      {selectedFile?.name?.endsWith('.js') ? 'JavaScript' : 
                       selectedFile?.name?.endsWith('.jsx') ? 'JSX' : 
                       selectedFile?.name?.endsWith('.css') ? 'CSS' : 
                       selectedFile?.name?.endsWith('.html') ? 'HTML' : 
                       selectedFile?.name?.endsWith('.md') ? 'Markdown' : 
                       selectedFile?.name?.endsWith('.json') ? 'JSON' : 'Plain Text'}
                    </span>
                    <span className="px-2 border-r border-blue-500">UTF-8</span>
                    <span className="px-2">LF</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 border-r border-blue-500">Ln 12, Col 24</span>
                    <span className="px-2 border-r border-blue-500"><FaCheck className="inline mr-1" /> No Problems</span>
                    <span className="px-2"><FaSync className="inline mr-1" /> Ready</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Terminal Tab Content */}
            {activeTab === 'terminal' && (
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 p-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaTerminal className="mr-2 text-gray-400" />
                    <span className="font-medium">Terminal</span>
                  </div>
                  <div>
                    <button 
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                      onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                    >
                      {isTerminalOpen ? '-' : '+'}
                    </button>
                  </div>
                </div>
                
                <div className={`bg-black font-mono text-sm p-4 ${isTerminalOpen ? 'h-[500px]' : 'h-[300px]'} overflow-y-auto`}>
                  <div className="mb-4">
                    <p className="text-gray-400">Welcome to the project terminal. Try commands like:</p>
                    <ul className="text-gray-500 ml-4 list-disc">
                      <li>git status</li>
                      <li>git branch</li>
                      <li>npm start</li>
                      <li>npm test</li>
                      <li>ls / dir</li>
                    </ul>
                  </div>
                  
                  {terminalOutput.map((output, index) => (
                    <div key={index} className={output.type === 'input' ? 'text-green-400' : 'text-white'}>
                      {output.type === 'input' ? '$ ' + output.text : output.text}
                    </div>
                  ))}
                  
                  <form onSubmit={handleTerminalCommand} className="flex items-center mt-2">
                    <span className="text-green-400 mr-2">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-grow bg-transparent border-none outline-none text-white"
                      placeholder="Enter command..."
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button 
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Architecture
              </button>
              <a 
                href={selectedRepo ? `https://github.com/${selectedRepo.full_name || selectedRepo.name}` : "https://github.com/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
              >
                <FaGithub className="mr-2" /> {selectedRepo ? 'View on GitHub' : 'Open GitHub'}
              </a>
              <a 
                href={selectedRepo ? `https://vscode.dev/github/${selectedRepo.full_name || selectedRepo.name}` : "https://vscode.dev/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
              >
                <FaCode className="mr-2" /> Open in VS Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionPage;