import axios from 'axios';

const URL = 'http://localhost:40764/api/Ipl/'

export const fetchMatchDetails = (endpoint) => async (dispatch) => {
  dispatch({ type: 'FETCH_MATCH_STATISTICS_REQUEST' });
  try {
    const response = await axios.get(URL + endpoint);
    // console.log(response.data);
    dispatch({ type: 'FETCH_MATCH_STATISTICS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MATCH_STATISTICS_FAILURE', payload: error.message });
  }
};

export const fetchTopPlayers = (endpoint) => async (dispatch) => {
  dispatch({ type: 'FETCH_TOP_PLAYERS_REQUEST' });
  try {
    const response = await axios.get(URL + endpoint);
    dispatch({ type: 'FETCH_TOP_PLAYERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TOP_PLAYERS_FAILURE', payload: error.message });
  }
};

export const fetchMatchByRange = (endpoint, startDate, endDate) => async (dispatch) => {
  dispatch({ type: 'FETCH_MATCH_BY_RANGE_REQUEST' });
  try {
    const response = await axios.get(`http://localhost:40764/api/Ipl/${endpoint}`, {
      params: { startDate, endDate },
    });
    dispatch({ type: 'FETCH_MATCH_BY_RANGE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MATCH_BY_RANGE_FAILURE', payload: error.message });
  }
};

export const addPlayer = (endpoint, playerData) => async (dispatch) => {
  dispatch({ type: 'ADD_PLAYER_REQUEST' });
  try {
    await axios.post(`http://localhost:40764/api/Ipl/${endpoint}`, playerData);
    dispatch({ type: 'ADD_PLAYER_SUCCESS', payload: 'Player added successfully!' });
  } catch (error) {
    dispatch({ type: 'ADD_PLAYER_FAILURE', payload: 'Failed to add player. Please try again.' });
  }
};