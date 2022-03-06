import proceduresService from '../services/proceduresService';
import { createProcedureUnderCase, updateProcedurePriority } from './proceduresUnderCasesReducer';

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

export const createProcedure = (caseId, procedure) => async (dispatch) => {
  const newProcedure = await proceduresService.create(procedure);

  dispatch({
    type: 'NEW_PROCEDURE',
    data: newProcedure,
  });

  dispatch(createProcedureUnderCase({
    caseId,
    procedureId: newProcedure.id,
    priority: 1,
  }));
};

export const updateProcedure = (procedure) => async (dispatch) => {
  await proceduresService.update(procedure.id, procedure);
  dispatch(updateProcedurePriority(procedure));
};

export default proceduresReducer;
