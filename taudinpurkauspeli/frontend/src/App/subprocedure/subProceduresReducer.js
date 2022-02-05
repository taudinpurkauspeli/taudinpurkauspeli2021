import subProceduresService from './subProceduresService';
import textSubProceduresService from './textSubProceduresService';

const subProceduresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SUBPROCEDURES':
      return action.data;
    case 'ADD_TEXT_SUBPROCEDURE':
      return [...state, action.data];
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

export const getSubprocedures = (procedureCaseId) => async (dispatch) => {
  const subprocedures = await subProceduresService.getAllId(procedureCaseId);
  dispatch({
    type: 'GET_SUBPROCEDURES',
    data: subprocedures,
  });
};

export const addTextSubprocedure = (subProcedureObject, procedureCaseId) => async (dispatch) => {
  const addedSubprocedure = await subProceduresService.create({
    priority: subProcedureObject.priority,
    type: subProcedureObject.type,
    procedureCaseId,
  });
  const addedTextSubProcedure = await textSubProceduresService.create({
    subProcedureId: addedSubprocedure.id,
    title: subProcedureObject.title,
    text: subProcedureObject.text,
  });
  dispatch({
    type: 'ADD_TEXT_SUBPROCEDURE',
    data: {
      ...addedSubprocedure,
      ...addedTextSubProcedure,
      id: addedTextSubProcedure.id,
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
