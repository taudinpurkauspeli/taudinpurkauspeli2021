import casesService from './casesService';
import { setToken } from '../../utils/Helper';
import { setError, setSuccess } from '../../utils/MessageBanner';

const casesReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_CASES':
      return action.data;
    case 'NEW_CASE':
      return [...state, action.data];
    case 'REMOVE_CASE':
      return state.filter((c) => c.id !== action.data);
    case 'UPDATE_CASE':
      return state.map((c) => (c.id !== action.data.id
        ? c
        : action.data));
    default:
      return state;
  }
};

export const initializeCasesAndUser = () => async (dispatch) => {
  const { data, user } = await casesService.getAll();
  dispatch({
    type: 'INITIALIZE_CASES',
    data,
  });

  setToken(user.token);
  dispatch({
    type: 'INITIALIZE_USER',
    data: user.admin,
  });
};

export const createCase = (content, successMessage, errorMessage) => async (dispatch) => {
  try {
    const newCase = await casesService.create(content);

    dispatch({
      type: 'NEW_CASE',
      data: newCase,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const removeCase = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await casesService.remove(id);

    dispatch({
      type: 'REMOVE_CASE',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateCase = (content, successMessage, errorMessage) => async (dispatch) => {
  try {
    await casesService.update(content);

    dispatch({
      type: 'UPDATE_CASE',
      data: content,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default casesReducer;
