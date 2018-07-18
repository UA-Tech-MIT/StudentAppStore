import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import { routerReducer } from 'react-router-redux';
// import appReducer from './appReducer';
import appStoreReducer from './appStoreReducer'

const rootReducer = combineReducers({
  fuelSavings,
  routing: routerReducer,
  // apps: appReducer,
  appRepository: appStoreReducer
});

export default rootReducer;
