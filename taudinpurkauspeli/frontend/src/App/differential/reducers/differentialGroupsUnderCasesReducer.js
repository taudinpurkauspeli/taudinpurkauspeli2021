import differentialGroupsUnderCasesService from '../services/differentialGroupsUnderCases';

const differentialGroupsUnderCasesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALGROUPSUNDERCASE':
      return action.data;
    case 'NEW_DIFFERENTIALGROUPUNDERCASE':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getDifferentialGroupsUnderCase = (id) => async (dispatch) => {
  const returnedDifferentialGroupsUnderCase = await differentialGroupsUnderCasesService.getAll(id);
  dispatch({
    type: 'GET_DIFFERENTIALGROUPSUNDERCASE',
    data: returnedDifferentialGroupsUnderCase,
  });
};

export const createDifferentialGroupUnderCase = (content) => async (dispatch) => {
  const newDifferentialGroupUnderCase = await differentialGroupsUnderCasesService.create(content);
  dispatch({
    type: 'NEW_DIFFERENTIALGROUPUNDERCASE',
    data: newDifferentialGroupUnderCase,
  });
};

export default differentialGroupsUnderCasesReducer;
