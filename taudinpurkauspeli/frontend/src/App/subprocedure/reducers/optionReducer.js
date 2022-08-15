import optionsService from '../services/optionsService';
import { createOptionUnderSubProcedure } from './optionsUnderSubProceduresReducer';
import { setError, setSuccess } from '../../../utils/MessageBanner';

const optionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_OPTIONS':
      return action.data;
    case 'NEW_OPTION':
      return [...state, action.data];
    case 'REMOVE_OPTION':
      return state.filter((o) => o.id !== action.data.id);
    case 'UPDATE_OPTION':
      return state.map((d) => (d.id !== action.data.id
        ? d
        : action.data
      ));
    default:
      return state;
  }
};

export const getOptions = () => async (dispatch) => {
  const returnedOptions = await optionsService.getAll();
  dispatch({
    type: 'GET_OPTIONS',
    data: returnedOptions || null,
  });
};

export const createOption = (
  optionGroupSubProcedureId, content, successMessage, errorMessage,
) => async (dispatch) => {
  let { id } = content;

  if (id === undefined) {
    const newOption = await optionsService.create({ name: content.name });

    dispatch({
      type: 'NEW_OPTION',
      data: newOption,
    });

    id = newOption.id;
  }

  dispatch(createOptionUnderSubProcedure({
    optionGroupSubProcedureId,
    optionId: id,
    description: content.description,
    isRequired: content.isRequired,
  }, successMessage, errorMessage));
};

export const removeOption = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await optionsService.remove(id);

    dispatch({
      type: 'REMOVE_OPTION',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateOption = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await optionsService.update(content.id, content);

    dispatch({
      type: 'UPDATE_OPTION',
      data: content,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default optionsReducer;
