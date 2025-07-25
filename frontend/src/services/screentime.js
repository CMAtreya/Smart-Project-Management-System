import axios from 'axios';

// Function to log screen time in seconds
export const logScreenTime = async (durationInSeconds, token) => {
  try {
    const res = await axios.post(
      '/screentime/log', // Make sure your proxy is set correctly in package.json
      { duration: durationInSeconds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error logging screen time:', error);
    return null;
  }
};

// Function to fetch today's screen time
export const getTodayScreenTime = async (token) => {
  try {
    const res = await axios.get('/screentime/today', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // e.g., { duration: 3600 }
  } catch (error) {
    console.error('Error fetching today\'s screen time:', error);
    return null;
  }
};
