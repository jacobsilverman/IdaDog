import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const apiUrl = 'https://idadog.herokuapp.com';

/**
 * Fetch reservations from the backend server.
 * @returns {Promise<Array>} A promise resolving to an array of reservations.
 */
export const fetchReservations = async () => {
    try {
        const response = await axios.get(`${apiUrl}/reservations`, {
            withCredentials: true,  // Include credentials (cookies) in the request
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};
