import differentialsService from '../services/differentialsService';
import { createDifferentialUnderCase } from './differentialsUnderCasesReducer';

const differentialsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALS':
      return action.data;
    case 'NEW_DIFFERENTIAL':
      return [...state, action.data];
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

export default differentialsReducer;
