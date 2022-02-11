import differentialsService from '../services/differentials';
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

export const createDifferential = (content, diffGroupCaseId) => async (dispatch) => {
  const newDifferential = await differentialsService.create({ name: content.name });
  dispatch({
    type: 'NEW_DIFFERENTIAL',
    data: newDifferential,
  });

  dispatch(createDifferentialUnderCase({
    diffGroupCaseId,
    differentialId: newDifferential.id,
    description: content.description,
  }));
};

export default differentialsReducer;
