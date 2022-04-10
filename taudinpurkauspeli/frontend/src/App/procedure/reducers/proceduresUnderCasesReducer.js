import { setError, setSuccess } from '../../../utils/MessageBanner';
import proceduresUnderCasesService from '../services/proceduresUnderCaseService';

const proceduresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROCEDURES_UNDER_CASE':
      return action.data;
    case 'NEW_PROCEDURE_UNDER_CASE':
      return [...state, action.data];
    case 'UPDATE_PROCEDURE':
      return state.map((p) => (p.id !== action.data.id
        ? p
        : action.data));
    case 'REMOVE_PROCEDURE_UNDER_CASE':
      return state.filter((p) => p.id !== action.data);
    default:
      return state;
  }
};

export const getProceduresUnderCase = (caseId) => async (dispatch) => {
  const proceduresUnderCase = await proceduresUnderCasesService.getAll(caseId);
  dispatch({
    type: 'GET_PROCEDURES_UNDER_CASE',
    data: proceduresUnderCase || null,
  });
};

export const createProcedureUnderCase = (
  content, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    const newProcedureUnderCase = await proceduresUnderCasesService.create(content);

    dispatch({
      type: 'NEW_PROCEDURE_UNDER_CASE',
      data: newProcedureUnderCase,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateProcedurePriority = (
  procedure, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await proceduresUnderCasesService.update(procedure.procedureCaseId, procedure);

    dispatch({
      type: 'UPDATE_PROCEDURE',
      data: procedure,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export const updateProcedurePriorities = (caseId, procedures) => async (dispatch) => {
  await Promise.all(procedures.map((p, index) => proceduresUnderCasesService
    .update(
      p.procedureCaseId,
      { priority: index + 1 },
    )));
  dispatch(getProceduresUnderCase(caseId));
};

export const removeProcedureUnderCase = (
  procedureId, successMessage, errorMessage,
) => async (dispatch) => {
  try {
    await proceduresUnderCasesService.remove(procedureId);

    dispatch({
      type: 'REMOVE_PROCEDURE_UNDER_CASE',
      data: procedureId,
    });

    setSuccess(successMessage);
  } catch (error) {
    setError(errorMessage);
  }
};

export default proceduresReducer;
