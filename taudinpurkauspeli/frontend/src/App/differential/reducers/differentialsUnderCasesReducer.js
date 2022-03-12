import differentialsUnderCasesService from '../services/differentialsUnderCasesService';

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

export const updateDifferentialUnderCase = (content) => async (dispatch) => {
  await differentialsUnderCasesService.update(content.id, content);
  dispatch({
    type: 'UPDATE_DIFFERENTIALUNDERCASE',
    data: content,
  });
};

export default differentialsUnderCasesReducer;
