import proceduresService from './proceduresService';
import proceduresUnderCasesService from './proceduresUnderCaseService';

const proceduresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROCEDURES_UNDER_CASE':
      return action.data;
    case 'ADD_PROCEDURE':
      return {
        ...state,
        procedures: state.procedures.concat(action.data),
      };
    default:
      return state;
  }
};

export const getProceduresUnderCase = (caseId) => async (dispatch) => {
  const proceduresUnderCase = await proceduresService.getAll(caseId);
  dispatch({
    type: 'GET_PROCEDURES_UNDER_CASE',
    data: proceduresUnderCase,
  });
};

export const addProcedure = (caseId, procedure) => async (dispatch) => {
  const addedProcedure = await proceduresService.create(procedure);

  const procedureUnderCaseObject = ({
    caseId,
    procedureId: addedProcedure.id,
    priority: 1,
  });

  const addedProcedureUnderCase = await proceduresUnderCasesService
    .create(procedureUnderCaseObject);

  dispatch({
    type: 'ADD_PROCEDURE',
    data: {
      ...addedProcedure,
      proceduresUnderCase: addedProcedureUnderCase,
    },
  });
};

export const updateProcedurePriorities = (caseId, procedures) => async (dispatch) => {
  await Promise.all(procedures.map((p, index) => {
    const procedureUnderCaseObject = ({
      caseId: p.proceduresUnderCase.caseId,
      procedureId: p.proceduresUnderCase.procedureId,
      priority: index + 1,
    });
    return proceduresUnderCasesService.update(
      p.proceduresUnderCase.procedureId,
      procedureUnderCaseObject,
    );
  }));
  dispatch(getProceduresUnderCase(caseId));
};

export default proceduresReducer;
