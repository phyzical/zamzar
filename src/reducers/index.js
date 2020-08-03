import {
    combineReducers
} from 'redux';
import app from './App'
import history from './History'
import home from './Home'
import settings from './Settings'

export default combineReducers({
    app,
    history,
    home,
    settings
});
