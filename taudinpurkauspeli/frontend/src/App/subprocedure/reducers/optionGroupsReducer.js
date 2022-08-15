import optionGroupsService from '../services/optionGroupsService';
import { createOptionGroupUnderSubProcedure } from './optionGroupsUnderSubProceduresReducer';
import { setError, setSuccess } from '../../../utils/MessageBanner';

const optionGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_OPTIONGROUPS':
      return action.data;
    case 'NEW_OPTIONGROUP':
      return [...state, action.data];
    case 'REMOVE_OPTIONGROUP':
      return state.filter((o) => o.id !== action.data.id);
    case 'UPDATE_OPTIONGROUP':
      return state.map((d) => (d.id !== action.data.id
        ? d
        : action.data
      ));
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

export const createOptionGroup = (
  subProcedureId, optionGroup, successMessage, errorMessage,
) => async (dispatch) => {
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
  }, successMessage, errorMessage));
};

export const removeOptionGroup = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await optionGroupsService.remove(id);

    dispatch({
      type: 'REMOVE_OPTIONGROUP',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateOptionGroup = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await optionGroupsService.update(content.id, content);

    dispatch({
      type: 'UPDATE_OPTIONGROUP',
      data: content,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default optionGroupsReducer;
