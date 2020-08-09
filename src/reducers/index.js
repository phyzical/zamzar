import {
  combineReducers,
} from 'redux';
import app from './App';
import history from './History';
import home from './Home';
import settings from './Settings';
import api from './Api';

export default combineReducers({
  app,
  api,
  history,
  home,
  settings,
});
