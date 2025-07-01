import axios from 'axios';

// GitHub API base URL
const GITHUB_API_URL = 'https://api.github.com';

// Create axios instance with GitHub API base URL
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token in headers if available
githubApi.interceptors.request.use(
  (config) => {
    const githubToken = localStorage.getItem('githubToken');
    if (githubToken) {
      config.headers['Authorization'] = `token ${githubToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// GitHub service functions
const githubService = {
  // Authenticate with GitHub (store token)
  authenticate: (token) => {
    localStorage.setItem('githubToken', token);
    return true;
  },
  
  // Remove GitHub authentication
  logout: () => {
    localStorage.removeItem('githubToken');
    return true;
  },
  
  // Check if user is authenticated with GitHub
  isAuthenticated: () => {
    return !!localStorage.getItem('githubToken');
  },
  
  // Get authenticated user info
  getUserInfo: async () => {
    try {
      const response = await githubApi.get('/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user info' };
    }
  },
  
  // Get user repositories
  getUserRepos: async () => {
    try {
      const response = await githubApi.get('/user/repos', {
        params: {
          sort: 'updated',
          per_page: 100
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch repositories' };
    }
  },
  
  // Get repository branches
  getRepoBranches: async (owner, repo) => {
    try {
      const response = await githubApi.get(`/repos/${owner}/${repo}/branches`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch branches' };
    }
  },
  
  // Get repository commits
  getRepoCommits: async (owner, repo, branch = '') => {
    try {
      const params = branch ? { sha: branch } : {};
      const response = await githubApi.get(`/repos/${owner}/${repo}/commits`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch commits' };
    }
  },
  
  // Get repository contents
  getRepoContents: async (owner, repo, path = '', ref = '') => {
    try {
      const params = ref ? { ref } : {};
      const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch repository contents' };
    }
  },
  
  // Get file content
  getFileContent: async (owner, repo, path, ref = '') => {
    try {
      const params = ref ? { ref } : {};
      const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
      // GitHub API returns content as base64 encoded
      if (response.data.content && response.data.encoding === 'base64') {
        const content = atob(response.data.content);
        return content;
      }
      return null;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch file content' };
    }
  },
  
  // Create OAuth authorization URL
  getAuthUrl: (clientId, redirectUri, scope = 'repo') => {
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  }
};

export default githubService;