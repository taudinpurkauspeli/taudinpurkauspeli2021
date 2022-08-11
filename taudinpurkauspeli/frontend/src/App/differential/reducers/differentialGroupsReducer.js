import differentialGroupsService from '../services/differentialGroupsService';
import { createDifferentialGroupUnderCase } from './differentialGroupsUnderCasesReducer';
import { setError, setSuccess } from '../../../utils/MessageBanner';

const differentialGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_DIFFERENTIALGROUPS':
      return action.data;
    case 'NEW_DIFFERENTIALGROUP':
      return [...state, action.data];
    case 'REMOVE_DIFFERENTIALGROUP':
      return state.filter((d) => d.id !== action.data.id);
    case 'UPDATE_DIFFERENTIALGROUP':
      return state.map((d) => (d.id !== action.data.id
        ? d
        : action.data
      ));
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

export const createDifferentialGroup = (
  caseId, differentialGroup, successMessage, errorMessage,
) => async (dispatch) => {
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
  }, successMessage, errorMessage));
};

export const removeDifferentialGroup = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await differentialGroupsService.remove(id);

    dispatch({
      type: 'REMOVE_DIFFERENTIALGROUP',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateDifferentialGroup = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await differentialGroupsService.update(content.id, content);

    dispatch({
      type: 'UPDATE_DIFFERENTIALGROUP',
      data: content,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default differentialGroupsReducer;
