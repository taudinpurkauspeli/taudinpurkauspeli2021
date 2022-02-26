import optionGroupsService from '../services/optionGroupsService';
import { createOptionGroupUnderSubProcedure } from './optionGroupsUnderSubProceduresReducer';

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
  let { id } = optionGroup;

  if (id === undefined) {
    const newOptionGroup = await optionGroupsService.create(optionGroup);

    dispatch({
      type: 'NEW_OPTIONGROUP',
      data: newOptionGroup,
    });

    id = newOptionGroup.id;
  }

  dispatch(createOptionGroupUnderSubProcedure({
    subProcedureId,
    optionGroupId: id,
  }));
};

export default optionGroupsReducer;
