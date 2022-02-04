import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import casesReducer from './App/case/casesReducer';
import userReducer from './App/users/reducers/userReducer';
import proceduresReducer from './App/procedure/proceduresReducer';
import differentialsReducer from './App/differential/reducers/differentialsReducer';
import differentialsUnderCasesReducer from './App/differential/reducers/differentialsUnderCasesReducer';
import differentialGroupsReducer from './App/differential/reducers/differentialGroupsReducer';
import differentialGroupsUnderCasesReducer from './App/differential/reducers/differentialGroupsUnderCasesReducer';

const reducer = combineReducers({
  cases: casesReducer,
  admin: userReducer,
  procedures: proceduresReducer,
  differentials: differentialsReducer,
  differentialsUnderCase: differentialsUnderCasesReducer,
  differentialGroups: differentialGroupsReducer,
  differentialGroupsUnderCase: differentialGroupsUnderCasesReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
