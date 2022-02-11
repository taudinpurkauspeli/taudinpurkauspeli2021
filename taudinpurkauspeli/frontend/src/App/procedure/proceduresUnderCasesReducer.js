import proceduresUnderCasesService from './proceduresUnderCaseService';

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

export const createProcedureUnderCase = (content) => async (dispatch) => {
  const newProcedureUnderCase = await proceduresUnderCasesService.create(content);
  dispatch({
    type: 'NEW_PROCEDURE_UNDER_CASE',
    data: newProcedureUnderCase,
  });
};

export const updateProcedurePriority = (procedure) => async (dispatch) => {
  await proceduresUnderCasesService.update(procedure.procedureCaseId, procedure);
  dispatch({
    type: 'UPDATE_PROCEDURE',
    data: procedure,
  });
};

export const updateProcedurePriorities = (caseId, procedures) => async (dispatch) => {
  await Promise.all(procedures.map((p, index) => proceduresUnderCasesService
    .update(
      p.procedureCaseId,
      { priority: index + 1 },
    )));
  dispatch(getProceduresUnderCase(caseId));
};

export default proceduresReducer;
