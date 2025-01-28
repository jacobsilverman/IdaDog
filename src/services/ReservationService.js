import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';
const API_URL = 'https://idadog-60ed3202fa90.herokuapp.com';

/**
 * Fetch reservations from the backend server.
 * @returns {Promise<Array>} A promise resolving to an array of reservations.
 */
export const fetchReservations = async () => {
    try {
        const response = await axios.get(`${API_URL}/reservations`, {
            withCredentials: true,  // Include credentials (cookies) in the request
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};


/**
 * delete reservation from the backend server.
 * @returns {Promise<Array>} A promise resolving to confirm db deletion.
 */
export const deleteReservation = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/delete-reservation`, {
            id,
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};

