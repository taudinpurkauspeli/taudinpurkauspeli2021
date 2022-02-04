import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import casesReducer from './App/case/casesReducer';
import userReducer from './App/users/reducers/userReducer';
import proceduresReducer from './App/procedure/proceduresReducer';
import subProceduresReducer from './App/subprocedure/subProceduresReducer';

const reducer = combineReducers({
  cases: casesReducer,
  admin: userReducer,
  procedures: proceduresReducer,
  subProcedures: subProceduresReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
