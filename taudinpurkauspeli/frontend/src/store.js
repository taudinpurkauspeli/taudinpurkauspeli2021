import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import casesReducer from './App/case/casesReducer';
import userReducer from './App/users/reducers/userReducer';
import proceduresReducer from './App/procedure/proceduresReducer';
import proceduresUnderCasesReducer from './App/procedure/proceduresUnderCasesReducer';
import subProceduresReducer from './App/subprocedure/reducers/subProceduresReducer';
import differentialsReducer from './App/differential/reducers/differentialsReducer';
import differentialsUnderCasesReducer from './App/differential/reducers/differentialsUnderCasesReducer';
import differentialGroupsReducer from './App/differential/reducers/differentialGroupsReducer';
import differentialGroupsUnderCasesReducer from './App/differential/reducers/differentialGroupsUnderCasesReducer';
import optionGroupsReducer from './App/subprocedure/reducers/optionGroupsReducer';
import optionGroupsUnderSubProceduresReducer from './App/subprocedure/reducers/optionGroupsUnderSubProceduresReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  cases: casesReducer,
  admin: userReducer,
  procedures: proceduresReducer,
  proceduresUnderCase: proceduresUnderCasesReducer,
  subProcedures: subProceduresReducer,
  optionGroups: optionGroupsReducer,
  optionGroupsUnderSubProcedure: optionGroupsUnderSubProceduresReducer,
  differentials: differentialsReducer,
  differentialsUnderCase: differentialsUnderCasesReducer,
  differentialGroups: differentialGroupsReducer,
  differentialGroupsUnderCase: differentialGroupsUnderCasesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
