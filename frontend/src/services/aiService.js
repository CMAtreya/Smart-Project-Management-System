import axios from 'axios';

/**
 * Sends the user's input to the backend AI API and retrieves AI-generated suggestions.
 * @param {string} input - The user-provided text input.
 * @param {string} token - JWT token for authentication (optional if required).
 * @returns {Promise<string[]>} - A list of suggestion strings.
 */
export const getAISuggestions = async (input, token) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/ai/extract',
      { input },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }) // attach token if available
        }
      }
    );

    return response.data.suggestions || [];
  } catch (error) {
    console.error('[Frontend AI Error]', error.response?.data || error.message);
    return [];
  }
};
