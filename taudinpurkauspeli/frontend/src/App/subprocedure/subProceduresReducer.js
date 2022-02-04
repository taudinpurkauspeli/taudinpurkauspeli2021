import subProceduresService from './subProceduresService';
import textSubProceduresService from './textSubProceduresService';

const subProceduresReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_SUBPROCEDURES':
      return action.data;
    case 'ADD_TEXT_SUBPROCEDURE':
      return {
        ...state,
        subProcedures: state.subProcedures.concat(action.data),
      };
    case 'UPDATE_TEXT_SUBPROCEDURE': {
      const subprocedure = state.subProcedures.find((sp) => sp.id === action.id);
      subprocedure.textSubProcedures.title = action.data.title;
      subprocedure.textSubProcedures.text = action.data.text;
      return {
        ...state,
        subProcedures: state.subProcedures
          .filter((sp) => sp.id !== action.id)
          .concat(subprocedure),
      };
    }
    default:
      return state;
  }
};

export const initializeSubprocedures = (procedureId) => async (dispatch) => {
  const subprocedures = await subProceduresService.getAllId(procedureId);
  dispatch({
    type: 'INITIALIZE_SUBPROCEDURES',
    data: subprocedures,
  });
};

export const addTextSubprocedure = (subProcedureObject, procedureId) => async (dispatch) => {
  const addedSubprocedure = await subProceduresService.create({
    priority: subProcedureObject.priority,
    type: subProcedureObject.type,
  });
  const addedTextSubProcedure = await textSubProceduresService.create({
    subProcedureId: addedSubprocedure.id,
    proceduresUnderCaseProcedureCaseId: procedureId,
    title: subProcedureObject.title,
    text: subProcedureObject.text,
  });
  dispatch({
    type: 'ADD_TEXT_SUBPROCEDURE',
    data: {
      ...addedSubprocedure,
      textSubProcedures: addedTextSubProcedure,
    },
  });
};

export const updateTextSubprocedure = (id, subProcedureObject) => async (dispatch) => {
  await textSubProceduresService.update(id, subProcedureObject);
  dispatch({
    type: 'UPDATE_TEXT_SUBPROCEDURE',
    id,
    data: subProcedureObject,
  });
};

export default subProceduresReducer;
