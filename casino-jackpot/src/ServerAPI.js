import axios from 'axios';

const API_URL = 'https://us-central1-queues-949f5.cloudfunctions.net/MS-Server-Side'; // Replace with your actual Cloud Function URL

export const initializeUser = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/initialize`, {
      session_id: sessionId
    });
    return response.data; // This should return an object like { credits: 10 }
  } catch (error) {
    console.error('Error initializing user:', error);
    throw error;
  }
};

export const spinAndGetCredits = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/spin`, {
      session_id: sessionId
    });
    return response.data; // This should return an object like { slots: ['C', 'L', 'O', 'w'], credits: 9 }
  } catch (error) {
    console.error('Error making request to spin:', error);
    throw error;
  }
};

export const cashOutCredits = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/cashout`, {
      session_id: sessionId
    });
    return response.data; // This should return an object like { credits: 0 }
  } catch (error) {
    console.error('Error making request to cash out:', error);
    throw error;
  }
};
