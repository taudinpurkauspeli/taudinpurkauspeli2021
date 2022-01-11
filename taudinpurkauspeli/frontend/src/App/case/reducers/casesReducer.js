import casesService from '../services/cases';
import { setToken } from '../../../utils/Helper';

const casesReducer = (store = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_CASES':
      return action.data;
    default:
      return store;
  }
};

export const initializeCasesAndUser = () => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { cases, user } = await casesService.getAll();
  dispatch({
    type: 'INITIALIZE_CASES',
    data: cases,
  });

  setToken(user.token);
  dispatch({
    type: 'INITIALIZE_USER',
    data: user.admin,
  });
};

export default casesReducer;
