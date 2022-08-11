import differentialsService from '../services/differentialsService';
import { createDifferentialUnderCase } from './differentialsUnderCasesReducer';
import { setError, setSuccess } from '../../../utils/MessageBanner';

const differentialsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALS':
      return action.data;
    case 'NEW_DIFFERENTIAL':
      return [...state, action.data];
    case 'REMOVE_DIFFERENTIAL':
      return state.filter((d) => d.id !== action.data.id);
    case 'UPDATE_DIFFERENTIAL':
      return state.map((d) => (d.id !== action.data.id
        ? d
        : action.data
      ));
    default:
      return state;
  }
};

export const getDifferentials = () => async (dispatch) => {
  const returnedDifferentials = await differentialsService.getAll();
  dispatch({
    type: 'GET_DIFFERENTIALS',
    data: returnedDifferentials || null,
  });
};

export const createDifferential = (
  diffGroupCaseId, differential, successMessage, errorMessage,
) => async (dispatch) => {
  let { id } = differential;

  if (id === undefined) {
    const newDifferential = await differentialsService.create({ name: differential.name });

    dispatch({
      type: 'NEW_DIFFERENTIAL',
      data: newDifferential,
    });

    id = newDifferential.id;
  }

  dispatch(createDifferentialUnderCase({
    diffGroupCaseId,
    differentialId: id,
    procedureId: differential.procedureId,
    description: differential.description,
  }, successMessage, errorMessage));
};

export const removeDifferential = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await differentialsService.remove(id);

    dispatch({
      type: 'REMOVE_DIFFERENTIAL',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateDifferential = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await differentialsService.update(content.id, content);

    dispatch({
      type: 'UPDATE_DIFFERENTIAL',
      data: content,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default differentialsReducer;
