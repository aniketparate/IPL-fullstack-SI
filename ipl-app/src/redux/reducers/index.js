import { combineReducers } from 'redux'
import apiReducer from './apiReducer'

const rootReducer  = combineReducers({
    apiData: apiReducer,
});

export default rootReducer;