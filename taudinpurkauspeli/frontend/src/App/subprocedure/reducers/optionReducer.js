import service from '../services/optionsService';
import { createOptionUnderSubProcedure } from './optionsUnderSubProceduresReducer';

const optionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_OPTIONS':
      return action.data;
    case 'NEW_OPTION':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getOptions = () => async (dispatch) => {
  const returnedOptions = await service.getAll();
  dispatch({
    type: 'GET_OPTIONS',
    data: returnedOptions || null,
  });
};

export const createOption = (optionGroupSubProcedureId, content) => async (dispatch) => {
  let { id } = content;

  if (id === undefined) {
    const newOption = await service.create({ name: content.name });

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
  }));
};

export default optionsReducer;
