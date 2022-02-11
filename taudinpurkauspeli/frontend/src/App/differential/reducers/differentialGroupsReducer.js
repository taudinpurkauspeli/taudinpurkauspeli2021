import differentialGroupsService from '../services/differentialGroups';
import { createDifferentialGroupUnderCase } from './differentialGroupsUnderCasesReducer';

const differentialGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALGROUPS':
      return action.data;
    case 'NEW_DIFFERENTIALGROUP':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getDifferentialGroups = () => async (dispatch) => {
  const returnedDifferentialGroups = await differentialGroupsService.getAll();
  dispatch({
    type: 'GET_DIFFERENTIALGROUPS',
    data: returnedDifferentialGroups || null,
  });
};

export const createDifferentialGroup = (caseId, differential) => async (dispatch) => {
  const newDifferentialGroup = await differentialGroupsService.create(differential);

  dispatch({
    type: 'NEW_DIFFERENTIALGROUP',
    data: newDifferentialGroup,
  });

  dispatch(createDifferentialGroupUnderCase({
    caseId,
    differentialGroupId: newDifferentialGroup.id,
  }));
};

export default differentialGroupsReducer;
