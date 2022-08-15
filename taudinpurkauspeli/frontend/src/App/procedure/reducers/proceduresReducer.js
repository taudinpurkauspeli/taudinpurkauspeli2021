import proceduresService from '../services/proceduresService';
import { createProcedureUnderCase, updateProcedurePriority } from './proceduresUnderCasesReducer';
import { setError, setSuccess } from '../../../utils/MessageBanner';

const proceduresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROCEDURES':
      return action.data;
    case 'NEW_PROCEDURE':
      return [...state, action.data];
    case 'UPDATE_PROCEDURE':
      return state.map((p) => (p.id !== action.data.id
        ? p
        : {
          id: p.id,
          name: p.name,
        }));
    case 'REMOVE_PROCEDURE':
      return state.filter((p) => p.id !== action.data.id);
    default:
      return state;
  }
};

export const getProcedures = () => async (dispatch) => {
  const procedures = await proceduresService.getAll();
  dispatch({
    type: 'GET_PROCEDURES',
    data: procedures || null,
  });
};

export const createProcedure = (
  caseId, procedure, successMessage, errorMessage,
) => async (dispatch) => {
  const newProcedure = await proceduresService.create(procedure);

  dispatch({
    type: 'NEW_PROCEDURE',
    data: newProcedure,
  });

  dispatch(createProcedureUnderCase({
    caseId,
    procedureId: newProcedure.id,
    priority: 1,
  }, successMessage, errorMessage));
};

export const updateProcedure = (procedure, successMessage, errorMessage) => async (dispatch) => {
  await proceduresService.update(procedure.id, procedure);
  dispatch(updateProcedurePriority(procedure, successMessage, errorMessage));
};

export const removeProcedure = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await proceduresService.remove(id);

    dispatch({
      type: 'REMOVE_PROCEDURE',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default proceduresReducer;
