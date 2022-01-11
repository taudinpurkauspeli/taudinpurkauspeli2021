import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import casesReducer from './App/case/reducers/casesReducer';
import userReducer from './App/users/reducers/userReducer';

const reducer = combineReducers({
  cases: casesReducer,
  admin: userReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
