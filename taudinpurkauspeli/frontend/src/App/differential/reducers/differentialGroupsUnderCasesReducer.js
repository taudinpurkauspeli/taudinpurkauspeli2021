import { setError, setSuccess } from '../../../utils/MessageBanner';
import differentialGroupsUnderCasesService from '../services/differentialGroupsUnderCasesService';

const differentialGroupsUnderCasesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALGROUPS_UNDER_CASE':
      return action.data;
    case 'NEW_DIFFERENTIALGROUP_UNDER_CASE':
      return [...state, action.data];
    case 'REMOVE_DIFFERENTIALGROUP_UNDER_CASE':
      return state.filter((p) => p.diffGroupCaseId !== action.data);
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

export const createDifferentialGroupUnderCase = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    const newDifferentialGroupUnderCase = await differentialGroupsUnderCasesService.create(content);

    dispatch({
      type: 'NEW_DIFFERENTIALGROUP_UNDER_CASE',
      data: newDifferentialGroupUnderCase,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const removeDifferentialGroupUnderCase = (
  diffGroupCaseId, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await differentialGroupsUnderCasesService.remove(diffGroupCaseId);

    dispatch({
      type: 'REMOVE_DIFFERENTIALGROUP_UNDER_CASE',
      data: diffGroupCaseId,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default differentialGroupsUnderCasesReducer;
