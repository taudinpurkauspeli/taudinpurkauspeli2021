import differentialGroupsUnderCasesService from '../services/differentialGroupsUnderCases';

const differentialGroupsUnderCasesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALGROUPS_UNDER_CASE':
      return action.data;
    case 'NEW_DIFFERENTIALGROUP_UNDER_CASE':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getDifferentialGroupsUnderCase = (id) => async (dispatch) => {
  const returnedDifferentialGroupsUnderCase = await differentialGroupsUnderCasesService.getAll(id);
  dispatch({
    type: 'GET_DIFFERENTIALGROUPS_UNDER_CASE',
    data: returnedDifferentialGroupsUnderCase || null,
  });
};

export const createDifferentialGroupUnderCase = (content) => async (dispatch) => {
  const newDifferentialGroupUnderCase = await differentialGroupsUnderCasesService.create(content);
  dispatch({
    type: 'NEW_DIFFERENTIALGROUP_UNDER_CASE',
    data: newDifferentialGroupUnderCase,
  });
};

export default differentialGroupsUnderCasesReducer;
