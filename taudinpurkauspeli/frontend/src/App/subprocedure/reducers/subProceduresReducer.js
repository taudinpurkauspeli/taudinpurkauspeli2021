import { setError, setSuccess } from '../../../utils/MessageBanner';
import subProceduresService from '../services/subProceduresService';

const subProceduresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SUBPROCEDURES':
      return action.data;
    case 'ADD_SUBPROCEDURE':
      return [...state, action.data];
    case 'UPDATE_SUBPROCEDURE': {
      return state.map((p) => (p.id !== action.data.id
        ? p
        : action.data
      ));
    }
    case 'REMOVE_SUBPROCEDURE':
      return state.filter((p) => p.id !== action.data.id);
    default:
      return state;
  }
};

export const getSubProceduresUnderCase = (procedureCaseId) => async (dispatch) => {
  const subprocedures = await subProceduresService.getAllUnderProcedure(procedureCaseId);
  dispatch({
    type: 'GET_SUBPROCEDURES',
    data: subprocedures || null,
  });
};

export const getSubProcedures = () => async (dispatch) => {
  const subprocedures = await subProceduresService.getAll();
  dispatch({
    type: 'GET_SUBPROCEDURES',
    data: subprocedures || null,
  });
};

export const addSubprocedure = (
  subProcedureObject, procedureCaseId, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    const addedSubprocedure = await subProceduresService.create({
      ...subProcedureObject,
      procedureCaseId,
    });

    dispatch({
      type: 'ADD_SUBPROCEDURE',
      data: addedSubprocedure,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateSubprocedure = (
  subProcedureObject, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await subProceduresService.update(subProcedureObject.id, subProcedureObject);

    dispatch({
      type: 'UPDATE_SUBPROCEDURE',
      data: subProcedureObject,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const removeSubProcedure = (id, successMessage, errorMessage) => async (dispatch) => {
  try {
    await subProceduresService.remove(id);

    dispatch({
      type: 'REMOVE_SUBPROCEDURE',
      data: id,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default subProceduresReducer;
