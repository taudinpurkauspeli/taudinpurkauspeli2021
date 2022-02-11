import differentialsUnderCasesService from '../services/differentialsUnderCases';

const differentialsUnderCasesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALSUNDERCASE':
      return action.data;
    case 'NEW_DIFFERENTIALUNDERCASE':
      return [...state, action.data];
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

export const createDifferentialUnderCase = (content) => async (dispatch) => {
  const newDifferentialUnderCase = await differentialsUnderCasesService.create(content);
  dispatch({
    type: 'NEW_DIFFERENTIALUNDERCASE',
    data: newDifferentialUnderCase,
  });
};

export default differentialsUnderCasesReducer;
