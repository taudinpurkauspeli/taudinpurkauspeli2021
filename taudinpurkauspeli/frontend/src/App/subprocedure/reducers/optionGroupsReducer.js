import optionGroupsService from '../services/optionGroupsService';
// import { createOptionGroupUnderCase } from './optionGroupsUnderCasesReducer';

const optionGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_OPTIONGROUPS':
      return action.data;
    case 'NEW_OPTIONGROUP':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getOptionGroups = () => async (dispatch) => {
  const returnedOptionGroups = await optionGroupsService.getAll();
  dispatch({
    type: 'GET_OPTIONGROUPS',
    data: returnedOptionGroups || null,
  });
};

export const createOptionGroup = (subProcedureId, optionGroup) => async (dispatch) => {
  console.log(optionGroup.id);
  if (optionGroup.id === undefined) {
    const newOptionGroup = await optionGroupsService.create(optionGroup);

    dispatch({
      type: 'NEW_OPTIONGROUP',
      data: newOptionGroup,
    });
  }
/*
  dispatch(createOptionGroupUnderCase({
    subProcedureId,
    optionGroupId: newOptionGroup.id,
  }));
  */
};

export default optionGroupsReducer;
