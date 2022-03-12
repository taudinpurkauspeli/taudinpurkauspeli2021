import differentialGroupsService from '../services/differentialGroupsService';
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

export const createDifferentialGroup = (caseId, differentialGroup) => async (dispatch) => {
  let { id } = differentialGroup;

  if (id === undefined) {
    const newDifferentialGroup = await differentialGroupsService.create(differentialGroup);

    dispatch({
      type: 'NEW_DIFFERENTIALGROUP',
      data: newDifferentialGroup,
    });

    id = newDifferentialGroup.id;
  }

  dispatch(createDifferentialGroupUnderCase({
    caseId,
    differentialGroupId: id,
  }));
};

export default differentialGroupsReducer;
