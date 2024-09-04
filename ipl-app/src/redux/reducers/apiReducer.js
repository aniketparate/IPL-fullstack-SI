const initialState = {
  // data: {},
  matchStatistics: [],
  topPlayers: [],
  matchDetails: [],
  loading: false,
  error: null,
  successMessage: '',
};
  
const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MATCH_STATISTICS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MATCH_STATISTICS_SUCCESS':
      return { ...state, loading: false, matchStatistics: action.payload };
    case 'FETCH_MATCH_STATISTICS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_TOP_PLAYERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_TOP_PLAYERS_SUCCESS':
      return { ...state, loading: false, topPlayers: action.payload };
    case 'FETCH_TOP_PLAYERS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_MATCH_BY_RANGE_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MATCH_BY_RANGE_SUCCESS':
      return { ...state, loading: false, matchDetails: action.payload };
    case 'FETCH_MATCH_BY_RANGE_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_PLAYER_REQUEST':
      return { ...state, loading: true, successMessage: '', error: null };
    case 'ADD_PLAYER_SUCCESS':
      return { ...state, loading: false, successMessage: action.payload };
    case 'ADD_PLAYER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default apiReducer;