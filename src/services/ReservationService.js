import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Your Node.js server URL

/**
 * Fetch reservations from the backend server.
 * @returns {Promise<Array>} A promise resolving to an array of reservations.
 */
export const fetchReservations = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/reservations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};
