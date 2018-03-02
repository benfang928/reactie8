import { combineReducers } from 'redux';
import { reducer } from '../reducer/reducerNum';

export default combineReducers({ num: reducer });
