import {combineReducers} from 'redux';
import sortRewardsReducer from './Rewards/sortRewardsReducer';
import collectorReducer from './Collector'

export default combineReducers({
    sortRewardsReducer,
    collectorReducer
})