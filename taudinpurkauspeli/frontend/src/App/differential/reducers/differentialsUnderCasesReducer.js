import differentialsUnderCasesService from '../services/differentialsUnderCasesService';
import { setSuccess, setError } from '../../../utils/MessageBanner';

const differentialsUnderCasesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALSUNDERCASE':
      return action.data;
    case 'NEW_DIFFERENTIALUNDERCASE':
      return [...state, action.data];
    case 'UPDATE_DIFFERENTIALUNDERCASE':
      return state.map((p) => (p.id !== action.data.id
        ? p
        : action.data
      ));
    case 'REMOVE_DIFFERENTIAL_UNDER_CASE':
      return state.filter((p) => p.id !== action.data);
    default:
      return state;
  }
};

export const getDifferentialsUnderCase = (id) => async (dispatch) => {
  const returnedDifferentialsUnderCase = await differentialsUnderCasesService.getAll(id);
  dispatch({
    type: 'GET_DIFFERENTIALSUNDERCASE',
    data: returnedDifferentialsUnderCase || null,
  });
};

export const createDifferentialUnderCase = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    const newDifferentialUnderCase = await differentialsUnderCasesService.create(content);

    dispatch({
      type: 'NEW_DIFFERENTIALUNDERCASE',
      data: newDifferentialUnderCase,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateDifferentialUnderCase = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await differentialsUnderCasesService.update(content.id, content);

    dispatch({
      type: 'UPDATE_DIFFERENTIALUNDERCASE',
      data: content,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const removeDifferentialUnderCase = (
  diffGroupCaseId, differentialId, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await differentialsUnderCasesService.remove(diffGroupCaseId, differentialId);

    dispatch({
      type: 'REMOVE_DIFFERENTIAL_UNDER_CASE',
      data: differentialId,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default differentialsUnderCasesReducer;
